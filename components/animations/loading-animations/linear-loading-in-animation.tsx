import AnimatedGradient from '@/components/animatedComponents/animated-gradient'
import AnimatedTextInput from '@/components/animatedComponents/animated-text-input'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useAnimatedProps, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { AnimatedLoadingProps } from '../../../types/AnimatedLoadingProps'

const LinearLoadingInAnimation = ({ animatedProgress }: AnimatedLoadingProps) => {

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
    )
}

export default LinearLoadingInAnimation

const styles = StyleSheet.create({
    progressText: {
        color: "#E6EEFF",
        marginRight: 10,
    }
})