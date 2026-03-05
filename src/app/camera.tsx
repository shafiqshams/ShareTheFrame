import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { useRef, useState } from 'react';
import { ActivityIndicator, Button, PixelRatio, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { uploadToCloudinary } from '../lib/cloudinary';

export default function Camera() {
  const { width: windowWidth } = useWindowDimensions();
  const pixelRatio = PixelRatio.get();
  
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const camera = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <ActivityIndicator />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() {
    console.log('take photo');
    const photo = await camera.current?.takePictureAsync({
      quality: 0.75,
    });
    
    if (!photo?.uri) return;

    const context = ImageManipulator.manipulate(photo.uri);
    const manipulatedResult = await context
      .resize({ width: windowWidth * pixelRatio })
      .renderAsync();

    const savedImage = await manipulatedResult.saveAsync({
      compress: 0.75,
      format: SaveFormat.JPEG
    });

    const result = await uploadToCloudinary(savedImage.uri);
    console.log(JSON.stringify(result, null, 2));
  }

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View className='absolute bottom-0 w-full bg-transparent p-4 items-end'>
          <Ionicons 
            name="camera-reverse"
            size={32}
            color="white"
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>

      {/* Footer */}
      <SafeAreaView edges={['bottom']} className='flex-row bg-transparent w-full p-4 justify-center items-center'>
        <Pressable className='bg-white rounded-full w-20 h-20' onPress={takePhoto} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
});
