import React from 'react'
import { View } from 'react-native'

const Spacer = () => {
    return (
        <View
            style={{
                width: "auto",
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                marginVertical: 10
            }}
        />
    )
}

export default Spacer