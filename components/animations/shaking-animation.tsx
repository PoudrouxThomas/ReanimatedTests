import React from 'react';
import { Button, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { ThemedText } from '../themed-text';

const ShakingAnimation = () => {

    const offset = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }]
    }))

    const OFFSET = 5;
    const TIME = 75;

    const handlePress = () => {
        offset.value =
            withSequence(
                withTiming(-OFFSET, { duration: TIME / 2 }),
                withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
                withTiming(0, { duration: TIME / 2 })
            )
    }

    return (
        <View style={{ gap: 18 }}>
            <ThemedText type='subtitle'>Shaking Animation</ThemedText>
            <Animated.View
                style={[animatedStyle, {
                    width: 100,
                    height: 100,
                    backgroundColor: 'violet'
                }]}
            />
            <Button onPress={handlePress} title="Click me" />
        </View>
    )
}

export default ShakingAnimation