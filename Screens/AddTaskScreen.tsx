import MapPicker from '@/Components/MapPicker'; // ✅ Import it
import { TaskContext } from '@/Context/TaskContext';
import { useContext, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

const AddTaskScreen = ({ navigation }) => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = 
  useState<{
    latitude: number,
    longitude: number,
    name?: string,
  } | undefined>(undefined);
  // ✅ Location state

  const handleAddTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      created: new Date(),
      ...AddTaskScreen(location && { location }),
       // ✅ Include location if set
    };

    addTask(newTask);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      {/* ✅ MapPicker added here */}
      <Text style={styles.label}>Pick Location (optional)</Text>
      <MapPicker onLocationSelect={(coords) => setLocation(coords)} />

      <Button title="Add Task" onPress={handleAddTask} />
    </ScrollView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 5,
    borderRadius: 5,
  },
});