import React from 'react';
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  CommonText,
  Container,
  ModalContainer,
} from '../../screen/CommonStyled.style';

interface MatchingSortOptionModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setSortOption: (value: string) => void;
}

const MatchingSortOptionModal = ({
  modalVisible,
  setModalVisible,
  setSortOption,
}: MatchingSortOptionModalProps) => {
  const selectOption = (option: string) => {
    setSortOption(option);
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <Container style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <ModalContainer modalSize={'small'}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    hitSlop={{bottom: 50, top: 50}}
                    onPress={() => selectOption('NEW')}>
                    <CommonText fontSize={16}>최신순</CommonText>
                  </TouchableOpacity>
                  {/* <CommonText fontSize={16}>조회순</CommonText>
                  <TouchableOpacity>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    hitSlop={{bottom: 50, top: 50}}
                    onPress={() => selectOption('DEADLINE')}>
                    <CommonText fontSize={16}>마감임박순</CommonText>
                  </TouchableOpacity>
                </View>
              </ModalContainer>
            </TouchableWithoutFeedback>
          </Container>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default MatchingSortOptionModal;
