import colors from "@/src/utils/other/colors"; // Assuming colors utility is available
import { router } from "expo-router";
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');

// Placeholder component for the Map Background (The image itself is complex, so we'll simulate the look)
const MapBackground = () => (
    // FIX: Using absoluteFillObject to ensure it covers the entire screen space
    <View style={styles.mapBackgroundPlaceholder} />
);

export default function SelectLocation() {

    const handleCitySelection = () => {
        // Implement navigation logic here, e.g., to a city selection modal or screen
        console.log("Navigating to city selection...");
        router.push("/Auth/PickCity");
    };

    return (
        <View style={styles.fullScreen}>
            
            {/* 1. Background Layer (Map/Vector) */}
            <MapBackground />

            {/* 2. Main Content Wrapper (Select Location Text) */}
            {/* The main content is positioned relative to the top of the screen */}
            <SafeAreaView style={styles.contentWrapper}>
                
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Select Location</Text>
                    <Text style={styles.subtitle}>
                        Let&apos;s find your next event. Stay in tune with{"\n"}what&apos;s happening in your area!
                    </Text>
                </View>
            </SafeAreaView>

            {/* 3. Bottom Button (Choose City) - Pinned to the very bottom */}
            {/* Placed outside the contentWrapper to ensure it always sticks to the bottom edge */}
            <View style={styles.bottomButtonContainer}>
                <SafeAreaView edges={['bottom']}>
                    <TouchableOpacity
                        style={styles.chooseCityButton}
                        onPress={handleCitySelection}
                    >
                        <Text style={styles.chooseCityButtonText}>Choose city</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: colors.white,
    },

    // --- Background Map Styles ---
    mapBackgroundPlaceholder: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#DCDCDC', 
        opacity: 0.8,
        zIndex: 0,
    },

    contentWrapper: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: height * 0.15, 
        zIndex: 1,
    },
    textContainer: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        color: colors.black,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        opacity: 0.7,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 30,
        paddingBottom: 15, 
        zIndex: 2,
    },
    chooseCityButton: {
        backgroundColor: '#900021', 
        borderRadius: 10,
        paddingVertical: 18,
        alignItems: 'center',
        width: '100%',
    },
    chooseCityButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});