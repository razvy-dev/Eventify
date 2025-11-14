import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmEmail() {
    return (
        <SafeAreaView>
            <Text>
                You will need to confirm your email before we are able to log you into the app
            </Text>
        </SafeAreaView>
    )
}