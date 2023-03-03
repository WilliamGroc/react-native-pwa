import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveStore(data: any) {
  let dataToSave = data;
  if (typeof dataToSave === 'object') {
    dataToSave = JSON.stringify(dataToSave);
  }

  await AsyncStorage.setItem('@store', dataToSave);
}

export async function getStore(): Promise<string | null> {
  return AsyncStorage.getItem('@store');
}
