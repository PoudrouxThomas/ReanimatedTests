import React from 'react'
import { View, ViewProps } from 'react-native'

const Spacer = ({ style }: ViewProps) => {
    return (
        <View
            style={[{
                width: "auto",
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                marginVertical: 10
            }, style]}
        />
    )
}

export default Spacer