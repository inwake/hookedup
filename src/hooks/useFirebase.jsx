import firebase from '@react-native-firebase/app'
import analytics from '@react-native-firebase/analytics'
import {useEffect, useState} from 'react'

function useFirebase({useAnalytics = false}) {
  const [ready, setReady] = useState(false)

  useEffect(function() {
    if (useAnalytics) {
      firebase.analytics()
        .setAnalyticsCollectionEnabled(true)

      analytics().pageView = pageView
      analytics().event = analytics().logEvent

      function pageView(pageName, path) {
        analytics()
          .logScreenView({screen_name: pageName,
            screen_class: path})}

      setReady(true)
    } else {
      firebase.analytics()
        .setAnalyticsCollectionEnabled(false)
      setReady(true)}
  }, [])


  return {firebase, analytics, ready}
}
