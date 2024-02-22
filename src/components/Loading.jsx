import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading(props) {
  return (
    <View classNmae='flex-1 justify-center item-center'>
        <ActivityIndicator {...props}/>
    </View>
  )
}
