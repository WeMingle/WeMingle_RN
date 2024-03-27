import { Dimensions, Platform, StatusBar } from 'react-native';
import styled, { css } from 'styled-components/native';

// ios 다이나믹 아일랜드 대응 컴포넌트
export const BaseSafeView = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor || '#fff'};
  padding-top: ${Platform.OS === 'ios' ? StatusBar.currentHeight : 10}px;
`;

// 화면 전체 패딩
export const Container = styled.View`
  flex: 1;
  padding: 20px;
  ${(props) => `justify-content: ${props.justify}` || ''};
`;

// 가로정렬 View
export const RowBox = styled.View`
  flex-direction: row;
  ${(props) => (props.alignC ? 'align-items: center;' : '')};
  justify-content: ${(props) => (props.justify ? props.justify : '')};

  padding-top: ${(props) => props.paddingT || 0}px;
  padding-bottom: ${(props) => props.paddingB || 0}px;
  margin-top: ${(props) => props.marginT || 0}px;
`;

// flex-direction : coulmn, 가운데 정렬
export const CenterBox = styled.View`
  align-items: center;
  justify-content: ${(props) => props.justify};

  margin-top: ${(props) => props.marginT || 15}px;
  padding-top: ${(props) => props.paddingT || 0}px;
`;

export const CommonTouchableOpacity = styled.TouchableOpacity`
  width: ${(props) => props.width || 0}px;
  height: ${(props) => props.height || 0}px;
  background-color: ${(props) => props.bgColor || '#fff'};
  align-items: ${(props) => (props.alignC ? 'center' : 'flex-start')};
  justify-content: ${(props) => (props.justifyC ? 'center' : 'flex-start')};
  margin-top: ${(props) => (props.marginT ? props.marginT : 0)}px;
`;

// 기본 디자인 인풋
export const CommonInput = styled.TextInput`
  width: 100%;
  height: 44px;
  border-width: 1px;
  border-color: #d7dce5;
  margin-top: 8px;
  border-radius: 4px;
  padding: 12px;
  background-color: ${(props) => props.bgColor || '#fff'};
  color: ${(props) => props.color || '#212121'};
`;

export const CommonInputView = styled.View`
  width: 100%;
  height: 44px;
  border-width: 1px;
  border-color: #d7dce5;
  margin-top: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.bgColor || '#fff'};
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  padding: 0 12px 0 12px
`

// 플렉스
export const FlexAutoView = styled.View`
  flex: auto;
`;

// Modal
export const ModalContainer = styled.View`
  width: ${Dimensions.get('screen').width}px;
  height: ${Dimensions.get('screen').height / 2}px;
  background-color: #fff;
  bottom: 0px;
  position: absolute;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 20px;
`;

export const AccountHeader = styled(RowBox)`
  align-items: center;
  padding: 0 0 10px 0;
`;

export const AccountButton = styled(CommonTouchableOpacity)`
  width: 100%;
  height: 48px;
  border-radius: 15px;

  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.marginT || 0}px;
`;

export const CommonText = styled.Text`
  include-font-padding: false;
  font-family: Pretendard-Medium;
  font-size: ${(props) => props.fontSize || 20}px;
  color: ${(props) => props.color || '#000'};
  margin-top: ${(props) => props.marginT || 0}px;
  text-align: ${(props) => (props.textAlignC ? 'center' : 'left')};
  ${(props) => (props.underline ? 'text-decoration-line: underline' : '')};
`;

export const StartButton = styled(CommonTouchableOpacity)`
  border-radius: 50px;
  width: 250px;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.marginT || 0}px;
`;
