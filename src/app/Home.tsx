import { Link } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <SafeAreaView>
            <View>
                <Link href={{ pathname: "/Auth/LogIn" }} >
                    Log In
                </Link>
                <Link href={{ pathname: "/Auth/SignUp" }}>
                    Sign Up
                </Link>
            </View>
        </SafeAreaView>
    )
}