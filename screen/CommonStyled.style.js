import { Dimensions, Platform, StatusBar, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Colors } from '../assets/color/Colors';
import { FontSizeCalculator } from '../component/Common';

import Home_Icon from '../assets/home_icon.png'
import Matchin_Icon from '../assets/matching_icon.png'
import Group_Icon from '../assets/group_icon.png'
import MyPage_Icon from '../assets/mypage_icon.png'
import calendar from '../assets/calendar_month.png'
import person from '../assets/person.png'

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
  ${props => props.width && `width: ${props.width}px`};
  ${props => props.height && `height: ${props.height}px`};
  flex-direction: row;
  ${(props) => (props.alignC ? 'align-items: center;' : '')};
  justify-content: ${(props) => (props.justify ? props.justify : '')};
  background-color: ${(props) => props.bgColor || 'transparent'};
  padding:${(props) => props.padding || 0}px;
  margin-top: ${(props) => props.marginT || 0}px;
  margin-bottom: ${(props) => props.marginB || 0}px;
  ${props => props.borderB && `
  border-bottom-width:1px;
  border-bottom-color: ${Colors.borderColor}`};
  ${props => props.borderT && `
  border-top-width:1px;
  border-top-color: ${Colors.borderColor}`};
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
  height: ${props => props.height || 44}px;
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
export const modalSize = {
  small: Dimensions.get('screen').height / 4,
  medium: Dimensions.get('screen').height / 2,
  large: Dimensions.get('screen').height * 3 / 4
}
// Modal
export const ModalContainer = styled.View`
  width: ${ScreenWidth}px;
  height: ${props => props.modalSize ? modalSize[props.modalSize] : modalSize.medium}px;
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

export const BorderBoxButton = styled.TouchableOpacity`
  margin-left: ${props => props.marginL || 0}px;
  padding: 5px 12px 5px 12px;
  height: ${props => props.height && props.height}px;
  width: ${props => props.width && props.width}px;
  border-radius: ${props => props.borderR ? props.borderR : 15}px;
  border-width: 1px;
  border-color: ${props => props.borderColor ? props.borderColor : Colors.c_gray300};
  align-items: center;
  justify-content: center;
  flex-direction: ${props => props.row ? 'row' : 'coulmn'};
  background-color: ${props => props.bgColor ? props.bgColor : '#fff'};
`

export const profileBox = styled(CenterBox)`

`

export const ConfirmButton = styled(BorderBoxButton)`
  height: 48px;
  background-color: #212121;
  width: ${ScreenWidth - 40}px;
  position: ${props => props.position ? props.position : 'relative'};
  left: 20px;
  bottom:${props => props.bottom && props.bottom}px;
  margin-top: ${props => props.marginT && props.marginT}px;
  margin-bottom: ${props => props.marginB && props.marginB}px;
`

export const MatchingItem = ({ item, index }) => {
  return <>
    <RowBox marginT={20} style={{ paddingLeft: 20 }}>
      <BorderBox borderColor={Colors.informative} borderR={20} alignC row padding={7}>
        <CommonImage source={calendar} width={11} height={11} />
        <CommonText color={Colors.informative} marginL={5} fontSize={11}>3월 24일</CommonText>
      </BorderBox>
      <BorderBox borderColor={'#fff'} marginL={5} borderR={20} alignC row padding={7} bgColor={Colors.c_gray200}>
        <CommonImage source={person} width={11} height={11} />
        <CommonText color={Colors.informative} marginL={5} fontSize={11}>3월 24일</CommonText>
      </BorderBox>
    </RowBox>
    <RowBox alignC padding={20} style={{ paddingBottom: 30 }} borderB >
      <CommonTouchableOpacity
        style={[
          {
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'flex-end',
          },
        ]}
        bgColor={'#000'}
        width={80}
        height={80}>

      </CommonTouchableOpacity>
      <View style={{ justifyContent: 'space-between', marginLeft: 15, height: 80 }}>
        <CommonText>위밍글러12 <CommonText color={Colors.c_gray400} fontSize={12}>매칭 경험 5번</CommonText></CommonText>
        <CommonText fontSize={10}>3월 24일 가볍게 경기 매칭 하실 용병 구합니다.</CommonText>
        <RowBox marginT={5}>
          <CommonText color={Colors.c_gray500} fontSize={10}>지역</CommonText><CommonText fontSize={10} marginL={15}>서울 전체<CommonText fontSize={10} color={Colors.c_gray400}>(협의가능)</CommonText></CommonText>
          <CommonText color={Colors.c_gray500} fontSize={10} marginR={15} marginL={25}>실력</CommonText><CommonText fontSize={10} >Lv. 1-3</CommonText>
        </RowBox>
      </View>
    </RowBox>

  </ >
}

export const boxWidth = ScreenWidth / 3 - 20;