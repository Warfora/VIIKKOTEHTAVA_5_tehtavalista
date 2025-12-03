import * as React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import useTodos, { Task } from './hooks/useTodos';

export function Home() {
  const { tasks, addTask, toggleTask, save } = useTodos();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      <TodoInput onAdd={addTask} onSave={save} />
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