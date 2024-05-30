import {useState} from 'react';
import {TextInput} from 'react-native';
import {
  AccountButton,
  BaseSafeView,
  CommonInputView,
  CommonText,
  Container,
} from '../CommonStyled.style';
import {Colors} from '../../assets/color/Colors';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import {CommonHeader} from '../../component/header/CommonHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {certificationEmail, checkEmailNumber} from '../../api/Account';

const CertificationSchoolScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [email, setEmail] = useState<string>('dlgusxo1000@gmail.com');
  const [checkNum, setCheckNum] = useState<number | null>(null);
  const [isSendEmail, setIsSendEmail] = useState(false);
  return (
    <BaseSafeView>
      <Container>
        {/* <CommonTouchableOpacity
          marginT={20}
          width={Dimensions.get('screen').width - 40}
          height={60}
          style={{
            borderWidth: 1,
            borderColor: Colors.c_gray300,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <CommonText fontSize={14}>학교 인증을 완료해주세요.</CommonText>
          <Image source={Arrow_Right} style={{width: 8, height: 15}} />
        </CommonTouchableOpacity> */}
        <CommonHeader headerTitle={'학교 인증'} />

        <CommonText marginT={28} fontSize={14}>
          학교 메일 주소
        </CommonText>
        <CommonInputView>
          <TextInput
            style={{width: '70%', color: '#212121'}}
            value={email}
            onChangeText={v => setEmail(v)}
          />
          <TouchableOpacity
            onPress={async () => {
              if (isSendEmail) {
                return;
              }
              const result = await certificationEmail(email);
              setIsSendEmail(result === true && true);
            }}>
            <CommonText
              color={isSendEmail ? Colors.c_gray500 : Colors.blue400}
              fontSize={14}>
              인증번호받기
            </CommonText>
          </TouchableOpacity>
        </CommonInputView>

        <CommonText marginT={28} fontSize={14}>
          인증번호
        </CommonText>
        <CommonInputView>
          <TextInput
            style={{width: '70%', color: '#212121'}}
            keyboardType="number-pad"
            value={checkNum}
            onChangeText={v => setCheckNum(v)}
          />
        </CommonInputView>

        <AccountButton
          onPress={() => {
            navigation.navigate('Home');
            checkEmailNumber({email: email, checkNum: checkNum});
          }}
          style={{bottom: 20, position: 'absolute', alignSelf: 'center'}}
          bgColor={checkNum ? '#000' : '#D7DCE5'}
          marginT={20}>
          <CommonText color={'#fff'}>선택완료</CommonText>
        </AccountButton>
      </Container>
    </BaseSafeView>
  );
};

export default CertificationSchoolScreen;
