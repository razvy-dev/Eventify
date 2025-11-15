import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function FilterWrapper({ children }: any) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 20, gap: 12 }}>
      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#E5E5E5",
          paddingHorizontal: 16,
          borderRadius: 12,
          height: 44,
        }}
      >
        <Ionicons name="search" size={18} color="#555" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search For…."
          placeholderTextColor="#888"
          style={{ flex: 1, fontSize: 15 }}
        />
      </View>

      {/* Filters + Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {/* Dropdown filters */}
          <NavDropdown label="Filters" />
          <NavDropdown label="Data" />

          {/* Category chips */}
          <CategoryChip label="Music" active />
          <CategoryChip label="Business" />
          <CategoryChip label="Food & Drink" />
        </View>
      </ScrollView>

      {/* Events Count + Sort */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 4,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "600" }}>123 Events</Text>

        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 15, color: "#444", marginRight: 4 }}>
            Sort by relevant
          </Text>
          <Ionicons name="chevron-down" size={16} color="#444" />
        </TouchableOpacity>
      </View>
      { children }
    </View>
  );
}

/* ------------------------------ Subcomponents ------------------------------ */

function NavDropdown({ label }: { label: string }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#F1F1F1",
        borderRadius: 12,
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: "500", marginRight: 4 }}>{label}</Text>
      <Ionicons name="chevron-down" size={14} color="#444" />
    </TouchableOpacity>
  );
}

function CategoryChip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: active ? "#C4B4DD" : "#F1F1F1",
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: active ? "white" : "#444",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
