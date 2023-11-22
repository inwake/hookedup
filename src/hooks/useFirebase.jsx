import firebase from '@react-native-firebase/app'
import {useEffect, useState} from 'react'
import env from 'react-native-config'


const config = {apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID}

export default function useFirebase() {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (firebase.apps.length) {
      setReady(true)
      return}

    firebase.initializeApp(config)
      .then(function() {
        setReady(true)})
      .catch(function(error) {
        setError(error)})
  }, [])

  return {firebase,
    firebaseReady: ready,
    error}
}
