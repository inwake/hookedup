import {useState, useEffect, useRef} from 'react'
import {AppState} from 'react-native'

export default function useAppVisibility() {
  const appState = useRef(AppState.currentState)
  const activeState = appState.current
  const [foreground, setForeground] = useState(false)
  const [background, setBackground] = useState(false)
  const isActive = activeState === 'active'

  useEffect(function() {
    setBackground(false)
    setForeground(true)
  }, [])

  useEffect(function() {
    const subscription = AppState
      .addEventListener('change', onChange)

    function onChange(nextAppState) {
      appState.current = nextAppState

      const nextActive = nextAppState === 'active'
      const nextInactive = nextAppState === 'inactive'
      setForeground(nextActive)
      setBackground(nextInactive)}
    return function() {
      subscription?.remove()}
  })

  return {activeState,
    isActive,
    foreground,
    background}
}
