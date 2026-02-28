import React from 'react';
import { Button, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import Spacer from '../../spacer';
import { ThemedText } from '../../themed-text';
import LinearLoadingInAnimation from './linear-loading-in-animation';
import LinearLoadingOutAnimation from './linear-loading-out-animation';

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

    return (
        <View style={{ gap: 18 }}>
            <ThemedText type='subtitle'>Loading Animations</ThemedText>

            <LinearLoadingOutAnimation animatedProgress={animatedProgress} />
            <Spacer />
            <LinearLoadingInAnimation animatedProgress={animatedProgress} />

            < Button onPress={simulateLoading} title="Start loading" />
        </View >
    )
}

export default LoadingAnimation

