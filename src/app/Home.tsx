import { router } from "expo-router";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreenSymbol from "../components/icons/HomeScreen";
import colors from "../utils/other/colors";

// Get the screen width for consistent padding
const { width } = Dimensions.get('window');

export default function Home() {

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Text */}
            <View style={styles.headerTextContainer}>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.subtitle}>Sign in or create a new account</Text>
            </View>

            {/* Vector Image */}
            <View style={styles.imageContainer}>
                <HomeScreenSymbol />
            </View>
            
            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/Auth/LogIn')}>
                    <Text style={styles.signInButtonText}>Sign in</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/Auth/SignUp')}>
                    <View style={styles.signUpButtonTextWrapper}>
                        <Text style={styles.signUpButtonText1}>No account yet? </Text>
                        <Text style={styles.signUpButtonText2}>Sign up</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Set the background to solid white, removing the stripe logic
        backgroundColor: colors.white, 
        justifyContent: 'space-between', 
        paddingHorizontal: width * 0.1, 
        paddingVertical: 20,
    },
    headerTextContainer: {
        // Aligned to the top
    },
    title: {
        fontSize: 38, 
        color: colors.black,
        textAlign: "center",
        fontWeight: 'bold', 
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666666', // Subtle grey for secondary text
        textAlign: "center",
    },
    imageContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        // This section is pinned to the bottom
        flexDirection: "column",
        gap: 15, 
        paddingBottom: 20, 
    },
    // --- Sign In Button (Solid Red) ---
    signInButton: {
        backgroundColor: colors.grena, // The primary red color
        borderRadius: 8,
        height: 55, 
        justifyContent: "center",
        alignItems: "center",
    },
    signInButtonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    signUpButton: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 8,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
    },
    signUpButtonTextWrapper: {
        flexDirection: 'row', 
    },
    signUpButtonText1: {
        fontSize: 18,
        color: '#666666', 
    },
    signUpButtonText2: {
        fontSize: 18,
        color: colors.grena, 
        fontWeight: 'bold',
    }
});