import * as React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

export function TodoInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [value, setValue] = React.useState('');

  const submit = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={submit}
        returnKeyType="done"
      />
      <Pressable onPress={submit} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8 },
  button: { backgroundColor: '#007aff', paddingHorizontal: 12, justifyContent: 'center', borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '600' },
});

export default TodoInput;