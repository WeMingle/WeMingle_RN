import {
  BaseSafeView,
  BorderBox,
  CommonImage,
  CommonText,
  Container,
  HorizontalBar,
  MatchingItem,
  RowBox,
  ScreenWidth,
  ScrollContainer,
} from '../CommonStyled.style';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';

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
import Arrow_Right from '../../assets/arrow_right.png';
import Arrow_Down from '../../assets/arrow_down.png';

import {FlatList, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../assets/color/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Reducers';
import {useEffect, useState} from 'react';
import {
  getPopularMatchingList,
  getRealTimePopularMatching,
  getRecentMatchingList,
} from '../../api/Matching';
import {
  BookmarkImage,
  ClickBookmark,
} from '../myGroup/style/MyGroupStyle.style';

interface MatchingList {
  [prop: string]: any;
}

const HomeScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  // const {accessToken} = useSelector((state: RootState) => state.token);
  // console.log(accessToken);

  const [popularMatchingList, setPopularMatchingList] = useState<MatchingList>(
    {},
  );
  const [recentMatchingList, setRecentMatchingList] = useState<MatchingList>(
    {},
  );
  const [realTimeMatchingList, setRealTimeMatchingList] =
    useState<MatchingList>();

  // console.log('popularMatchingList', popularMatchingList);
  // console.log('recentMatchingList', recentMatchingList);
  // console.log('realTimeMatchingList', realTimeMatchingList);

  useEffect(() => {
    const getAsyncFunc = async () => {
      const result = await getPopularMatchingList();
      const result2 = await getRecentMatchingList();
      const result3 = await getRealTimePopularMatching();

      setPopularMatchingList(result);
      setRecentMatchingList(result2);
      setRealTimeMatchingList(result3);
    };
    getAsyncFunc();
  }, []);

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
            <RowBox alignC padding={20} justify={'space-between'}>
              <RowBox alignC>
                <CommonImage source={tmpImage} width={30} height={30} />
                <CommonText marginL={10} bold>
                  축구
                </CommonText>
              </RowBox>

              <CommonImage source={Arrow_Down} width={24} height={24} />
            </RowBox>
            <HorizontalBar marginT={1} />
            <CommonText marginL={20} fontSize={16}>
              Match 스팟! 💫
            </CommonText>
            <HorizontalBar marginB={0} />
          </Container>
          <View
            style={{
              height: 360,
              width: '100%',
              backgroundColor: Colors.c_gray50,
            }}>
            <Carousel
              data={[0, 1, 2]}
              renderItem={() => {
                const tmp = Object.keys(recentMatchingList);
                return (
                  <BorderBox
                    padding={0}
                    bgColor={'#212121'}
                    style={{
                      width: 290,
                      height: 320,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}>
                    <BorderBox
                      style={{
                        width: 290,
                        height: 100,
                        bottom: 1,
                        right: 1,
                      }}
                    />
                    <BorderBox
                      marginT={10}
                      height={100}
                      width={260}
                      padding={10}
                      style={{alignSelf: 'center'}}>
                      <RowBox justify={'space-between'}>
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
                            <CommonImage
                              source={person}
                              width={11}
                              height={11}
                            />
                            <CommonText
                              color={Colors.informative}
                              marginL={5}
                              fontSize={11}>
                              개인
                            </CommonText>
                          </BorderBox>
                        </RowBox>
                        <ClickBookmark
                          bookmark={false}
                          width={26}
                          height={24}
                        />
                      </RowBox>
                      <RowBox></RowBox>
                    </BorderBox>
                  </BorderBox>
                );
              }}
              sliderWidth={ScreenWidth}
              itemWidth={290}
            />
          </View>
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
            <RowBox marginT={30} alignC justify={'space-between'}>
              <CommonText fontSize={16}>인기 매칭글</CommonText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PopularMatchingList');
                }}
                hitSlop={{right: 10, left: 10, top: 10, bottom: 10}}>
                <CommonImage source={Arrow_Right} width={24} height={24} />
              </TouchableOpacity>
            </RowBox>
            <FlatList
              data={[0, 0, 0, 0]}
              horizontal
              showsHorizontalScrollIndicator={false}
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
            <CommonText marginT={30} fontSize={16}>
              최신 매칭글
            </CommonText>
            <FlatList
              style={{flexGrow: 0}}
              data={Object.keys(recentMatchingList)}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <MatchingItem
                    item={{
                      writer: recentMatchingList[item].nickname,
                      contents: recentMatchingList[item].content,
                      areaList: recentMatchingList[item].areas,
                      ...recentMatchingList[item],
                    }}
                    paddingN
                  />
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
