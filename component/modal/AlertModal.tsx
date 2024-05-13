import {View, TouchableOpacity} from 'react-native';
import {
  AlertModalContainer,
  CommonText,
  ModalBackdrop,
} from '../../screen/CommonStyled.style';
import {Colors} from '../../assets/color/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

interface AlertModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  modalTitle: string;
  buttonText: string;
  buttonTextColor: string;
  buttonBgColor: string;
  child: any;
  subText: string;
  AlertButtonCallback?: any;
}

const AlertModal = ({
  modalTitle = '테스트',
  buttonText = '돌아가기',
  buttonTextColor = '#fff',
  child,
  buttonBgColor = '#212121',
  subText = '테스트',
  AlertButtonCallback,
}: AlertModalProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const _onClose = () => {
    navigation.goBack();
  };
  const AlertModalButton = () => {
    return (
      <TouchableOpacity
        onPress={AlertButtonCallback ? AlertButtonCallback : _onClose}
        style={{
          width: '100%',
          height: 55,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: buttonBgColor,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          marginTop: 10,
        }}>
        <CommonText color={buttonTextColor}>{buttonText}</CommonText>
      </TouchableOpacity>
    );
  };

  return (
    <ModalBackdrop>
      <AlertModalContainer>
        <View
          style={{
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CommonText fontSize={16} bold>
            {modalTitle}
          </CommonText>
          <CommonText color={Colors.danger}>{subText}</CommonText>
        </View>
        {child && child()}
        <AlertModalButton />
      </AlertModalContainer>
    </ModalBackdrop>
  );
};

export default AlertModal;
