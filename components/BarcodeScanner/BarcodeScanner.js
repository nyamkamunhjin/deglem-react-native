import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import cookieContext from '../../context/cookie-context';
import { BACKEND_URL } from '../../env.config';
import axios from 'axios';
import { StackActions, useIsFocused } from '@react-navigation/native';
import FoodAPI from '../../api/FoodAPI';

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
  const { token } = useContext(cookieContext);
  const [shouldDetect, setShouldDetect] = useState(true);
  const isFocused = useIsFocused();
  const camera = useRef();

  const { container } = styles;

  useEffect(() => {
    if (isFocused) {
      setShouldDetect(true);
    }

    return () => {
      setShouldDetect(false);
    };
  }, [isFocused]);

  const getByBarcode = async (barcode) => {
    const { data, err } = await FoodAPI.getFoodByBarcode(token, barcode);

    if (err) {
      console.log(err);
      if (err.response.status === 409 && barcode) {
        navigation.navigate('create-food', {
          barcode,
        });
      }
    } else {
      navigation.navigate('add-food', {
        food: data,
        addTo,
        selectedDate,
      });
    }
  };

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
        onGoogleVisionBarcodesDetected={
          shouldDetect
            ? ({ barcodes }) => {
                barcodes[0] &&
                  barcodes[0].format !== 'None' &&
                  console.log(barcodes[0]);

                if (barcodes[0] && barcodes[0].format !== 'None') {
                  getByBarcode(barcodes[0].dataRaw);
                }
              }
            : null
        }
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
