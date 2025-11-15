import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../state/Auth';
import { IRegion, useRegionStore } from '../../state/City';

const DEBOUNCE_DELAY = 500; // ms
const MIN_SEARCH_LENGTH = 3; // characters

export default function PickCity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<IRegion | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Region state - only subscribe to state, not actions
  const filteredRegions = useRegionStore((s) => s.filteredRegions);
  const isLoading = useRegionStore((s) => s.isLoading);
  const error = useRegionStore((s) => s.error);

  // Auth state
  const setUserCity = useAuthStore((s) => s.setCity);

  // Fetch cities once on mount
  useEffect(() => {
    console.log('Component mounted, fetching cities...');
    useRegionStore.getState().fetchCities();
  }, []);

  // Handle search input with manual debouncing
  const handleSearchChange = useCallback((text: string) => {
    console.log('Search input changed to:', text);
    setSearchTerm(text);

    // Clear existing timer
    if (debounceTimerRef.current) {
      console.log('Clearing previous timer');
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      console.log('Timer executed after 500ms for:', text);
      const trimmed = text.trim();
      
      if (trimmed.length >= MIN_SEARCH_LENGTH) {
        console.log('Searching for:', trimmed);
        useRegionStore.getState().searchRegions(trimmed);
      } else if (trimmed.length === 0) {
        console.log('Resetting filter');
        useRegionStore.getState().resetFilter();
      } else {
        console.log('Search term too short, waiting for more input');
      }
    }, DEBOUNCE_DELAY);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // SELECT CITY
  const handleSelectCity = useCallback((region: IRegion) => {
    setSelectedCity(region);
  }, []);

  // SUBMIT CITY
  const handleSubmit = async () => {
    if (!selectedCity) return;
    await setUserCity(selectedCity.name);
    router.push("/Auth/ConfirmEmail")
  };

  const renderItem = ({ item }: { item: IRegion }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selectedCity?.id === item.id && styles.selectedItem,
      ]}
      onPress={() => handleSelectCity(item)}
    >
      <Text style={styles.cityText}>{item.name}</Text>
      <Text style={styles.countryText}>{item.code}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => {
    const trimmed = searchTerm.trim();
    const showHint = trimmed.length > 0 && trimmed.length < MIN_SEARCH_LENGTH;

    return (
      <>
        <Text style={styles.greetingHeader}>Hello!</Text>
        <Text style={styles.greetingSubHeader}>
          Let&apos;s find your next event.{"\n"}
          <Text style={styles.greetingBold}>Choose a location.</Text>
        </Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="arrow-back" size={24} color="#6C757D" style={styles.backIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Select Location..."
            placeholderTextColor="#6C757D"
            value={searchTerm}
            onChangeText={handleSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {isLoading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <Ionicons name="search" size={24} color="#6C757D" />
          )}
        </View>

        {/* Hint for minimum characters */}
        {showHint && (
          <Text style={styles.hintText}>
            Type at least {MIN_SEARCH_LENGTH} characters to search
          </Text>
        )}

        {/* Label */}
        {!error && !showHint && filteredRegions.length > 0 && (
          <Text style={styles.mostSearchedLabel}>
            {trimmed.length >= MIN_SEARCH_LENGTH ? 'Search Results' : 'Most Searched'}
          </Text>
        )}

        {/* Error message */}
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </>
    );
  };

  // Show loading only on initial load
  if (isLoading && filteredRegions.length === 0 && !searchTerm) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredRegions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {error ? 'Error loading cities' : 'No cities found'}
              </Text>
            </View>
          ) : null
        }
      />

      {/* Submit Button */}
      {selectedCity && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
  },
  selectedItem: {
    backgroundColor: '#E8F0FF',
  },
  cityText: { fontSize: 20, fontWeight: '600', color: '#343A40' },
  countryText: { fontSize: 12, color: '#6C757D' },
  loading: { flex: 1, justifyContent: 'center' },
  greetingHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343A40',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  greetingSubHeader: {
    fontSize: 16,
    color: '#6C757D',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greetingBold: { fontWeight: 'bold', color: '#343A40' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 18, color: '#343A40' },
  mostSearchedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  hintText: {
    fontSize: 14,
    color: '#6C757D',
    fontStyle: 'italic',
    marginHorizontal: 20,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 12,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  errorText: {
    color: '#DC3545',
    fontSize: 14,
    marginHorizontal: 20,
    marginTop: 10,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6C757D',
  },
});