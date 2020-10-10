import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

/**
 * @author
 * @function BarcodeScanner
 **/
const BarcodeScanner = ({
  navigation,
  route: {
    params: { addTo, selectedDate },
  },
}) => {
  const camera = useRef();

  const { container } = styles;
  return (
    <View style={container}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          barcodes[0] &&
            barcodes[0].format !== 'None' &&
            console.log(barcodes[0].data);

          if (barcodes[0] && barcodes[0].format !== 'None') {
            navigation.navigate('add-food', {
              barcode: barcodes[0].dataRaw,
              addTo,
              selectedDate,
            });
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
export default BarcodeScanner;
