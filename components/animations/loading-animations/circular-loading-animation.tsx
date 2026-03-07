import AnimatedCircle from '@/components/animatedComponents/animated-circle'
import AnimatedTextInput from '@/components/animatedComponents/animated-text-input'
import { AnimatedLoadingProps } from '@/types/AnimatedLoadingProps'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { cancelAnimation, Easing, interpolate, useAnimatedProps, useAnimatedReaction, useDerivedValue, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'


const SIZE = 200;
const STROKE_WIDTH = 20;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const MINT = '#AAF0D1';
const MINT_DARK = '#2E8B6E';
const BG_TRACK = '#CDD5E0';

const CircularLoadingAnimation = ({ animatedProgress, isLoading }: AnimatedLoadingProps) => {
    const dotCountAnimation = useSharedValue(0);
    const progressText = useDerivedValue(() => {
        const roundedValue = Math.round(animatedProgress.value);

        if (roundedValue >= 100) {
            isLoading!.value = false;
            return "DONE !";
        } else {
            return `${roundedValue.toString().padStart(2, '0')}%`;
        }
    })

    const animatedProgressProps = useAnimatedProps(() => {
        return {
            text: progressText.value,
            fontSize: isLoading!.value ? 72 : 39
        } as any
    })

    const animatedCircleProps = useAnimatedProps(() => {
        const strokeDashoffset = interpolate(
            animatedProgress.value,
            [0, 100],
            [CIRCUMFERENCE, 0],
        );
        return { strokeDashoffset };
    });

    const animatedLoadingDotsProps = useAnimatedProps(() => {
        const dotsCount = Math.min(Math.floor(dotCountAnimation.value), 3);
        const dots = ".".repeat(dotsCount);

        return {
            // height: isLoading.value ? 'auto' : 0,
            opacity: isLoading!.value ? 1 : 0,
            overflow: 'hidden',
            text: `Loading${dots}`,
        } as any
    })

    useAnimatedReaction(
        () => isLoading!.value,
        (currentlyLoading) => {
            if (currentlyLoading) {
                dotCountAnimation.value = withRepeat(
                    withSequence(
                        withTiming(4, { duration: 2000, easing: Easing.linear }),
                    ),
                    -1,
                    false
                );
            } else {
                cancelAnimation(dotCountAnimation);
                dotCountAnimation.value = 0;
            }
        }
    )

    return (
        <View>
            <View style={styles.outerCircle}>
                <View style={styles.innerInset}>
                    <Svg
                        width={SIZE}
                        height={SIZE}
                        viewBox={`0 0 ${SIZE} ${SIZE}`}
                        style={StyleSheet.absoluteFill}
                    >
                        <Circle
                            cx={SIZE / 2}
                            cy={SIZE / 2}
                            r={RADIUS}
                            stroke={BG_TRACK}
                            strokeWidth={STROKE_WIDTH}
                            fill='none'
                            strokeLinecap='round'
                        />
                        <AnimatedCircle
                            cx={SIZE / 2}
                            cy={SIZE / 2}
                            r={RADIUS}
                            stroke={MINT}
                            strokeWidth={STROKE_WIDTH}
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={CIRCUMFERENCE}
                            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                            animatedProps={animatedCircleProps}
                        />
                    </Svg>

                    <View style={styles.centerContent}>
                        <AnimatedTextInput
                            underlineColorAndroid="transparent"
                            editable={false}
                            value="00%"
                            style={styles.percentText}
                            animatedProps={animatedProgressProps}
                        />


                        <AnimatedTextInput
                            underlineColorAndroid="transparent"
                            editable={false}
                            value="Loading"
                            style={styles.loadingLabel}
                            animatedProps={animatedLoadingDotsProps}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CircularLoadingAnimation

const styles = StyleSheet.create({
    outerCircle: {
        width: SIZE + STROKE_WIDTH * 2,
        height: SIZE + STROKE_WIDTH * 2,
        borderRadius: (SIZE + STROKE_WIDTH * 2) / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerInset: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    centerContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    percentText: {
        fontSize: 72,
        fontWeight: 'bold',
        color: MINT_DARK,
        letterSpacing: 1,
        textAlign: 'center',
        borderWidth: 0,
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent'
    },
    loadingLabel: {
        fontSize: 14,
        fontWeight: 300,
        color: MINT_DARK,
        letterSpacing: 3,
        textTransform: 'uppercase',
        marginTop: -20
    }
})