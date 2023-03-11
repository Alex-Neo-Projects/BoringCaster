import { useRef, useState } from 'react';
import { Modal, Image, TouchableOpacity, StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native';

export function ClickableImage({ source }) {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  };

  const scale = Animated.multiply(baseScale, pinchScale);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Image source={{ uri: source }} style={{ alignItems: 'flex-start', width: '100%', height: '100%', resizeMode: 'contain'}} />
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} transparent={true} onRequestClose={handleClose}>
        <TouchableOpacity activeOpacity={1} style={[styles.modalBackground]} onPress={handleClose}>
          <Animated.Image
            style={[
              styles.modalImage,
              {
                transform: [
                  { scale: scale },
                  { scale: scaleValue },
                ],
              },
            ]}
            source={{ uri: source }}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    height: 300,
    marginTop: 10,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
