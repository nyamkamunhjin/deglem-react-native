import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import cookieContext from '../../context/cookie-context';
import { BACKEND_URL } from '../../env.config';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

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
  const { cookies } = useContext(cookieContext);
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
    cookies
      .get(BACKEND_URL)
      .then((cookie) => {
        // console.log(cookie);
        if (Object.keys(cookie).length === 0) {
          throw new Error('cookie empty');
        }

        const {
          token: { value },
        } = cookie;

        axios
          .get(`${BACKEND_URL}/api/foods`, {
            headers: {
              Authorization: `Bearer ${value}`,
            },
            params: {
              barcode,
            },
          })
          .then(({ data }) => {
            console.log(data);
            // setShouldDetect(false);
            navigation.navigate('add-food', {
              food: data,
              addTo,
              selectedDate,
            });
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 409 && barcode) {
              navigation.navigate('create-food', {
                barcode,
              });
            }
          });
      })
      .catch((err) => {
        console.error(err);
      });
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
                  console.log(barcodes[0].data);

                if (barcodes[0] && barcodes[0].format !== 'None') {
                  getByBarcode(barcodes[0].dataRaw);
                  setShouldDetect(false);
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
