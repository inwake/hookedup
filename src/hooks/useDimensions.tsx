import {useState, useEffect} from 'react'
import {Dimensions} from 'react-native'
import {useSafeAreaFrame} from 'react-native-safe-area-context'

export default function useDimensions({isWeb, isDesktopWeb}) {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'))
  const safeAreaFrame = useSafeAreaFrame()

  useEffect(() => {
    updateDimensionsForPlatform()
    const subscription = Dimensions
      .addEventListener('change', updateDimensionsForPlatform)

    function updateDimensionsForPlatform() {
      const windowDimensions = Dimensions.get('window')
      const {width, height} = isWeb || isDesktopWeb ?
        windowDimensions : safeAreaFrame
      const {scale, fontScale} = windowDimensions
      setDimensions({width, height, scale, fontScale})}

    return function() {subscription?.remove()}
  }, [isWeb, isDesktopWeb, safeAreaFrame])

  return dimensions
}
