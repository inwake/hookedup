import {useState, useEffect} from 'react'
// import {initFirebase, analytics} from '../../lib/firebase'

export default function useFirebaseAnalytics({analytics,
    routerLocation,
    pathToPageName}) {
  const [error, setError] = useState(false)
  const [analyticsReady, setAnalyticsReady] = useState(false)

  useEffect(function() {
    analytics().then(function(analytics) {
      setAnalyticsReady(true)
      console.log('analytics', analytics)})
  }, [])

  // useEffect(function() {
  //   initFirebase({useAnalytics: true})
  //     .then(function({firebase, analytics}) {
  //       setAnalyticsReady(true)})
  // }, [])

  useEffect(function() {
    const path = routerLocation?.pathname
    if (![analytics, analyticsReady, path].every(Boolean)) return;

    let pageName = path
    if (pathToPageName) pageName = pathToPageName(path)

    analyticsPageView(pageName, path)
  }, [analytics, analyticsReady, routerLocation])

  function analyticsPageView(pageName, path) {
    if (!analytics) return
      setError('Analytics not initialized')
    analytics().pageView(pageName, path)
  }

  function analyticsEvent(name, value) {
    if (!analytics) return
      setError('Analytics not initialized')
    if (![name, value].every(Boolean)) return
      setError('Event name and value required')
    analytics().event(name, value)
  }

  return {analyticsPageView,
    analyticsEvent,
    error}
}
