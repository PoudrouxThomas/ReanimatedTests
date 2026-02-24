import React from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withDecay } from 'react-native-reanimated'
import { ThemedText } from '../themed-text'

const SIZE = 100;
const BOUNDARY_OFFSET = 10;

const DecayingVelocityAnimation = () => {

    const offset = useSharedValue<number>(0);
    const width = useSharedValue<number>(0);

    const onLayout = (event: LayoutChangeEvent) => {
        width.value = event.nativeEvent.layout.width;
    };

    const pan = Gesture.Pan()
        .onChange((event) => {
            offset.value += event.changeX;
        })
        .onFinalize((event) => {
            offset.value = withDecay({
                velocity: event.velocityX,
                rubberBandEffect: true,
                clamp: [
                    -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
                    (width.value / 2) - SIZE / 2 - BOUNDARY_OFFSET
                ]
            });
        })

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offset.value }
        ]
    }))

    return (
        <View onLayout={onLayout} style={{ gap: 18 }}>
            <ThemedText type='subtitle'>Decaying Velocity Animation</ThemedText>
            <View style={styles.wrapper}>
                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.circle, animatedStyles]} />
                </GestureDetector>
            </View>
        </View>
    )
}

export default DecayingVelocityAnimation

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        height: SIZE,
        width: SIZE,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
})