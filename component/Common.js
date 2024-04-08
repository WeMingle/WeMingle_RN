import { Dimensions, PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { getProfile as getKakaoProfile, login, } from '@react-native-seoul/kakao-login';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export const getImageLibraryPermission = async () => {
  if (Platform.OS == 'android') {
    let permission;
    if (Platform.Version >= 33) {
      permission = await hasAndroidPermission();
    } else {
      permission = await check(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ).catch(error => {
        return;
      });
    }

    if (permission == RESULTS.UNAVAILABLE) {
      return dispatch(
        showAlertModal({
          alertMsg: '미디어 저장소에 접근이 불가능한 기기입니다',
        }),
      );
    } else if (
      permission == RESULTS.BLOCKED ||
      permission == RESULTS.DENIED ||
      permission == false
    ) {
      return dispatch(
        showConfirmModal({
          confirmMsg: `기기 옵션에서 미디어 저장소에 대한 접근 권한을 설정해주세요.\n\n※ 설정 > 애플리케이션 > 집판다 > 권한 > 파일 및 미디어 > 미디어 액세스만 허용 상태로 변경`,
          confirmOKTitle: '설정',
          confirmOKCallback: () => {
            openSettings().catch(error => {
              return;
            });
          },
          confirmCancelTitle: '닫기',
        }),
      );
    } else if (permission != RESULTS.GRANTED) {
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).catch(error => {
        return;
      });
    }
  }
};

export const hasAndroidPermission = async () => {
  const getCheckPermissionPromise = async () => {
    if (Platform.Version >= 33) {
      const [hasReadMediaImagesPermission, hasReadMediaVideoPermission] =
        await Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]);
      return hasReadMediaImagesPermission && hasReadMediaVideoPermission;
    }
  };

  const getRequestPermissionPromise = async () => {
    if (Platform.Version >= 33) {
      const statuses = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ]);
      return (
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
        PermissionsAndroid.RESULTS.GRANTED
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  return await getRequestPermissionPromise();
};

export const handleSnsLogin = async (signupPlatform, callback) => {
  if (signupPlatform == 'KAKAO') {
    await login()
      .then((result) => {
        getKakaoProfile(result.accessToken)
          .then((result) => {
            callback(result)
          })
      })
      .catch((err) => {
      })
  } else if (signupPlatform == 'naver') {

  } else if (signupPlatform == 'google') {

  }
}

export const FontSizeCalculator = (size) => {
  const returnFontSize =
    Dimensions.get('window').width > 500
      ? responsiveFontSize(size * 0.1)
      : responsiveFontSize(size * 0.128);
  return returnFontSize;
};
