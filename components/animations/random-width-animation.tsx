import React from 'react';
import { Button, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const RandomWidthAnimation = () => {

    const width = useSharedValue(10);

    const handlePress = () => {
        width.value = withSpring(Math.random() * 100 + 50);
    }

    return (
        <View style={{ gap: 18 }}>
            <Animated.View
                style={{
                    width,
                    height: 100,
                    backgroundColor: 'violet'
                }}
            />

            <Button onPress={handlePress} title="Click me" />
        </View>
    )
}

export default RandomWidthAnimation