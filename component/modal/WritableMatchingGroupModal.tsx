import React from 'react';
import {
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  CommonImage,
  CommonText,
  Container,
  ModalContainer,
  RowBox,
  ScreenWidth,
  ScrollContainer,
  VerticalBar,
} from '../../screen/CommonStyled.style';

import Close_Icon from '../../assets/close_icon.png';
import {Colors} from '../../assets/color/Colors';

interface WritableMatchingGroupModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  selectedGroup: (value: string) => void;
}

const WritableMatchingGroupModal = ({
  modalVisible,
  setModalVisible,
  selectedGroup,
}: WritableMatchingGroupModalProps) => {
  const GroupList = ({image = '', title = ''}) => {
    return (
      <RowBox alignC fontSize={16}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: 'black',
          }}
        />
        <CommonText fontSize={16} marginL={20}>
          {title}
        </CommonText>
      </RowBox>
    );
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
              <ModalContainer modalSize={'mSmall'}>
                <RowBox alignC justify={'space-between'} paddingB={15}>
                  <CommonText bold fontSize={16}>
                    프로필 설정
                  </CommonText>

                  <CommonImage source={Close_Icon} width={24} height={24} />
                </RowBox>
                <VerticalBar marginT={20} marginB={5} />
                <ScrollContainer
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-around',
                  }}
                  padding={0}>
                  <TouchableOpacity
                    hitSlop={{bottom: 50, top: 50}}
                    onPress={() => {}}>
                    <GroupList title={'위밍 24'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    hitSlop={{bottom: 50, top: 50}}
                    onPress={() => {}}>
                    <GroupList title={'경희대 축동'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    hitSlop={{bottom: 50, top: 50}}
                    onPress={() => {}}>
                    <GroupList title={'경희대 축동'} />
                  </TouchableOpacity>
                </ScrollContainer>
              </ModalContainer>
            </TouchableWithoutFeedback>
          </Container>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default WritableMatchingGroupModal;
