import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreenSymbol from "../components/icons/HomeScreen";
import colors from "../utils/other/colors";

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.subtitle}>Sign in or create new account</Text>
            </View>
            <View style={styles.imageContainer}>
                <HomeScreenSymbol />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.signInButton}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton}>
                    <Text style={styles.signUpButtonText1}>No Account yet?</Text><Text style={styles.signUpButtonText2}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 48,
        color: colors.black,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 24,
        color: colors.black,
        textAlign: "center",
    },
    imageContainer: {
        padding: 10,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 10,
        alignContent: "center",
        justifyContent: "center",
    },
    signInButton: {
        backgroundColor: colors.grena,
        borderRadius: 5,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    signInButtonText: {
        color: colors.white,
        fontSize: 24,
    },
    signUpButton: {
        borderWidth: 1,
        borderRadius: 5,
    },
    signUpButtonText1: {
        color: "#7C7C7C",
    },
    signUpButtonText2: {
        color: colors.grena
    }
})