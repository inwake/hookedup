import {useState, useEffect} from 'react'


export default function useFirebaseAuth({firebase, firebaseReady}) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function onAuthStateChanged(newUser) {
    setUser(newUser)
    setReady(true)
    setLoading(false)}

  useEffect(function() {
    let unsubscribe
    if (firebaseReady && firebase?.apps?.length) {
      setLoading(true)
      unsubscribe = firebase.auth()
        .onAuthStateChanged(onAuthStateChanged)}
    return unsubscribe
  }, [firebaseReady, firebase])

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
    return firebase.auth()
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

  return {user, userReady: ready,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    loading, error}
}
