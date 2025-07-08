
console.log("Is window defined?", typeof window);
import { TaskProvider } from '@/Context/TaskContext';
import AppNavigator from '@/Navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TaskProvider>
  );
}