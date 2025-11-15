import { useAuthStore } from "@/src/state/Auth"
import { SignUpFormData, signUpSchema } from "@/src/utils/auth/validation"
import colors from "@/src/utils/other/colors"
import { router } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
// import AuthVectorBackground from "../../components/icons/AuthVectorBackground"
import AuthBackButton from "../../components/wrappers/AuthBackButton"

const { width } = Dimensions.get('window');

// **TYPE FIX: Extend the base form data for fields not yet included in Zod schema**
type FullSignUpFormData = SignUpFormData & { 
    full_name: string; 
    role: 'User' | 'Organizer'; 
};

// --- Custom Input Component to handle the line style ---
interface LineInputProps {
    label: string;
    placeholder: string;
    error?: any; 
    onChangeText: (text: string) => void;
    onBlur: () => void;
    value: string;
    secureTextEntry?: boolean;
    keyboardType?: 'email-address' | 'default' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const LineInput: React.FC<LineInputProps> = ({ label, placeholder, error, ...props }) => (
    <View style={styles.inputWrapper}>
        {/* FIX: Moved label to inline flow, then adjust margin/padding if needed */}
        <Text style={styles.inputLabel}>{label}</Text> 
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.black} // Used black for visibility on light background
            style={styles.textInput}
            {...props}
        />
        <View style={[styles.inputLine, error && styles.errorLine]} />
    </View>
);
// --------------------------------------------------------

export default function SignUp() {
    const { signUp } = useAuthStore();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FullSignUpFormData>({
        defaultValues: { full_name: '', email: '', password: '', confirmPassword: '', role: 'User' },
    });

    const onSubmit = async (data: FullSignUpFormData) => {
        const result = signUpSchema.safeParse(data); 

        if (!result.success) {
            result.error.errors.forEach((err) => {
                const fieldName = err.path[0] as keyof SignUpFormData;
                setError(fieldName, { message: err.message });
            });
            return;
        }

        try {
            await signUp(data.email, data.password);
            router.replace("/Auth/SelectLocation");
        } catch (error) {
            console.log("An error occurred while creating your account: ", error);
            setError("email", { message: "Could not create account. Email may already be in use." });
        }
    };

    return (
        // FIX: Main view uses flex: 1 and space-between to avoid scrolling
        <View style={styles.fullScreen}>
            
            {/* 1. Background Layer (Placeholder View for your SVG/Vector) */}
            <View style={styles.backgroundVectorPlaceholder} />

            {/* Content Wrapper for Header + Form Content to push the button down */}
            <SafeAreaView style={styles.contentWrapper}>
                
                <View>
                    {/* 2. Header and Back Button */}
                    <View style={styles.headerContainer}>
                        <AuthBackButton onPress={router.back} />
                        {/* FIX: Reduced margin on titleWrapper */}
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>Create new account</Text>
                        </View>
                    </View>


                    {/* 3. Form Content */}
                    <View style={styles.formContent}>
                        
                        {/* Full Name Field */}
                        <Controller
                            control={control}
                            name="full_name"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <LineInput
                                    label="Full name"
                                    placeholder="Enter your name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.full_name}
                                    keyboardType="default"
                                    autoCapitalize="words"
                                />
                            )}
                        />
                        {errors.full_name && <Text style={styles.errorText}>{errors.full_name.message}</Text>}

                        {/* Email Field */}
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <LineInput
                                    label="Email adress"
                                    placeholder="name@example.com"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.email}
                                />
                            )}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                        {/* Create Password Field */}
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <LineInput
                                    label="Create password"
                                    placeholder="Enter your password"
                                    secureTextEntry
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.password}
                                    keyboardType="default"
                                />
                            )}
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                        {/* Confirm Password Field */}
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <LineInput
                                    label="Confirm password"
                                    placeholder="Confirm new password"
                                    secureTextEntry
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.confirmPassword}
                                    keyboardType="default"
                                />
                            )}
                        />
                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                        )}

                        {/* Role Selection (Organizer | User) */}
                        <Controller
                            control={control}
                            name="role"
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.roleContainer}>
                                    {/* Organizer Button */}
                                    <TouchableOpacity
                                        style={[
                                            styles.roleButton, 
                                            value === 'Organizer' && styles.roleButtonActive
                                        ]}
                                        onPress={() => onChange('Organizer')}
                                    >
                                        <Text style={value === 'Organizer' ? styles.roleButtonTextActive : styles.roleButtonTextInactive}>Organizer</Text>
                                    </TouchableOpacity>

                                    {/* User Button */}
                                    <TouchableOpacity
                                        style={[
                                            styles.roleButton, 
                                            value === 'User' && styles.roleButtonActive
                                        ]}
                                        onPress={() => onChange('User')}
                                    >
                                        <Text style={value === 'User' ? styles.roleButtonTextActive : styles.roleButtonTextInactive}>User</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
                
                {/* 4. Submit Button */}
                <View style={styles.submitButtonContainer}>
                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitting && { opacity: 0.7 }]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.submitButtonText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: colors.white, 
    },
    backgroundVectorPlaceholder: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#e8e8e8', 
        zIndex: 0,
    },
    // FIX: Wrapper to manage vertical layout flow (Header/Form Content area + Button area)
    contentWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    
    // --- Header Styling ---
    // FIX: Removed unnecessary absolute positioning and padding.
    headerContainer: {
        paddingTop: 10, // Small top padding under the safe area
    },
    titleWrapper: {
        marginTop: 15, // Reduced space after back button to be tighter
        paddingLeft: 10,
        marginBottom: 20, // Space below title before form starts
    },
    title: {
        color: colors.black,
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
    },
    // --- Form Styling ---
    // FIX: Removed absolute positioning, now flows naturally below the title
    formContent: {
        width: width * 0.85,
        alignSelf: 'center',
        gap: 25, // Slightly reduced spacing between input groups to be more compact
        zIndex: 1, 
        // Note: Content is intentionally not positioned at the top of the screen, 
        // it starts below the header/title in the normal flow.
    },
    inputWrapper: {
        marginBottom: 0,
    },
    // FIX: Removed 'position: absolute' from inputLabel as it was unnecessary here
    inputLabel: {
        fontSize: 14,
        color: colors.black,
        marginBottom: -5, // Pull label closer to input text
    },
    textInput: {
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        paddingVertical: 5, // Reduced vertical padding
        color: colors.black, 
        fontSize: 18,
    },
    inputLine: {
        height: 1,
        backgroundColor: colors.black, 
        marginTop: 0,
    },
    errorLine: {
        backgroundColor: colors.grena,
    },
    // --- Role Selection Styles ---
    roleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', 
        gap: 10, 
        paddingTop: 5, // Reduced top padding
        marginBottom: 10,
    },
    roleButton: {
        width: width * 0.25, 
        backgroundColor: '#D9D9D9', 
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    roleButtonActive: {
        backgroundColor: '#444444', 
    },
    roleButtonTextActive: {
        color: colors.white, 
        fontWeight: '600',
    },
    roleButtonTextInactive: {
        color: colors.black, 
        fontWeight: '600',
    },
    // --- Submit Button Container and Styles ---
    // FIX: Removed absolute positioning, now flows to the bottom of the flex container
    submitButtonContainer: {
        // Aligned with the form content width
        alignSelf: 'center',
        width: width * 0.85, 
        paddingBottom: 20, // Space above the bottom edge of the safe area
        backgroundColor: 'transparent',
    },
    submitButton: {
        backgroundColor: '#900021', 
        borderRadius: 8,
        paddingVertical: 18,
        alignItems: "center",
        width: '100%',
    },
    submitButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "bold",
    },
    // --- Error Styling ---
    errorText: {
        color: colors.grena,
        fontSize: 12,
        // FIX: Adjusted margin to be closer to the input line
        marginTop: 2, 
        marginLeft: 5,
    },
});