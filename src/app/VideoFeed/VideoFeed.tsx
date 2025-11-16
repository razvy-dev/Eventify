// app/feed/index.tsx
import { Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventVideoCard from "../../components/video/EventVideoCard";
import FilterWrapper from "../../components/wrappers/FilterWrapper";

export default function FeedScreen() {
  const data = [
    {
      id: "1",
      video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      id: "2",
      video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      id: "3",
      video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
  ];

  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F4" }}>
      <FilterWrapper />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventVideoCard item={item} />}
        pagingEnabled
        snapToInterval={screenHeight} // snap full-screen
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
