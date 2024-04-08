import { Dimensions, Platform, StatusBar } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Colors } from '../assets/color/Colors';
import { FontSizeCalculator } from '../component/Common';

export const ScreenWidth = Dimensions.get('screen').width

// ios 다이나믹 아일랜드 대응 컴포넌트
export const BaseSafeView = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor || '#fff'};
  padding-top: ${Platform.OS === 'ios' ? StatusBar.currentHeight : 0}px;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: ${props => (props.padding || props.padding === 0 ? props.padding : 20)}px;
  ${(props) => `justify-content: ${props.justify}` || ''};
  background-color: ${(props) => props.bgColor || '#fff'};
`

// 화면 전체 패딩
export const Container = styled.View`
  flex: 1;
  padding: ${props => (props.padding || props.padding === 0 ? props.padding : 20)}px;
  ${(props) => `justify-content: ${props.justify}` || ''};
  background-color: ${(props) => props.bgColor || '#fff'};

`;

// 가로정렬 View
export const RowBox = styled.View`
  flex-direction: row;
  ${(props) => (props.alignC ? 'align-items: center;' : '')};
  justify-content: ${(props) => (props.justify ? props.justify : '')};
  background-color: ${(props) => props.bgColor || 'transparent'};
  padding:${(props) => props.padding || 0}px;
  margin-top: ${(props) => props.marginT || 0}px;
`;

// flex-direction : coulmn, 가운데 정렬
export const CenterBox = styled.View`
  align-items: center;
  justify-content: ${(props) => props.justify};

  margin-top: ${(props) => props.marginT || 15}px;
  padding-top: ${(props) => props.paddingT || 0}px;

  background-color: ${(props) => props.bgColor && props.bgColor}; 
`;

export const CommonTouchableOpacity = styled.TouchableOpacity`
  width: ${(props) => props.width || 0}px;
  height: ${(props) => props.height || 0}px;
  background-color: ${(props) => props.bgColor || '#fff'};
  align-items: ${(props) => (props.alignC ? 'center' : 'flex-start')};
  justify-content: ${(props) => (props.justifyC ? 'center' : 'flex-start')};
  margin-top: ${(props) => (props.marginT ? props.marginT : 0)}px;
`;

//
export const CommontInput = styled.TextInput`
  color: ${(props) => props.color || '#212121'};
  include-font-padding: false;
  font-family: Pretendard-${props => props.bold ? 'SemiBold' : 'Medium'};
  font-size: ${(props) => FontSizeCalculator(props.fontSize) || FontSizeCalculator(14)}px;
  margin-top: ${props => props.marginT || 0}px
`

// 기본 디자인 인풋
export const CommonInputBox = styled.TextInput`
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
  height: ${(props) => props.height || 44}px;
  border-width: 1px;
  border-color: #d7dce5;
  margin-top: ${props => props.marginT || 8}px;
  border-radius: 4px;
  background-color: ${(props) => props.bgColor || '#fff'};
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  padding: 0 12px 0 12px;
`

// 플렉스
export const FlexAutoView = styled.View`
  flex: auto;
`;

// Modal
export const ModalContainer = styled.View`
  width: ${ScreenWidth}px;
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

export const CommonImage = styled.Image`
  width: ${props => props.width || 0}px;
  height: ${props => props.height || 0}px
`

export const CommonText = styled.Text`
  include-font-padding: false;
  font-family: Pretendard-${props => props.bold ? 'SemiBold' : 'Medium'};
  font-size: ${(props) => FontSizeCalculator(props.fontSize) || FontSizeCalculator(14)}px;
  color: ${(props) => props.color || '#000'};
  margin-top: ${(props) => props.marginT || 0}px;
  margin-right: ${(props) => props.marginR || 0}px;
  margin-left: ${props => props.marginL || 0}px;
  text-align: ${(props) => (props.textAlignC ? 'center' : 'left')};
  ${(props) => (props.underline ? 'text-decoration-line: underline' : '')};
`;

export const StartButton = styled(CommonTouchableOpacity)`
  border-radius: 50px;
  width: ${props => props.width || 250}px;
  height: ${props => props.height || 48}px;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.marginT || 0}px;
`;

export const ProfileBox = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 15px;
  background-color: ${Colors.c_gray400}
`

export const ShadowBox = styled.View`
  border-radius: 16px;
  background-color: transparent;
  shadow-color: #212121;
  shadow-offset: {
    width: 0px;
    height: 1px;
  };
  shadow-opacity: 0.22;
  shadow-radius: 2.22px;
  elevation: 3;
  width: ${props => props.width}px;
  height: ${props => props.height}px
`

export const ShadowContainer = styled.View`
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  padding: 15px;
  justify-content: space-around;
`

export const MatchingBorderBox = styled.View`
  padding: 15px;
  border-radius: 10px;
  border-width:1px;
  border-color: ${Colors.c_gray200};
  width: 100%;
  background-color: #fff;
  margin-top: 15px;
`

export const BorderBox = styled.View`
  margin-left: ${props => props.marginL || 0}px;
  padding: ${props => props.padding ? props.padding : 5}px;
  height: ${props => props.height && props.height}px;
  width: ${props => props.width && props.width}ox;
  border-radius: ${props => props.borderR ? props.borderR : 15}px;
  border-width: 1px;
  border-color: ${props => props.borderColor ? props.borderColor : Colors.c_gray300};
  align-items: ${props => props.alignC && 'center'};
  flex-direction: ${props => props.row ? 'row' : 'coulmn'};
  background-color: ${props => props.bgColor ? props.bgColor : '#fff'};
`

export const profileBox = styled(CenterBox)`

`

export const boxWidth = ScreenWidth / 3 - 20;