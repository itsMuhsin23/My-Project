import FilterBar from '@/Components/FilterBar';
import TaskItem from '@/Components/TaskItem';
import { useTaskContext } from '@/Context/TaskContext';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HomeScreen() {
  const { tasks } = useTaskContext();
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Incomplete'>('All');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return filter === 'Completed' ? task.completed : !task.completed;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return b.createdAt.getTime() - a.createdAt.getTime(); // Newest first
  });

  return (
    <View style={styles.container}>
      <FilterBar filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy} />
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View entering={FadeIn}>
            <TaskItem task={item} />
          </Animated.View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No tasks found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});