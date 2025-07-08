import AddTaskScreen from '@/Screens/AddTaskScreen'; // updated
import HomeScreen from '@/Screens/HomeScreen'; // updated
import TaskDetailScreen from '@/Screens/TaskDetailScreen'; // updated
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  AddTask: undefined;
  TaskDetail: { taskId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}
    </Stack.Navigator>
  );
}