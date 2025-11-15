import { useAuthStore } from "@/src/state/Auth";
import { SignInFormData, signInSchema } from "@/src/utils/auth/validation";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LogIn() {
    const { signIn } = useAuthStore();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: { email: '', password: ''},
    });

    const onSubmit = async (data: SignInFormData) => {
        const result = signInSchema.safeParse(data)

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
    
    // --- ADDED: Navigation Handler for Forgot Password ---
    const handleForgotPassword = () => {
        // This navigates to the new ForgotPasswordScreen (assuming it is
        // located at the route path /ForgotPassword in your Expo Router setup).
        router.push("/Auth/ForgotPassword"); 
    };
    // ----------------------------------------------------

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Log In</Text>
                {/* Email Field */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Email"
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
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={[styles.textInput, errors.password && styles.errorBorder]}
                        />
                    )}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                
                {/* --- ADDED: Forgot Password Button --- */}
                <TouchableOpacity
                    style={styles.forgotLink}
                    onPress={handleForgotPassword}
                    // Disable if the user is currently trying to log in
                    disabled={isSubmitting} 
                >
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
                {/* ------------------------------------- */}

                <TouchableOpacity
                    style={[styles.submitButton, isSubmitting && { opacity: 0.5 }]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Text style={{ color: "#fff", fontWeight: "600" }}>Log In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        flexDirection: "column",
        padding: 20,
        gap: 14,
        justifyContent: "center",
    },
    title: {
        color: '#ccc',
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,
        textAlign: "center",
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        color: '#fff',
    },
    submitButton: {
        backgroundColor: '#A3F',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: -6,
    },
    errorBorder: {
        borderColor: 'red',
    },
    // --- ADDED: Styles for the Forgot Password link ---
    forgotLink: {
        alignSelf: 'flex-end', // Pushes the link to the right of the container
        marginTop: 8,
    },
    forgotText: {
        color: '#A3F', // Uses your submit button's accent color for visibility
        fontSize: 14,
        fontWeight: "500",
    },
    // --------------------------------------------------
})