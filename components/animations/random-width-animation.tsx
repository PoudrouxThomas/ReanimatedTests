import React from 'react';
import { Button, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { ThemedText } from '../themed-text';

const RandomWidthAnimation = () => {

    const width = useSharedValue(10);

    const handlePress = () => {
        width.value = withSpring(Math.random() * 100 + 50);
    }

    return (
        <View style={{ gap: 18 }}>
            <ThemedText type='subtitle'>Random Width Animation</ThemedText>
            <Animated.View
                style={{
                    width,
                    height: 10,
                    backgroundColor: 'violet'
                }}
            />

            <Button onPress={handlePress} title="Click me" />
        </View>
    )
}

export default RandomWidthAnimation