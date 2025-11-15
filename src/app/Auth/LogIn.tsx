import { useAuthStore } from "@/src/state/Auth";
import { SignInFormData, signInSchema } from "@/src/utils/auth/validation";
import colors from "@/src/utils/other/colors";
import { router, useNavigation } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Removed: import AuthVectorBackground from "../../components/icons/AuthVectorBackground";
import AuthBackButton from "../../components/wrappers/AuthBackButton";

const { height, width } = Dimensions.get('window');

export default function LogIn() {
    const { signIn } = useAuthStore();
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: { email: '', password: ''},
    });

    const onSubmit = async (data: SignInFormData) => {
        const result = signInSchema.safeParse(data);

        if (!result.success) {
            result.error.errors.forEach((err) => {
                const fieldName = err.path[0] as keyof SignInFormData;
                setError(fieldName, { message: err.message });
            })
            return;
        }

        try {
            await signIn(data.email, data.password);
            router.replace("/Account/Account")
        } catch (error) {
            console.log("An error occurred while logging you into your account", error)
            setError("email", { message: "Invalid email or password"})
        }
    };

    return (
        <View style={styles.fullScreen}>
            
            {/* Removed Background Layer (AuthVectorBackground) */}

            {/* Content Wrapper using SafeAreaView and Flexbox for non-absolute layout */}
            <SafeAreaView style={styles.contentWrapper}>
                
                {/* 1. Header Area (Back Button and Title/Subtitle) */}
                <View>
                    <View style={styles.headerContainer}>
                        <AuthBackButton onPress={() => navigation.goBack()} />
                        <View style={styles.titleSection}>
                            <Text style={styles.title}>Log In</Text>
                            <Text style={styles.subtitle}>Welcome back!</Text>
                        </View>
                    </View>

                    {/* 2. Input Section */}
                    <View style={styles.inputSection}>
                        {/* Email Field */}
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor={colors.black}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={[styles.textInput, errors.email && styles.errorBorder]}
                                />
                            )}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                        {/* Password Field */}
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor={colors.black}
                                    secureTextEntry
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={[styles.textInput, errors.password && styles.errorBorder]}
                                />
                            )}
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                        {/* Forgot Password Link */}
                        <TouchableOpacity style={styles.forgotPasswordButton}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* 3. Submit Button (Pushed to the bottom by flexbox) */}
                <View style={styles.submitButtonContainer}>
                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitting && { opacity: 0.7 }]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.submitButtonText}>Log In</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        // Using a solid white background now that the vector is removed
        backgroundColor: colors.white, 
    },
    // FIX: Main content wrapper using flex-direction: column and space-between
    contentWrapper: {
        flex: 1,
        justifyContent: 'space-between', 
        paddingHorizontal: 30, // Global horizontal padding
        paddingBottom: 20, // Padding from the screen bottom
    },
    
    // --- Header and Title Styles ---
    headerContainer: {
        // Back button is now rendered first, allowing title to flow below
        paddingTop: 10, 
        marginBottom: height * 0.1, // Large gap between header and inputs
    },
    titleSection: {
        marginTop: 20, // Space between back button and title
    },
    title: {
        color: colors.black,
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 5,
    },
    subtitle: {
        color: colors.black,
        fontSize: 16,
        textAlign: "left",
    },

    // --- Input Styles ---
    inputSection: {
        gap: 25, // Increased gap between inputs for visual clarity
    },
    textInput: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 10,
        color: colors.black,
        fontSize: 16,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    forgotPasswordText: {
        color: colors.grena,
        fontSize: 14,
        fontWeight: '600',
    },
    // --- Submit Button Styles ---
    submitButtonContainer: {
        // This view handles any necessary bottom alignment padding
        paddingTop: 20, // Small margin above the button
    },
    submitButton: {
        backgroundColor: colors.grena,
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: "center",
        width: '100%',
    },
    submitButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "bold",
    },

    // --- Error Styles ---
    errorText: {
        color: colors.grena,
        fontSize: 13,
        marginTop: 2,
        marginLeft: 5,
    },
    errorBorder: {
        borderColor: colors.grena,
        borderWidth: 2,
    },
});