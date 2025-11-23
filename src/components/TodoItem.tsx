import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export function TodoItem({
  task,
  onPress,
}: {
  task: { id: string; text: string; done: boolean };
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <View>
        <Text style={[styles.text, task.done && styles.done]}>{task.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  text: { fontSize: 16 },
  done: { textDecorationLine: 'line-through', color: '#999' },
});

export default TodoItem;