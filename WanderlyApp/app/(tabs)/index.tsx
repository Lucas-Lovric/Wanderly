import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import Button from '@/components/Button';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function Index() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {errorMsg ? errorMsg : location ? `Lat: ${location.latitude}, Lon: ${location.longitude}` : 'Fetching location...'}
      </Text>

      {location && (
        <Link
          href={{
            pathname: '/Food',
            params: {
              lat: location.latitude,
              lon: location.longitude,
            },
          }}
          asChild
        >
          <Button label="Find Food Nearby" />
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    marginBottom: 20,
  },
});
