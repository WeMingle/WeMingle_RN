import Toast from 'react-native-toast-message';
export const showToastMessage = (text: string, time = 3000) => {
  Toast.show({
    type: 'customToast',
    position: 'top',
    text1: text,
    visibilityTime: time,
    onPress: async () => {
      await Toast.hide();
    },
    autoHide: true,
  });
};
