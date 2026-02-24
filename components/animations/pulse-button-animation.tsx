import React from 'react';
import { StyleSheet, View } from 'react-native';
import PulseButton from '../animatedComponents/pulse-button';
import { ThemedText } from '../themed-text';

const PulseButtonAnimation = () => {

    return (
        <View style={{ gap: 18 }}>
            <ThemedText type='subtitle'>Pulse Button</ThemedText>
            <View style={styles.row}>
                <PulseButton buttonColor='limegreen' iconName="play" />
                <PulseButton buttonColor='orangered' iconName="stop" />
                <PulseButton buttonColor='royalblue' iconName="pause" />
                <PulseButton buttonColor='grey' iconName="recording" />
            </View>
        </View>
    )
}

export default PulseButtonAnimation

const styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
})