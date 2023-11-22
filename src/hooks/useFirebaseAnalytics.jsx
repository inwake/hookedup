import {useState, useEffect} from 'react'


export default function useFirebaseAnalytics({enabled=false,
  firebase,
  firebaseReady,
  routerLocation,
  pathToPageName}) {
  const [analyticsReady, setAnalyticsReady] = useState(false)
  const [error, setError] = useState(null)

  useEffect(function() {
    if (!firebaseReady) return undefined

    firebase.analytics()
      .setAnalyticsCollectionEnabled(Boolean(enabled))
        .then(function() {
          setAnalyticsReady(true)})
        .catch(function(error) {
          if (enabled) setError({message: 'Failed to enable analytics', error})
          else setError({message: 'Failed to disable analytics', error})})
  }, [enabled, firebase, firebaseReady])

  useEffect(function() {
    const path = routerLocation?.pathname
    if (![enabled, firebaseReady, analyticsReady, path]
      .every(Boolean)) return

    let pageName = path
    if (pathToPageName) pageName = pathToPageName(path)

    analyticsPageView(pageName, path)
  }, [enabled, analyticsReady, routerLocation, pathToPageName])

  function analyticsPageView(pageName, path) {
    if (!enabled)
      return setError({message: 'Analytics disabled'})
    if (!analyticsReady)
      return setError({message: 'Analytics not initialized'})
    firebase.analytics()
      .logScreenView({screen_name: pageName,
        screen_class: path})
  }

  function analyticsEvent(name, value) {
    if (!enabled)
      return setError({message: 'Analytics disabled'})
    if (!analyticsReady)
      return setError({message: 'Analytics not initialized'})
    if (![name, value].every(Boolean))
      return setError({message: 'Event name and value required'})

    firebase.analytics()
      .logEvent(name, value)
  }

  return {analyticsPageView,
    analyticsEvent,
    error}
}
