import React, { useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import supabase from '../../utils/supabase'; // Assuming your supabase client is here

export function ForgotPasswordScreen() {
  // --- Type Safety Added ---
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  // --- End of Type Safety ---

  // *** IMPORTANT CHANGE ***
  // We are now using a custom URI scheme (deep link) instead of a web URL.
  // This tells Supabase to redirect the user directly back into your mobile app.
  // You MUST configure your app (e.g., in app.json for Expo/React Native)
  // to handle this scheme (e.g., 'myapp://').
  const RESET_PASSWORD_URL = 'exp://10.14.5.69:8081/--/ResetPassword'

  const handleSendResetLink = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.')
      return
    }

    setLoading(true)
    setMessage('')

    // This call is correct. It sends the email and now tells Supabase
    // to redirect the user to a deep link that opens your app.
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: RESET_PASSWORD_URL,
    })

    setLoading(false)

    if (error) {
      console.error('Password reset error:', error.message)
      // Note: Supabase may intentionally return a generic success message
      // even if the email doesn't exist to prevent enumeration attacks.
      Alert.alert('Error', error.message || 'Could not send reset link.')
    } else {
      // Providing success feedback to the user is excellent.
      setMessage('A password reset link has been sent to your email address. Please check your spam folder.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address, and we'll send you a link to reset your
        password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="your.email@example.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#999"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.button} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSendResetLink}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  message: {
    marginTop: 24,
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
  },
})