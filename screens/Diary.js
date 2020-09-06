import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'


/**
* @author
* @function Diary
**/
const Diary = ({ navigation }) => {

const { container } = styles
 return(
  <View style={container}>
    <Text>Diary</Text>
    <Button
        title="Go to My Goal"
        onPress={() => navigation.navigate('mygoal-tab')} 
      />
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
export default Diary