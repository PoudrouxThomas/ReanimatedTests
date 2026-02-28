import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import AnimatedGradient from '../animatedComponents/animated-gradient';
import AnimatedTextInput from '../animatedComponents/animated-text-input';
import Spacer from '../spacer';
import { ThemedText } from '../themed-text';

const LoadingAnimation = () => {

    const animatedProgress = useSharedValue<number>(0);

    const simulateLoading = () => {
        animatedProgress.value = 0;

        const nextStep = () => {
            if (animatedProgress.value >= 100) return;

            const nextValue = Math.min(animatedProgress.value + Math.random() * 20, 100);
            const duration = Math.random() * 800 + 200;

            animatedProgress.value = withTiming(nextValue, { duration }, (finished) => {
                if (finished && nextValue < 100) {
                    scheduleOnRN(nextStep);
                }
            })
        }

        setTimeout(nextStep, 1000);
    }

    const animatedLinearProgressStyle = useAnimatedStyle(() => ({
        width: `${animatedProgress.value}%`
    }))

    const progressText = useDerivedValue(() => {
        return `${animatedProgress.value.toFixed(0)}%`;
    })

    const animatedProps = useAnimatedProps(() => {
        return {
            text: progressText.value
        } as any
    })

    return (
        <View style={{ gap: 18 }}>
            <ThemedText type='subtitle'>Loading Animations</ThemedText>

            {/* ------------------------ Progress below the bar ------------------------ */}
            <View style={{ gap: 0 }}>
                <View style={styles.container}>
                    <AnimatedTextInput
                        underlineColorAndroid="transparent"
                        editable={false}
                        value="0%"
                        style={[styles.progressText, {
                            fontSize: 26,
                            color: "#8AAAFF"
                        }]}
                        animatedProps={animatedProps}
                    />
                </View>

                <View style={{ backgroundColor: '#E6EEFF', height: 10, width: '100%', borderRadius: 5 }}>
                    <AnimatedGradient
                        style={[
                            {
                                height: 10,
                                borderRadius: 5,
                                width: 0
                            },
                            animatedLinearProgressStyle
                        ]}
                        colors={["#8AAAFF", "#FA8CFF"]}
                        start={[0, 0]}
                        end={[1, 0]} />
                </View>
            </View>
            {/* ------------------------------------------------------------------------ */}

            <Spacer />

            {/* ----------------------- Progress inside the bar ----------------------- */}
            <AnimatedGradient
                style={[
                    {
                        height: 40,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        borderRadius: 50,
                        width: 0
                    },
                    animatedLinearProgressStyle
                ]}
                colors={["#8AAAFF", "#FA8CFF"]}
                start={[0, 0]}
                end={[1, 0]}
            >
                <AnimatedTextInput
                    underlineColorAndroid="transparent"
                    editable={false}
                    value="0%"
                    style={styles.progressText}
                    animatedProps={animatedProps}
                />
            </AnimatedGradient>
            {/* ----------------------------------------------------------------------- */}

            < Button onPress={simulateLoading} title="Start loading" />
        </View >
    )
}

export default LoadingAnimation

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },
    progressText: {
        color: "#E6EEFF",
        marginRight: 10,
    }
})

