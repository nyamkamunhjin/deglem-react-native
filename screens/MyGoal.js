import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


/**
* @author
* @function MyGoal
**/
const MyGoal = ({ navigation }) => {

const { container } = styles
 return(
  <View style={container}>
    <Text>MyGoal</Text>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center'

  }
})
export default MyGoal