import { CardProp } from '@/types/AnimatedCardProps';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { EntryOrExitLayoutType, interpolate, interpolateColor, LinearTransition, useAnimatedStyle, useSharedValue, WigglySpringConfig, withSpring, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { ThemedText } from '../themed-text';

const screenWidth = Dimensions.get('window').width;

const AnimatedCard = ({ card, onPress, onSwipeRight }: CardProp) => {

    const pressed = useSharedValue<boolean>(false);
    const offset = useSharedValue<number>(0);

    const cardColorInperpolation = card.category === 'Done'
        ? ['rgba(255, 128, 0, 0)', 'rgba(255, 128, 0, 1)']
        : ['rgba(0, 128, 0, 0)', 'rgba(0, 128, 0, 1)'];

    const pan = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            offset.value += event.changeX;
        })
        .onFinalize(() => {
            pressed.value = false;
            if (offset.value > 120 && onSwipeRight) {
                scheduleOnRN(onSwipeRight, {} as any);
            } else {
                offset.value = withSpring(0, WigglySpringConfig);
            }
        })

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { scale: withTiming(pressed.value ? 1.2 : 1) },
            { translateX: offset.value }
        ]
    }))

    const animatedBackground = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(offset.value, [0, 150], cardColorInperpolation)
    }))

    const iconStyles = useAnimatedStyle(() => {
        const opacity = interpolate(offset.value, [0, 60], [0, 1]);
        const scale = interpolate(offset.value, [0, 150], [0.5, 1.2], 'clamp');

        return {
            opacity,
            transform: [{ scale }]
        };
    });



    const CustomEntering: EntryOrExitLayoutType = () => {
        'worklet';
        const animations = {
            originX: 0,
            scaleY: 1,
            opacity: 1,
        };
        const initialValues = {
            originX: screenWidth,
            transform: [{ scaleY: 0 }],
            scaleY: 0,
            opacity: 0,
        };
        return {
            animations: {
                originX: withTiming(animations.originX, { duration: 500 }),
                transform: [{ scaleY: withTiming(animations.scaleY, { duration: 500 }) }],
                opacity: withTiming(animations.opacity, { duration: 500 }),
            },
            initialValues,
        };
    };

    const CustomExiting: EntryOrExitLayoutType = () => {
        'worklet';
        const animations = {
            originX: screenWidth,
            scaleY: 0,
            opacity: 0,
        };
        const initialValues = {
            originX: 0,
            transform: [{ scaleY: 1 }],
            scaleY: 1,
            opacity: 1,
        };

        return {
            animations: {
                originX: withTiming(animations.originX, { duration: 500 }),
                transform: [{ scaleY: withTiming(animations.scaleY, { duration: 500 }) }],
                opacity: withTiming(animations.opacity, { duration: 500 }),
            },
            initialValues,
        };
    };

    return (
        <GestureDetector gesture={pan}>
            <Animated.View
                entering={CustomEntering}
                exiting={CustomExiting}
                layout={LinearTransition.duration(500)}
                style={[animatedBackground, styles.cardBackground]}
            >
                <Animated.View style={[styles.iconContainer, iconStyles]}>
                    <Ionicons name={card.category === 'Done' ? 'reload-outline' : 'checkmark-circle'} size={28} color="white" />
                </Animated.View>

                <Animated.View
                    style={[animatedStyles]}
                >
                    <Pressable onPress={onPress} style={styles.card}>
                        <ThemedText type='subtitle'>{card.title}</ThemedText>
                        <ThemedText>{card.content}</ThemedText>
                    </Pressable>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    )
};

export default AnimatedCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#B58DF1",
        padding: 10,
        borderRadius: 10,
    },
    cardBackground: {
        borderRadius: 10,
    },
    iconContainer: {
        position: 'absolute',
        left: 20,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    }
})