// This file handles the final password update after the deep link is clicked.
// Route Path: /ResetPassword

import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import supabase from '../../utils/supabase'; // Your initialized client

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>('Enter and confirm your new password.');

    const handleUpdatePassword = async () => {
        if (!newPassword || newPassword.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        setLoading(true);
        setStatusMessage('Updating password...');
        
        // This call works because the user is temporarily authenticated 
        // by the recovery token found in the URL.
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        setLoading(false);

        if (error) {
            console.error('Password update failed:', error);
            setStatusMessage(`Error: Failed to update password.`);
            Alert.alert('Error', 'Failed to update password. Please re-request the reset link.');
        } else {
            setStatusMessage('Success! Your password has been updated.');
            Alert.alert('Success', 'Your password has been successfully reset. Please log in with your new password.');
            
            // Redirect the user back to the main login screen, replacing history
            router.replace('../Auth/LogIn'); 
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>New Password</Text>
                <Text style={styles.subtitle}>{statusMessage}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm New Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#A3F" style={styles.button} />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#000' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 8, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#ccc', textAlign: 'center', marginBottom: 32 },
    input: { height: 50, borderColor: '#333', borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, fontSize: 16, marginBottom: 16, backgroundColor: '#111', color: '#fff' },
    button: { height: 50, backgroundColor: '#A3F', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 16 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});