import {useRef, useEffect} from 'react'

export default function usePrevious(value) {
  const ref = useRef(null)
  useEffect(function() {
    ref.current = value})
  return ref.current
}
