import {Modal} from 'react-native';
import {
  AlertModalContainer,
  ModalBackdrop,
  ModalContainer,
} from '../../screen/CommonStyled.style';

export const CustomModal = (props: any) => {
  const {modalVisible, setModalVisible} = props;
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <ModalBackdrop>
        <ModalContainer modalSize={'mSmall'}>{props.children}</ModalContainer>
      </ModalBackdrop>
    </Modal>
  );
};
