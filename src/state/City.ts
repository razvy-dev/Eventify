import { create } from 'zustand';

const API_KEY: string | undefined = process.env.EXPO_PUBLIC_OXILOR;
const BASE_URL = 'https://data-api.oxilor.com/rest';
const FETCH_LIMIT = 100;
const MAX_PAGES = 50;

export interface IRegion {
  id: string;
  name: string;
  code?: string;
  type?: string;
  latitude?: number;
  longitude?: number;
  countryCode?: string;
  division1Code?: string;
}

interface RegionState {
  regions: IRegion[];
  filteredRegions: IRegion[];
  selectedRegion: IRegion | null;
  isLoading: boolean;
  error: string | null;
  searchAbortController: AbortController | null;
}

interface RegionActions {
  fetchCities: (opts?: {
    countryCode?: string;
    division1Code?: string;
  }) => Promise<void>;
  searchRegions: (searchTerm: string) => Promise<void>;
  selectRegion: (region: IRegion) => void;
  resetFilter: () => void;
}

type RegionStore = RegionState & RegionActions;

export const useRegionStore = create<RegionStore>((set, get) => ({
  regions: [],
  filteredRegions: [],
  selectedRegion: null,
  isLoading: false,
  error: null,
  searchAbortController: null,

  fetchCities: async (opts = {}) => {
    if (!API_KEY) {
      set({
        error: "API Key is missing.",
        isLoading: false,
      });
      return;
    }

    set({ isLoading: true, error: null });

    let all: IRegion[] = [];
    let hasNext = true;
    let cursor: string | null = null;
    let pageCount = 0;

    try {
      while (hasNext && pageCount < MAX_PAGES) {
        pageCount++;

        const params = new URLSearchParams();
        params.append("first", String(FETCH_LIMIT));
        if (cursor) params.append("after", cursor);
        params.append("kind", "city");

        if (opts.countryCode) params.append("country", opts.countryCode);
        if (opts.division1Code) params.append("division1", opts.division1Code);

        const url = `${BASE_URL}/regions?${params.toString()}`;

        const resp = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Accept-Language": "en",
            "Content-Type": "application/json",
          },
        });

        if (!resp.ok) {
          const txt = await resp.text();
          throw new Error(`HTTP ${resp.status}: ${txt}`);
        }

        const data = await resp.json();

        if (!data.edges || !Array.isArray(data.edges)) {
          throw new Error('Invalid API response format');
        }

        const edges = data.edges;
        const pageInfo = data.pageInfo;

        const pageRegions = edges.map((edge: any) => {
          const n = edge.node;
          return {
            id: n.id,
            name: n.name,
            code: n.code,
            type: n.kind,
            latitude: n.latitude,
            longitude: n.longitude,
            countryCode: n.country,
            division1Code: n.division1,
          } as IRegion;
        });

        all = [...all, ...pageRegions];

        hasNext = pageInfo?.hasNextPage ?? false;
        cursor = pageInfo?.endCursor ?? null;

        if (!hasNext) break;
      }

      set({
        regions: all,
        filteredRegions: all,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.error('fetchCities error:', err);
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  },

  searchRegions: async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      get().resetFilter();
      return;
    }

    if (!API_KEY) {
      set({ error: "API Key is missing." });
      return;
    }

    // Cancel previous search request if it exists
    const { searchAbortController } = get();
    if (searchAbortController) {
      searchAbortController.abort();
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    set({ 
      isLoading: true, 
      error: null,
      searchAbortController: abortController 
    });

    try {
      const params = new URLSearchParams();
      params.append('searchTerm', searchTerm);
      params.append('first', String(FETCH_LIMIT));
      params.append('type', 'city');

      const url = `${BASE_URL}/search-regions?${params.toString()}`;

      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept-Language': 'en',
          'Content-Type': 'application/json',
        },
        signal: abortController.signal, // ← Add abort signal
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${txt}`);
      }

      const data = await resp.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected API response format");
      }

      const results = data.map(node => ({
        id: node.id,
        name: node.name,
        code: node.code,
        type: node.type,
        latitude: node.latitude,
        longitude: node.longitude,
        countryCode: node.countryCode,
        division1Code: node.division1Code,
      })) as IRegion[];

      set({
        filteredRegions: results,
        isLoading: false,
        searchAbortController: null,
      });

    } catch (err) {
      // Don't set error if request was aborted (user is still typing)
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Search request aborted');
        return;
      }

      console.error('searchRegions error:', err);
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Unknown error',
        searchAbortController: null,
      });
    }
  },

  resetFilter: () => {
    const { regions, searchAbortController } = get();
    
    // Cancel any in-flight search
    if (searchAbortController) {
      searchAbortController.abort();
    }
    
    set({ 
      filteredRegions: regions,
      searchAbortController: null,
      isLoading: false,
    });
  },

  selectRegion: (region) => {
    set({ selectedRegion: region });
    console.log(`Selected region: ${region.name} (${region.id})`);
  },
}));