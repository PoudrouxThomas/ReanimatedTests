import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, WigglySpringConfig, withSpring, withTiming } from 'react-native-reanimated'
import { ThemedText } from '../themed-text'

const CirclePanAnimation = () => {

    const pressed = useSharedValue<boolean>(false);
    const offset = useSharedValue<number>(0);

    const pan = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            offset.value += event.changeX;
        })
        .onFinalize(() => {
            pressed.value = false;
            offset.value = withSpring(0, WigglySpringConfig);
        })

    const animatedStyles = useAnimatedStyle(() => ({
        backgroundColor: pressed.value ? '#FFE04B' : '#B58DF1',
        transform: [
            { scale: withTiming(pressed.value ? 1.2 : 1) },
            { translateX: offset.value }
        ]
    }))

    return (
        <View style={{ gap: 18 }}>
            <ThemedText type='subtitle'>Circle Pan Animation</ThemedText>
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.circle, animatedStyles]} />
            </GestureDetector>
        </View>
    )
}

export default CirclePanAnimation

const styles = StyleSheet.create({
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 10,
        alignSelf: "center"
    }
})