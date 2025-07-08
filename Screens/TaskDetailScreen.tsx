import { useTaskContext } from '@/Context/TaskContext';
import type { RootStackParamList } from '@/Navigation/AppNavigator';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const { params } = useRoute<TaskDetailRouteProp>();
  const { tasks } = useTaskContext();
  const task = tasks.find((t) => t.id === params.taskId);

  const [currentLocation, setCurrentLocation] = React.useState<Location.LocationObjectCoords | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);

  if (!task) return <Text style={styles.error}>Task not found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description || 'No description.'}</Text>
      <Text>Status: {task.completed ? '✅ Completed' : '❌ Incomplete'}</Text>

      {task.location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: task.location.latitude,
            longitude: task.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: task.location.latitude,
              longitude: task.location.longitude,
            }}
            title={task.location.name || task.title}
          />

          {currentLocation && (
            <>
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="You"
                pinColor="blue"
              />
              <Polyline
                coordinates={[
                  {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                  },
                  {
                    latitude: task.location.latitude,
                    longitude: task.location.longitude,
                  },
                ]}
                strokeColor="blue"
                strokeWidth={3}
              />
            </>
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 16, marginBottom: 10 },
  map: { width: '100%', height: 250, marginTop: 20, borderRadius: 10 },
  error: { padding: 20, textAlign: 'center', fontSize: 18 },
});