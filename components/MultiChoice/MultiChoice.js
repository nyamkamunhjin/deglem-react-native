import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Dialog, Paragraph, RadioButton, Text } from 'react-native-paper';
import globalStyles from '../../global-styles';

/**
 * @author
 * @function MultiChoice
 **/
const MultiChoice = ({ input, setInput, data }) => {
  const { t } = useTranslation();
  // const { container } = styles;
  return (
    <Dialog.Content>
      {data.map((item, index) => (
        <View style={globalStyles.row} key={index + item.value}>
          <RadioButton
            value={item.value}
            status={input === item.value ? 'checked' : 'unchecked'}
            onPress={() => setInput(item.value)}
          />
          <Text>
            {item.sub
              ? t(item.sub)
              : `${item.value > 0 ? '+' : ''}${t(item.value)} ${t(item.desc)}`}
          </Text>
        </View>
      ))}
    </Dialog.Content>
  );
};

export default MultiChoice;
