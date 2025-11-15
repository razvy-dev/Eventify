import colors from "@/src/utils/other/colors";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VideoFeed() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>This will be the video feed screen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})