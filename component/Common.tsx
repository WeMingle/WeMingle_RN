import {Dimensions, PermissionsAndroid} from 'react-native';
import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {
  getProfile as getKakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';

import {responsiveFontSize} from 'react-native-responsive-dimensions';

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
      // return dispatch(
      //   showAlertModal({
      //     alertMsg: '미디어 저장소에 접근이 불가능한 기기입니다',
      //   }),
      // );
    } else if (
      permission == RESULTS.BLOCKED ||
      permission == RESULTS.DENIED ||
      permission == false
    ) {
      // return dispatch(
      //   showConfirmModal({
      //     confirmMsg: `기기 옵션에서 미디어 저장소에 대한 접근 권한을 설정해주세요.\n\n※ 설정 > 애플리케이션 > 집판다 > 권한 > 파일 및 미디어 > 미디어 액세스만 허용 상태로 변경`,
      //     confirmOKTitle: '설정',
      //     confirmOKCallback: () => {
      //       openSettings().catch(error => {
      //         return;
      //       });
      //     },
      //     confirmCancelTitle: '닫기',
      //   }),
      // );
    } else if (permission != RESULTS.GRANTED) {
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).catch(error => {
        return;
      });
    }
  }
};

export const hasAndroidPermission = async () => {
  const getCheckPermissionPromise = async () => {
    if (Number(Platform.Version) >= 33) {
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
    if (Number(Platform.Version) >= 33) {
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

export const handleSnsLogin = async (
  signupPlatform: string,
  callback: (result: any) => void,
) => {
  if (signupPlatform == 'KAKAO') {
    await login()
      .then(result => {
        getKakaoProfile(result.accessToken).then(result => {
          callback(result);
        });
      })
      .catch(err => {});
  } else if (signupPlatform == 'NAVER') {
    const {failureResponse, successResponse} = await NaverLogin.login();
    console.log(successResponse);
    console.log(failureResponse);
  } else if (signupPlatform == 'google') {
  }
};

export const FontSizeCalculator = (size: number) => {
  const returnFontSize =
    Dimensions.get('window').width > 500
      ? responsiveFontSize(size * 0.1)
      : responsiveFontSize(size * 0.128);
  return returnFontSize;
};

//지도 전체 영역에 대한 bound를 획득합니다.
export const getMapBounds = (
  center: {latitude: number; longitude: number}, //구하고자 하는 지도 영역의 센터값입니다.
  zoomlevel: number, //현재 지도의 줌 레벨입니다.
  mapWidth: number, //지도의 길이값입니다. 픽셀단위입니다.
  mapHeight: number, //지도의 높이값입니다. 픽셀단위입니다.
) => {
  // 네이버 지도 기본 줌레벨은 16입니다.
  // zoom level이 16일때 1px : 1m로 가정합니다.
  // 참조: https://d2.naver.com/helloworld/1174
  // 참조: https://www.ncloud.com/support/notice/all/738
  const metersPerPixel = Math.pow(2, 16 - zoomlevel);
  // 1m 당 위도 변화 : 1 / ((2*pi*지구반지름(m)) / 360(degree))
  const deltaLatPerMeter = 0.00000899321;
  // 1m 당 경도 변화 : 1 / cos(위도)((2*pi*지구반지름(m)) / 360(degree))
  const deltaLngPerMeter =
    deltaLatPerMeter / Math.cos((center.latitude * Math.PI) / 180);
  //맵 중앙으로부터 상하 bound 까지의 거리입니다.
  // (맵 높이 / 2)(pixels) * (meteres/pixel) * (deltaLat / meter) = 상하 위도 차이.
  const deltaLat = (mapHeight / 2) * metersPerPixel * deltaLatPerMeter;
  //맵 중앙으로부터 좌우 bound 까지의 거리입니다.
  // (맵 길이 / 2)(pixels) * (meteres/pixel) * (deltaLat / meter) = 좌우 경도 차이.
  const deltaLng = (mapWidth / 2) * metersPerPixel * deltaLngPerMeter;
  let points = [
    //NorthEast
    {
      lat: center.latitude + deltaLat,
      lng: center.longitude + deltaLng,
    },
    //SouthWest
    {
      lat: center.latitude - deltaLat,
      lng: center.longitude - deltaLng,
    },
  ];
  return points;
};
