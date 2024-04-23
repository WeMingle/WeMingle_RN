import React, { } from 'react';
import { Modal, View } from 'react-native';
import {
  CommonText,
  Container,
  ModalContainer,
} from '../../screen/CommonStyled.style';


const MatchingSortOptionModal = ({
  modalVisible,
  setModalVisible,
}) => {
  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(prev => !prev);
        }}>
        <Container style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <ModalContainer modalSize={'small'}>
            <View style={{
              justifyContent: 'space-around',
              flex: 1
            }}>
              <CommonText fontSize={16}>최신순</CommonText>
              <CommonText fontSize={16}>조회순</CommonText>
              <CommonText fontSize={16}>마감임박순</CommonText>
            </View>
          </ModalContainer>
        </Container>
      </Modal >
    </>
  );
};

export default MatchingSortOptionModal;
