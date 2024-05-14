import {
  BaseSafeView,
  BorderBox,
  CommonImage,
  CommonText,
  Container,
  HorizontalBar,
  RowBox,
  ScreenWidth,
  ScrollContainer,
} from '../CommonStyled.style';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import Alert_Icon from '../../assets/alert.png';
import Chat_Icon from '../../assets/chat.png';
import WeMingle from '../../assets/WeMingle.png';
import tmpImage from '../../assets/Frame.png';
import Gray_Person from '../../assets/gray_person.png';

import calendar from '../../assets/calendar_month.png';
import person from '../../assets/person.png';

import {FlatList, View} from 'react-native';
import {Colors} from '../../assets/color/Colors';
const HomeScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <BaseSafeView>
      <ScrollContainer
        padding={0}
        style={{
          backgroundColor: '#212121',
        }}>
        <>
          <View>
            <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
              <RowBox alignC justify={'space-between'}>
                <CommonImage source={WeMingle} width={87} height={18} />
                <RowBox>
                  <CommonImage source={Alert_Icon} width={24} height={24} />
                  <CommonImage
                    source={Chat_Icon}
                    width={24}
                    height={24}
                    style={{marginLeft: 12}}
                  />
                </RowBox>
              </RowBox>
            </View>
          </View>
          <Container
            padding={0}
            bgColor={'#fff'}
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <RowBox alignC padding={20}>
              <CommonImage source={tmpImage} width={30} height={30} />
              <CommonText marginL={10} bold>
                축구
              </CommonText>
            </RowBox>
            <HorizontalBar marginT={1} />
            <CommonText marginL={20} fontSize={16}>
              Match 스팟! 💫
            </CommonText>
            <HorizontalBar marginB={0} />
          </Container>
          <View
            style={{
              height: 300,
              width: '100%',
              backgroundColor: Colors.c_gray50,
            }}></View>
          {/* 카드 들어가야함 */}
          <Container>
            <CommonText fontSize={16}># 실시간 매칭순위 ✅</CommonText>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <FlatList
                    numColumns={Math.ceil(6 / 3)}
                    renderItem={({item, index}) => {
                      return (
                        <>
                          <RowBox
                            width={300}
                            height={65}
                            marginR={15}
                            marginT={15}
                            padding={20}
                            alignC
                            justify={'space-between'}
                            style={{
                              borderWidth: 1,
                              borderRadius: 10,
                              borderColor: Colors.c_gray200,
                            }}>
                            <RowBox alignC>
                              <CommonText bold>{index + 1}</CommonText>
                              <View
                                style={{
                                  width: 44,
                                  height: 44,
                                  backgroundColor: '#212121',
                                  borderRadius: 15,
                                  marginLeft: 15,
                                }}
                              />
                              <View style={{marginLeft: 10}}>
                                <CommonText fontSize={12}>
                                  {item.name}
                                </CommonText>
                                <CommonText
                                  color={Colors.c_gray700}
                                  marginT={7}
                                  fontSize={12}>
                                  매칭경험 {item.matchingCnt} 번
                                </CommonText>
                              </View>
                            </RowBox>
                            <RowBox>
                              <CommonImage
                                source={Gray_Person}
                                width={16}
                                height={16}
                              />
                              <CommonText
                                color={Colors.c_gray500}
                                fontSize={12}>
                                54명
                              </CommonText>
                            </RowBox>
                          </RowBox>
                        </>
                      );
                    }}
                    data={[
                      {
                        name: '숭실대 축동',
                        matchingCnt: 42,
                        count: 54,
                      },
                      {
                        name: '숭실대 축동',
                        matchingCnt: 42,
                        count: 54,
                      },
                      {
                        name: '숭실대 축동',
                        matchingCnt: 42,
                        count: 54,
                      },
                      {
                        name: '숭실대 축동',
                        matchingCnt: 42,
                        count: 54,
                      },
                      {
                        name: '숭실대 축동',
                        matchingCnt: 42,
                        count: 54,
                      },
                      {
                        name: '숭실대 축동',
                        matchingCnt: 42,
                        count: 54,
                      },
                    ]}
                  />
                );
              }}
              data={[0]}
            />
            <CommonText marginT={30} fontSize={16}>
              인기 매칭글
            </CommonText>
            <FlatList
              data={[0, 0, 0, 0]}
              horizontal
              renderItem={({item}) => {
                return (
                  <>
                    <BorderBox
                      width={150}
                      height={150}
                      padding={12}
                      marginT={20}
                      marginR={6}>
                      <RowBox>
                        <BorderBox
                          borderColor={Colors.informative}
                          borderR={20}
                          alignC
                          row>
                          <CommonImage
                            source={calendar}
                            width={11}
                            height={11}
                          />
                          <CommonText
                            color={Colors.informative}
                            marginL={5}
                            fontSize={11}>
                            3월 24일
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
                          <CommonText
                            color={Colors.informative}
                            marginL={5}
                            fontSize={11}>
                            개인
                          </CommonText>
                        </BorderBox>
                      </RowBox>
                    </BorderBox>
                  </>
                );
              }}
            />
          </Container>
        </>
      </ScrollContainer>
    </BaseSafeView>
  );
};

export default HomeScreen;
