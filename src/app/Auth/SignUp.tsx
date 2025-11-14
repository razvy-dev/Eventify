import { useAuthStore } from "@/src/state/Auth"
import { SignUpFormData, signUpSchema } from "@/src/utils/auth/validation"
import { router } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SignUp() {
    const { signUp } = useAuthStore();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: { email: '', password: '', confirmPassword: '' },
    });

    const onSubmit = async (data: SignUpFormData) => {
        // ✅ Validate user input with Zod
        const result = signUpSchema.safeParse(data);

        if (!result.success) {
            // Map Zod errors to React Hook Form errors
            result.error.errors.forEach((err) => {
                const fieldName = err.path[0] as keyof SignUpFormData;
                setError(fieldName, { message: err.message });
            });
            return;
        }

        // ✅ Proceed with sign up if validation passes
        try {
            await signUp(data.email, data.password);
            // Navigate to confirmation page or account
            router.replace("/Auth/ConfirmEmail");
        } catch (error) {
            console.log("An error occurred while creating your account: ", error);
            setError("email", { message: "Could not create account. Email may already be in use." });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Create an Account</Text>

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

                {/* Confirm Password Field */}
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Confirm Password"
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={[styles.textInput, errors.confirmPassword && styles.errorBorder]}
                        />
                    )}
                />
                {errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                )}

                <TouchableOpacity
                    style={[styles.submitButton, isSubmitting && { opacity: 0.5 }]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Text style={{ color: "#fff", fontWeight: "600" }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        flexDirection: "column",
        padding: 20,
        gap: 14,
        justifyContent: 'center',
    },
    title: {
        color: "#ccc",
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
});