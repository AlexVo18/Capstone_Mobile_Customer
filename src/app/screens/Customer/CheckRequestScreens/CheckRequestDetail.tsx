import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { mainBlue } from '~/src/app/constants/cssConstants'



const CheckRequestDetail = () => {
  return (
    <View>
      <Text>CheckRequestDetail</Text>
    </View>
  )
}

export default CheckRequestDetail

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 14,
  },
  buttonColor: {
    backgroundColor: mainBlue,
  },
  redButtonColor: {
    backgroundColor: "#dc2626",
  },
  disableButtonColor: {
    backgroundColor: "#d1d5db",
  },
});