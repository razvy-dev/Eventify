import EventFeed from "@/src/components/feed/EventFeed";
import FilterWrapper from "@/src/components/wrappers/FilterWrapper";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const feedEvents = [
  {
    id: 4,
    title: "The Kooks",
    date: "Thu, Apr 19 · 20.00 Pm",
    location: "Razzmatazz",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400",
  },
  {
    id: 5,
    title: "The Wombats",
    date: "Fri, Apr 22 · 21.00 Pm",
    location: "Sala Apolo",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
  },
  {
    id: 6,
    title: "Foster The People",
    date: "Mon, Apr 25 · 17.30",
    location: "La Monumental",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
  },
];

export default function SearchScreen() {
    return (
        <SafeAreaView>
            <FilterWrapper>
                <ScrollView style={styles.container}>
                    <EventFeed feedEvents={feedEvents} />
                </ScrollView>
            </FilterWrapper>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    }
})