import * as React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import { loadTasks, saveTasks } from './services/storage';

type Task = {
  id: string;
  text: string;
  done: boolean;
};

export function Home() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    (async () => {
      const loaded = await loadTasks();
      setTasks(loaded);
    })();
  }, []);

  const persistAndSet = async (newTasks: Task[]) => {
    setTasks(newTasks);
    await saveTasks(newTasks);
  };

  const addTask = async (text: string) => {
    if (!text.trim()) return;
    const newTask: Task = { id: String(Date.now()), text: text.trim(), done: false };
    await persistAndSet([newTask, ...tasks]);
  };

  const toggleTask = async (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    await persistAndSet(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      <TodoInput onAdd={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem task={item} onPress={() => toggleTask(item.id)} />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  list: { paddingTop: 8 },
});

export default function App() {
  return <Home />;
}
App.displayName = 'App';