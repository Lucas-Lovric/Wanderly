import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function LocationScreen() {
  const { lat, lon } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Location:</Text>
      <Text style={styles.text}>Latitude: {lat}</Text>
      <Text style={styles.text}>Longitude: {lon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
});
