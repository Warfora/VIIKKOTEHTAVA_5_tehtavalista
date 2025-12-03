import * as React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

export function SaveButton({
  onPress,
  title = 'Save',
  style,
  textStyle,
}: {
  onPress: () => void;
  title?: string;
  style?: any;
  textStyle?: any;
}) {
  return (
    <Pressable onPress={onPress} style={style ?? styles.button}>
      <Text style={textStyle ?? styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export function TodoInput({
  onAdd,
  onSave,
}: {
  onAdd: (text: string) => void;
  onSave?: () => void;
}) {
  const [value, setValue] = React.useState('');

  const submit = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
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
      <SaveButton onPress={onSave ?? (() => {})} />
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