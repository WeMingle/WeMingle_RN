import {Provider} from 'react-redux';
import RootScreen from './screen/RootScreen';
import {Store} from './redux/Store';
import {CommonText} from './screen/CommonStyled.style';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  const toastConfig = {
    customToast: ({text1, onPress, props}: any) => (
      <View
        onStartShouldSetResponder={onPress}
        style={{
          width: '92%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'rgba(22,22,22,0.60)',
            height: 60,
            justifyContent: 'center',
            borderRadius: 17,
          }}>
          <CommonText color={'#fff'}>{text1}</CommonText>
        </View>
      </View>
    ),
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={Store}>
        <RootScreen />
        <Toast config={toastConfig} />
      </Provider>
    </GestureHandlerRootView>
  );
}
