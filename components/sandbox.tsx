import React from 'react';
import { View } from 'react-native';
import RandomWidthAnimation from './animations/random-width-animation';
import ShakingAnimation from './animations/shaking-animation';
import SvgCircleAnimation from './animations/svg-circle-animation';
import XTranslationAnimation from './animations/x-translation-animation';
import Spacer from './spacer';

const Sandbox = () => {

    const ANIMATION_COMPONENTS = [
        RandomWidthAnimation,
        XTranslationAnimation,
        SvgCircleAnimation,
        ShakingAnimation
    ]

    return (
        <View style={{ flex: 1 }}>
            {/* Display each animation with a spacer after each one */}

            {ANIMATION_COMPONENTS.map(Item => (
                <View key={Item.name}>
                    <Item />
                    <Spacer />
                </View>
            ))}
        </View>

    )
}

export default Sandbox