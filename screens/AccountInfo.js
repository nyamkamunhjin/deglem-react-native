import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


/**
* @author
* @function AccountInfo
**/
const AccountInfo = ({ navigation }) => {

const { container } = styles
 return(
  <View style={container}>
    <Text>Account Info</Text>
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
export default AccountInfo