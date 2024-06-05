import {
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from '../assets/color/Colors';
import {FontSizeCalculator} from '../component/Common';

import calendar from '../assets/calendar_month.png';
import person from '../assets/person.png';

import CheckBoxON from '../assets/checkbox_on.png';
import CheckBoxOff from '../assets/checkbox_off.png';
import moment from 'moment';

import {ClickBookmark} from './myGroup/style/MyGroupStyle.style';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('window').height;

// ios 다이나믹 아일랜드 대응 컴포넌트
export const BaseSafeView = styled.View`
  flex: 1;
  background-color: ${(props: {bgColor: any}) => props.bgColor || '#fff'};
  padding-top: ${Platform.OS === 'ios' ? StatusBar.currentHeight : 0}px;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: ${(props: {padding: number}) =>
    props.padding || props.padding === 0 ? props.padding : 20}px;
  ${(props: {justify: string}) => `justify-content: ${props.justify}` || ''};
  background-color: ${(props: {bgColor: string}) => props.bgColor || '#fff'};
`;

// 화면 전체 패딩
export const Container = styled.View`
  flex: 1;
  padding: ${(props: {padding: number}) =>
    props.padding || props.padding === 0 ? props.padding : 20}px;
  ${(props: {justify: string}) => `justify-content: ${props.justify}` || ''};
  background-color: ${(props: {bgColor: string}) => props.bgColor || '#fff'};
`;

export const ModalBackdrop = styled(TouchableWithoutFeedback)`
  justify-content: center;
  align-items: center;
  width: ${ScreenWidth}px;
  height: ${ScreenHeight}px;
  background-color: rgba(0, 0, 0, 0.4);
`;
// 가로정렬 View
export const RowBox = styled.View`
  ${(props: {width: number}) => props.width && `width: ${props.width}px`};
  ${(props: {height: number}) => props.height && `height: ${props.height}px`};
  flex-direction: row;
  ${(props: {alignC: string}) => (props.alignC ? 'align-items: center;' : '')};
  justify-content: ${(props: {justify: string}) =>
    props.justify ? props.justify : ''};
  background-color: ${(props: {bgColor: string}) =>
    props.bgColor || 'transparent'};
  padding: ${(props: {padding: string}) => props.padding || 0}px;
  margin-top: ${(props: {marginT: number}) => props.marginT || 0}px;
  margin-bottom: ${(props: {marginB: number}) => props.marginB || 0}px;
  ${(props: {borderB: number}) =>
    props.borderB &&
    `
  border-bottom-width:1px;
  border-bottom-color: ${Colors.borderColor}`};
  ${(props: {borderT: number}) =>
    props.borderT &&
    `
  border-top-width:1px;
  border-top-color: ${Colors.borderColor}`};
  margin-right: ${(props: {marginR: number}) =>
    props.marginR && props.marginR}px;
`;

// flex-direction : coulmn, 가운데 정렬
export const CenterBox = styled.View`
  align-items: center;
  justify-content: ${(props: {justify: string}) => props.justify};

  margin-top: ${(props: {marginT: number}) => props.marginT || 15}px;
  padding-top: ${(props: {paddingT: number}) => props.paddingT || 0}px;

  background-color: ${(props: {bgColor: string}) =>
    props.bgColor && props.bgColor};
`;

export const CommonTouchableOpacity = styled.TouchableOpacity`
  width: ${(props: {width: number}) => props.width || 0}px;
  height: ${(props: {height: number}) => props.height || 0}px;
  background-color: ${(props: {bgColor: string}) => props.bgColor || '#fff'};
  align-items: ${(props: {alignC: string}) =>
    props.alignC ? 'center' : 'flex-start'};
  justify-content: ${(props: {justifyC: string}) =>
    props.justifyC ? 'center' : 'flex-start'};
  margin-top: ${(props: {marginT: number}) => props.marginT || 0}px;
`;

//
export const CommontInput = styled.TextInput`
  color: ${(props: {color: string}) => props.color || '#212121'};
  include-font-padding: false;
  font-family: Pretendard-${(props: {bold?: boolean}) => (props.bold ? 'SemiBold' : 'Medium')};
  font-size: ${(props: {fontSize?: number}) =>
    props.fontSize
      ? FontSizeCalculator(props.fontSize)
      : FontSizeCalculator(14)}px;
  margin-top: ${(props: {marginT: number}) => props.marginT || 0}px;
`;

// 기본 디자인 인풋
export const CommonInputBox = styled.TextInput`
  width: 100%;
  height: ${(props: {height: number}) => props.height || 44}px;
  border-width: 1px;
  border-color: #d7dce5;
  margin-top: 8px;
  border-radius: 4px;
  padding: 12px;
  background-color: ${(props: {bgColor: string}) => props.bgColor || '#fff'};
  color: ${(props: {color: string}) => props.color || '#212121'};
`;

export const CommonInputView = styled.View`
  width: 100%;
  height: ${(props: {height: number}) => props.height || 44}px;
  border-width: 1px;
  border-color: #d7dce5;
  margin-top: ${(props: {marginT: number}) => props.marginT || 8}px;
  border-radius: 4px;
  background-color: ${(props: {bgColor: string}) => props.bgColor || '#fff'};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 12px;
`;

// 플렉스
export const FlexAutoView = styled.View`
  flex: auto;
`;

interface modalSize {
  [prop: string]: any;
}
export const modalSize: modalSize = {
  small: Dimensions.get('screen').height / 4,
  mSmall: Dimensions.get('screen').height / 3,
  medium: Dimensions.get('screen').height / 2,
  large: (Dimensions.get('screen').height * 3) / 4,
};

// Modal
export const ModalContainer = styled.View`
  width: ${ScreenWidth}px;
  height: ${(props: {modalSize: any}) =>
    props.modalSize ? modalSize[props.modalSize] : modalSize.medium}px;
  background-color: #fff;
  bottom: 0px;
  position: absolute;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 20px;
`;

export const AlertModalContainer = styled.View`
  width: 80%;
  border-radius: 15px;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
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
  margin-top: ${(props: {marginT: number}) => props.marginT || 0}px;
`;

export const CommonImage = styled.Image`
  width: ${(props: {width: number}) => props.width || 0}px;
  height: ${(props: {height: number}) => props.height || 0}px;
  margin-top: ${(props: {marginT: number}) => props.marginT || 0}px;
  margin-bottom: ${(props: {marginB: number}) => props.marginB || 0}px;
`;

export const CommonText = styled.Text`
  include-font-padding: false;
  font-family: Pretendard-${(props: {bold: string}) => (props.bold ? 'SemiBold' : 'Medium')};
  font-size: ${(props: {fontSize?: number}) =>
    props.fontSize
      ? FontSizeCalculator(props.fontSize)
      : FontSizeCalculator(14)}px;
  color: ${(props: {color: string}) => props.color || '#000'};
  margin-top: ${(props: {marginT: string}) => props.marginT || 0}px;
  margin-right: ${(props: {marginR: string}) => props.marginR || 0}px;
  margin-left: ${(props: {marginL: string}) => props.marginL || 0}px;
  text-align: ${(props: {textAlignC: string}) =>
    props.textAlignC ? 'center' : 'left'};
  ${(props: {underline: string}) =>
    props.underline ? 'text-decoration-line: underline' : ''};
`;

export const StartButton = styled(CommonTouchableOpacity)`
  border-radius: 50px;
  width: ${(props: {width?: number}) => props.width || 250}px;
  height: ${(props: {height?: number}) => props.height || 48}px;
  align-items: center;
  justify-content: center;
  margin-top: ${(props: {marginT?: number}) => props.marginT || 0}px;
`;

export const ProfileBox = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 15px;
  background-color: ${Colors.c_gray400};
`;

export const ShadowBox = styled.View`
  border-radius: 16px;
  background-color: transparent;
  shadow-color: #212121;
  shadow-offset: {
    width: 0px;
    height: 1px;
  }
  shadow-opacity: 0.22;
  shadow-radius: 2.22px;
  elevation: 3;
  width: ${(props: {width?: number}) => props.width}px;
  height: ${(props: {height?: number}) => props.height}px;
`;

export const ShadowContainer = styled.View`
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  width: ${(props: {width?: number}) => props.width}px;
  height: ${(props: {height?: number}) => props.height}px;
  padding: 15px;
  justify-content: space-around;
`;

export const MatchingBorderBox = styled.View`
  padding: 15px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${Colors.c_gray200};
  width: 100%;
  background-color: #fff;
  margin-top: 15px;
`;

export const BorderBox = styled.View`
  margin-left: ${(props: {marginL?: number}) => props.marginL || 0}px;
  margin-right: ${(props: {marginR?: number}) => props.marginR || 0}px;
  margin-top: ${(props: {marginT?: number}) => props.marginT || 0}px;
  padding: ${(props: {padding?: number}) =>
    props.padding === 0 ? 0 : props.padding ? props.padding : 5}px;
  height: ${(props: {height?: number}) => props.height && props.height}px;
  width: ${(props: {width: number}) => props.width && props.width}px;
  border-radius: ${(props: {borderR: number}) =>
    props.borderR ? props.borderR : 15}px;
  border-width: 1px;
  border-color: ${(props: {borderColor: number}) =>
    props.borderColor ? props.borderColor : Colors.c_gray300};
  align-items: ${(props: {alignC: string}) => props.alignC && 'center'};
  flex-direction: ${(props: {row: boolean}) => (props.row ? 'row' : 'coulmn')};
  background-color: ${(props: {bgColor: string}) => props.bgColor || '#fff'};
`;

export const BorderBoxButton = styled.TouchableOpacity`
  margin-left: ${(props: {marginL: number}) => props.marginL || 0}px;
  padding: 5px 12px 5px 12px;
  height: ${(props: {height: number}) => props.height && props.height}px;
  width: ${(props: {width: number}) => props.width && props.width}px;
  border-radius: ${(props: {borderR: number}) =>
    props.borderR ? props.borderR : 15}px;
  border-width: 1px;
  border-color: ${(props: {borderColor: number}) =>
    props.borderColor ? props.borderColor : Colors.c_gray300};
  align-items: center;
  justify-content: center;
  flex-direction: ${(props: {row: number}) => (props.row ? 'row' : 'coulmn')};
  background-color: ${(props: {bgColor: string}) => props.bgColor || '#fff'};
  margin-right: ${(props: {marginR: number}) =>
    props.marginR && props.marginR}px;
  margin-top: ${(props: {marginT: number}) => props.marginT && props.marginT}px;
`;

export const profileBox = styled(CenterBox)``;

export const ConfirmButton = styled(BorderBoxButton)`
  height: 48px;
  background-color: #212121;
  width: ${ScreenWidth - 40}px;
  position: ${(props: {position: number}) =>
    props.position ? props.position : 'relative'};
  left: 20px;
  bottom: ${(props: {bottom: number}) => props.bottom && props.bottom}px;
  margin-top: ${(props: {marginT: number}) => props.marginT && props.marginT}px;
  margin-bottom: ${(props: {marginB: number}) =>
    props.marginB && props.marginB}px;
`;

export const VerticalBar = styled.View`
  width: ${(props: {width: number}) =>
    props.width ? props.width : ScreenWidth}px;
  height: 1px;
  left: -20px;
  background-color: ${Colors.c_gray200};
  margin-top: ${(props: {marginT: number}) => props.marginT || 20}px;
  margin-bottom: ${(props: {marginB: number}) => props.marginB || 0}px;
`;
export const MatchingItem = ({item, index, paddingN}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const isFocus = useIsFocused();
  return (
    <>
      <RowBox
        justify={'space-between'}
        marginT={20}
        style={paddingN ? {} : {paddingLeft: 20, paddingRight: 20}}>
        <RowBox>
          <BorderBox borderColor={Colors.informative} borderR={20} alignC row>
            <CommonImage source={calendar} width={11} height={11} />
            <CommonText color={Colors.informative} marginL={5} fontSize={11}>
              {`${item.matchingDate[0].slice(
                5,
                7,
              )}월 ${item.matchingDate[0].slice(8, 10)}일`}
            </CommonText>
          </BorderBox>
          <BorderBox
            borderColor={'#fff'}
            marginL={5}
            borderR={20}
            alignC
            row
            bgColor={Colors.c_gray200}
            style={{
              paddingRight: 7,
            }}>
            <CommonImage source={person} width={11} height={11} />
            <CommonText color={Colors.informative} marginL={5} fontSize={11}>
              {item.recruiterType === 'INDIVIDUAL' ? '개인' : '그룹'}
            </CommonText>
          </BorderBox>
        </RowBox>
        <TouchableOpacity>
          <ClickBookmark bookmark={item?.bookmarked} width={26} height={24} />
        </TouchableOpacity>
      </RowBox>
      <RowBox
        alignC
        padding={paddingN ? 0 : 20}
        style={{paddingBottom: 30, paddingTop: 20}}
        borderB>
        <CommonTouchableOpacity
          onPress={() => {
            navigation.navigate('MatchingDetail', {});
          }}
          style={[
            {
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'flex-end',
            },
          ]}
          bgColor={'#000'}
          width={80}
          height={80}
        />
        <View
          style={{justifyContent: 'space-between', marginLeft: 15, height: 80}}>
          <CommonText>
            {item.writer}
            <CommonText color={Colors.c_gray400} fontSize={12}>
              매칭 경험 {item.matchingCnt}번
            </CommonText>
          </CommonText>
          <CommonText fontSize={10}>{item.contents}</CommonText>
          <RowBox marginT={5}>
            <CommonText color={Colors.c_gray500} fontSize={10}>
              지역
            </CommonText>
            <CommonText fontSize={10} marginL={15}>
              {item.areaList}
              {item.locationConsensusPossible && (
                <CommonText fontSize={10} color={Colors.c_gray400}>
                  (협의가능)
                </CommonText>
              )}
            </CommonText>
            <CommonText
              color={Colors.c_gray500}
              fontSize={10}
              marginR={15}
              marginL={25}>
              실력
            </CommonText>
            <CommonText fontSize={10}>
              Lv.{' '}
              {item.ability === 'LOW'
                ? '1-3'
                : item.ability === 'MEDIUM'
                ? '4-6'
                : '7-9'}
            </CommonText>
          </RowBox>
        </View>
      </RowBox>
    </>
  );
};

export const HorizontalBar = styled.View`
  width: ${ScreenWidth}px;
  height: 1px;
  background-color: ${Colors.c_gray200};
  margin-top: ${(props: {marginT: number}) =>
    props.marginT || props.marginT === 0 ? props.marginT : 20}px;
  margin-bottom: ${(props: {marginB: number}) =>
    props.marginB || props.marginB === 0 ? props.marginB : 20}px;
`;

export const CheckBox = ({isChecked = true}) => {
  return (
    <CommonImage
      source={isChecked ? CheckBoxON : CheckBoxOff}
      width={18}
      height={18}
    />
  );
};

export const boxWidth = ScreenWidth / 3 - 20;
