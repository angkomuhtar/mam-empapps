import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsync = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value); // Nilai harus berupa string
    console.log('Data tersimpan!');
  } catch (error) {
    console.error('Gagal menyimpan data:', error);
  }
};

export const getAsync = async key => {
  try {
    if (value !== null) {
      console.log('Data ditemukan:', value);
    } else {
      console.log('Data tidak ditemukan.');
    }
    return (value = await AsyncStorage.getItem(key));
  } catch (error) {
    return null;
    console.error('Gagal membaca data:', error);
  }
};
