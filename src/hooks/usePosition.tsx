import {useState, useEffect} from 'react'
import Geolocation from '@react-native-community/geolocation'

const config = {skipPermissionRequests: false,
	enableBackgroundLocationUpdates: false,
	authorizationLevel: 'whenInUse',
	locationProvider: 'auto'}

const getOptions = {enableHighAccuracy: true,
	timeout: 10000,
	maximumAge: 10000}

const watchOptions = {enableHighAccuracy: true,
	interval: 2500,
	fastestInterval: 1000,
	distanceFilter: 25,
	timeout: 10000,
	maximumAge: 10000}

export default function usePosition({continuous=false}) {
	const [position, setPosition] = useState(null)
	const [motion, setMotion] = useState(null)
	const [error, setError] = useState(null)
	const [ready, setReady] = useState(false)

	useEffect(function() {
		// @ts-ignore
		Geolocation.setRNConfiguration(config)
	}, [])

	useEffect(function() {
		if (!continuous) return
		const id = Geolocation
			.watchPosition(onPositionUpdate,
				onUpdateError,
				watchOptions)
		return function() {
			Geolocation.clearWatch(id)}
	})

	function onPositionUpdate(data) {
		const {coords, timestamp} = data
		const motionData = {speed: coords.speed, heading: coords.heading}
		const positionData = {latitude: coords.latitude,
			longitude: coords.longitude,
			accuracy: coords.accuracy,
			altitude: coords.altitude,
			altitudeAccuracy: coords.altitudeAccuracy,
			timestamp: timestamp}

		// Set state
		// @ts-ignore
		setPosition(positionData)
		// @ts-ignore
		setMotion(motionData)
		setReady(true)

		// Return the processed data
		return positionData}

	function onUpdateError({code, message,
		PERMISSION_DENIED: denied,
		POSITION_UNAVAILABLE: unavailable,
		TIMEOUT: timeout}) {
		const codeMap = {denied,
			unavailable,
			timeout}
		const status = codeMap[code]
		// @ts-ignore
		setError({message, status, code})
		setReady(true)}

	function getPosition() {
		return new Promise(function(resolve, reject) {
			function success(positionData) {
				const resolvedData = onPositionUpdate(positionData)
				resolve(resolvedData)}
			function failure(error) {
				onUpdateError(error)
				reject(error)}
			Geolocation.getCurrentPosition(success, failure, getOptions)})}

	return {position, motion,
		error, ready,
		getPosition}
}
