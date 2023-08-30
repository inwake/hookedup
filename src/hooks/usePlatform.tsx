import {Platform, Dimensions} from 'react-native'

export default function usePlatform() {
  const {width=9, height=16} = Dimensions.get('window')
  const aspectRatio = width / height

  const android = Platform.OS === 'android'
  const ios = Platform.OS === 'ios'
  const web = Platform.OS === 'web'

  const mobile = android || ios
  const desktopWeb = web && aspectRatio && aspectRatio > 1
  const platformMap = {android, ios, web, desktopWeb}

  const platform = Object
    .keys(platformMap)
    .find(Boolean)

  return {platform,
    isAndroid: android,
    isIos: ios,
    isMobile: mobile,
    isWeb: web,
    isDesktopWeb: desktopWeb}
}
