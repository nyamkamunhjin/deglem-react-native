import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, Paragraph, RadioButton, Text } from 'react-native-paper';
import globalStyles from '../../global-styles';

/**
 * @author
 * @function MultiChoice
 **/
const MultiChoice = ({ input, setInput }) => {
  const { container } = styles;
  return (
    <Dialog.Content>
      <View style={globalStyles.row}>
        <RadioButton
          value="Sedentary"
          status={input === 'Sedentary' ? 'checked' : 'unchecked'}
          onPress={() => setInput('Sedentary')}
        />
        <Text>Sedentary</Text>
      </View>
      <View style={globalStyles.row}>
        <RadioButton
          value="Lightly Active"
          status={input === 'Lightly Active' ? 'checked' : 'unchecked'}
          onPress={() => setInput('Lightly Active')}
        />
        <Text>Lightly Active</Text>
      </View>
      <View style={globalStyles.row}>
        <RadioButton
          value="Active"
          status={input === 'Active' ? 'checked' : 'unchecked'}
          onPress={() => setInput('Active')}
        />
        <Text>Active</Text>
      </View>

      <View style={globalStyles.row}>
        <RadioButton
          value="Very Active"
          status={input === 'Very Active' ? 'checked' : 'unchecked'}
          onPress={() => setInput('Very Active')}
        />
        <Text>Very Active</Text>
      </View>
    </Dialog.Content>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MultiChoice;
