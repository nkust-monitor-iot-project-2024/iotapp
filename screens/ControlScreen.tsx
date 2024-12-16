import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider'; // 第三方模組
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Switch } from 'react-native-gesture-handler';

export function ControlScreen() {
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [motionDetection, setMotionDetection] = useState(false);

  return (

    
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* content */}
      
    

    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Brightness</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={brightness}
          onValueChange={setBrightness}
        />
        <Text>{Math.round(brightness)}%</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contrast</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={contrast}
          onValueChange={setContrast}
        />
        <Text>{Math.round(contrast)}%</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Motion Detection</Text>
        <Switch value={motionDetection} onValueChange={setMotionDetection} />
      </View>
    </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

