import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ThemedText } from '../themed-text';

const XTranslationAnimation = () => {

    const translateX = useSharedValue(0);

    const handlePress = () => {
        translateX.value = withSpring(translateX.value + 50);
    }

    const handleReset = () => {
        translateX.value = withSpring(0);
    }

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value * 2 }]
    }))

    return (
        <View style={{ gap: 18 }}>
            <ThemedText type='subtitle'>X Translation Animation</ThemedText>
            <Animated.View
                style={[styles.box, animatedStyles]}
            />

            <Button onPress={handlePress} title="Click me" />
            <Button onPress={handleReset} title="Reset" />
        </View>
    )
}

export default XTranslationAnimation

const styles = StyleSheet.create({
    box: {
        width: 10,
        height: 10,
        backgroundColor: 'violet'
    }
})