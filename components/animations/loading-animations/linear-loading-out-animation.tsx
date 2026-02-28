import AnimatedGradient from '@/components/animatedComponents/animated-gradient'
import AnimatedTextInput from '@/components/animatedComponents/animated-text-input'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useAnimatedProps, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { AnimatedLoadingProps } from '../../../types/AnimatedLoadingProps'

const LinearLoadingOutAnimation = ({ animatedProgress }: AnimatedLoadingProps) => {

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
    )
}

export default LinearLoadingOutAnimation

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