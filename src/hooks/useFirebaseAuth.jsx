import {useState, useEffect} from 'react'
import auth from '@react-native-firebase/auth'


export default function useFirebaseAuth({firebaseReady}) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function onAuthStateChanged(newUser) {
    setUser(newUser)
    setReady(true)
    setLoading(false)}

  useEffect(function() {
    if (!firebaseReady) return undefined

    setLoading(true)
    return auth()
      .onAuthStateChanged(onAuthStateChanged)
  }, [firebaseReady])

  function signInWithEmailAndPassword(email, password) {
    if (!firebaseReady)
      return setError({message: 'Firebase not ready'})

    setLoading(true)
    return auth()
      .signInWithEmailAndPassword(email, password)
        .then(function(response) {
          setUser(response.user)
          setLoading(false)
          setReady(true)})
        .catch(function(error) {
          setError({message: 'Unsuccessful sign in', error})})
  }

  function signUpWithEmailAndPassword(email, password) {
    if (!firebaseReady)
      return setError({message: 'Firebase not ready'})

    const errorMap = {'auth/email-already-in-use': 'Email already in use',
      'auth/invalid-email': 'Email is invalid'}

    setLoading(true)
    return auth()
      .createUserWithEmailAndPassword(email, password)
        .then(function({user}) {
          setUser(user)
          setLoading(false)
          setReady(true)})
        .catch(function(error) {
          setLoading(false)
          setError({message: errorMap[error.code]
            || 'Unsuccessful sign up', error})})
  }

  // https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection#security_recommendations
  function verifyEmailExists(email) {
    if (!firebaseReady)
      return setError({message: 'Firebase not ready'})

    return new Promise(function(resolve, reject) {

      setLoading(true)
      auth()
      .fetchSignInMethodsForEmail(email)
        .then(function(signInMethods) {
          setUserSignInMethods(signInMethods)
          resolve(signInMethods.length > 0)})
        .catch(function(error) {
          setError({message: 'Unsuccessful sign in', error})
          reject()})})
  }

  return {auth, user, userReady: ready,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    verifyEmailExists,
    loading, error}
}
