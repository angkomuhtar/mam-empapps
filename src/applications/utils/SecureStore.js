import EncryptedStorage from 'react-native-encrypted-storage';

export const store = async ({data, name}) => {
  try {
    await EncryptedStorage.setItem(name, JSON.stringify(data));
  } catch (error) {
    // There was an error on the native side
    return error;
  }
};

export const get = async ({name}) => {
  try {
    const session = await EncryptedStorage.getItem(name);
    if (session !== undefined) {
      return session;
    }
  } catch (error) {
    return error;
  }
};

export const remove = async data => {
  try {
    await EncryptedStorage.setItem('user_session', JSON.stringify(data));
  } catch (error) {
    // There was an error on the native side
    return error;
  }
};
