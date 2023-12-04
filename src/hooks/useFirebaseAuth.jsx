import {useState, useEffect} from 'react'
import auth from '@react-native-firebase/auth'


export default function useFirebaseAuth({firebaseReady}) {
  const [additionalUserInfo, setAdditionalUserInfo] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userReady, setUserReady] = useState(false)

  function onAuthStateChanged(newUser) {
    setUser(newUser)
    setUserReady(true)
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
    return new Promise(function(resolve, reject) {
      auth().signInWithEmailAndPassword(email, password)
        .then(function({user, additionalUserInfo}) {
          setAdditionalUserInfo(additionalUserInfo)
          setUser(user)
          setLoading(false)
          setUserReady(true)
          resolve({user, additionalUserInfo})})
        .catch(function(error) {
          const signInError = {error,
            message: 'Unsuccessful sign in'}
          setError(signInError)
          reject(signInError)})})
  }

  function signUpWithEmailAndPassword(email, password) {
    if (!firebaseReady)
      return setError({message: 'Firebase not ready'})

    const errorMap = {'auth/email-already-in-use': 'Email already in use',
      'auth/invalid-email': 'Email is invalid'}

    setLoading(true)
    return new Promise(function(resolve, reject) {
      auth().createUserWithEmailAndPassword(email, password)
        .then(function({user, additionalUserInfo}) {
          setAdditionalUserInfo(additionalUserInfo)
          setUser(user)
          setLoading(false)
          setUserReady(true)
          resolve({user, additionalUserInfo})})
        .catch(function(error) {
          const signUpError = {message: errorMap[error.code]
            || 'Unsuccessful sign up', error}
          setLoading(false)
          setError(signUpError)
          reject(signUpError)})})
  }

  function signOut() {
    if (!firebaseReady)
      return setError({message: 'Firebase not ready'})
    if (!user)
      return setError({message: 'No user signed in'})

    setLoading(true)
    return new Promise(function(resolve, reject) {
      auth()
      .signOut()
        .then(function() {
          setUser(null)
          setAdditionalUserInfo(null)
          setLoading(false)
          setUserReady(false)
          resolve()})
        .catch(function(error) {
          const signOutError = {error,
            message: 'Unsuccessful sign out'}
          setError(signOutError)
          reject(signOutError)})})
  }

  // https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection#security_recommendations
  function findUserByEmail(email) {
    if (!firebaseReady)
      return setError({message: 'Firebase not ready'})

    return new Promise(function(resolve, reject) {
      setLoading(true)
      auth()
      .fetchSignInMethodsForEmail(email)
        .then(function(authProviders) {
          resolve(authProviders)})
        .catch(function(error) {
          setError({message: 'Unsuccessful sign in', error})
          reject(error)})})
  }

  return {auth, user,
    additionalUserInfo,
    loading, error, userReady,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    signOut, findUserByEmail}
}
