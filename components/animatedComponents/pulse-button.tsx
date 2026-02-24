import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

const SIZE = 50;

type PulseButtonProps = {
    iconName: ComponentProps<typeof Ionicons>['name'];
    buttonColor: string;
}

const PulseButton = ({ iconName, buttonColor }: PulseButtonProps) => {

    const animationProgress = useSharedValue<number>(0);
    const isAnimating = useSharedValue<boolean>(false);

    const startPulse = () => {
        // Deux manières de gérer des clics multiples : 

        // --------------------- SOLUTION 1 : Ne pas lancer l'animation si une animation est déjà en cours --------------------- //
        // if (isAnimating.value) return;

        // // Set default state
        // animationProgress.value = 0;
        // isAnimating.value = true;


        // // Start animation
        // animationProgress.value = withTiming(1, { duration: 800 }, () => { isAnimating.value = false; });
        // --------------------------------------------------------------------------------------------------------------------- //


        // -------------------------------- SOLUTION 2 : Redémarrer l'animation depuis le début -------------------------------- //
        animationProgress.value = withSequence(
            withTiming(0, { duration: 0 }),
            withTiming(1, { duration: 800 })
        )
        // --------------------------------------------------------------------------------------------------------------------- //

    }

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(animationProgress.value, [0, 1], [1, 2]) }],
        opacity: interpolate(
            animationProgress.value,
            [0, 0.1, 1],
            [0, 0.6, 0],
            Extrapolation.CLAMP
        )
    }))

    return (
        <Pressable
            style={({ pressed }) => [styles.circleButton, { backgroundColor: buttonColor, opacity: pressed ? 0.8 : 1 }]}
            onPress={startPulse}
        >
            <Animated.View style={[styles.circlePulse, animatedStyles, { backgroundColor: buttonColor }]} />
            <Ionicons name={iconName} color="white" size={25} />
        </Pressable>
    )
}

export default PulseButton

const styles = StyleSheet.create({
    circleButton: {
        width: SIZE,
        height: SIZE,
        padding: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    circlePulse: {
        width: SIZE,
        height: SIZE,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    }
})