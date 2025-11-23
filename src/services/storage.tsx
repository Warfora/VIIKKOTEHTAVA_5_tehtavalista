import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@myapp:tasks';

export async function loadTasks(): Promise<{ id: string; text: string; done: boolean }[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load tasks', e);
    return [];
  }
}

export async function saveTasks(tasks: { id: string; text: string; done: boolean }[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('Failed to save tasks', e);
  }
}

export default { loadTasks, saveTasks };