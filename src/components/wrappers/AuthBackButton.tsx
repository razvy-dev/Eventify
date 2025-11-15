import colors from "@/src/utils/other/colors";
import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

interface AuthBackButtonProps {
    children?: React.ReactNode;
    onPress: () => void;
}

export default function AuthBackButton({ children, onPress }: AuthBackButtonProps) {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onPress}>
                <ArrowLeftIcon color={colors.black} size={18} /> 
            </TouchableOpacity>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        paddingTop: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: colors.white,
        padding: 5,
        borderRadius: 10,
        marginRight: 15,
    }
})