import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import Svg from 'react-native-svg'
import AnimatedCircle from '../animatedComponents/animated-circle'
import { ThemedText } from '../themed-text'

const SvgCircleAnimation = () => {

    const r = useSharedValue(10);

    const animatedProps = useAnimatedProps(() => ({
        r: r.value
    }))

    const handlePress = () => {
        r.value = withTiming(r.value + 10);
    }

    const handleReset = () => {
        r.value = withTiming(10);
    }

    return (
        <View style={{ gap: 18 }}>
            <ThemedText type='subtitle'>SVG Circle Animation</ThemedText>
            <Svg height="100" width="100" viewBox="0 0 100 100">
                <AnimatedCircle cx="50" cy="50" fill="violet" animatedProps={animatedProps} />
            </Svg>
            <Button onPress={handlePress} title='Click me' />
            <Button onPress={handleReset} title='Reset' />
        </View>
    )
}

export default SvgCircleAnimation

const styles = StyleSheet.create({})