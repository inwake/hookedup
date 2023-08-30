import {useState, useEffect} from 'react'
import * as Location from 'react-native'

export default function useGPS() {
  const [location, setLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const [locationReady, setLocationReady] = useState(false)

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(function({status}) {
        if (status !== 'granted') {
          setLocationError('Permission to access location was denied')
          setLocationReady(true)
          return}

        Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
          .then(function(location) {
            setLocation(location)
            setLocationReady(true)
          }).catch(function(error) {
            setLocationError(error)
            setLocationReady(true)})})
  }, [setLocationReady,
    setLocationError,
    setLocation])

  return {location,
    locationError,
    locationReady}
}
