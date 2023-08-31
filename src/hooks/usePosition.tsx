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

export default function usePosition() {
	const [position, setPosition] = useState(null)
	const [motion, setMotion] = useState(null)
	const [error, setError] = useState(null)
	const [ready, setReady] = useState(false)

	useEffect(function() {
		// @ts-ignore
		Geolocation.setRNConfiguration(config)
	}, [])

	function onPositionUpdate({coords:
		{latitude, longitude, accuracy,
			altitude, altitudeAccuracy,
			speed, heading}, timestamp}) {

		const motion = {speed, heading}
		const position = {latitude, longitude, accuracy,
			altitude, altitudeAccuracy, timestamp}

		// @ts-ignore
		setPosition(position)
		// @ts-ignore
		setMotion(motion)
		setReady(true)}

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
			function success(position) {
				onPositionUpdate(position)
				resolve(position)}
			function failure(error) {
				onUpdateError(error)
				reject(error)}
			Geolocation
				.getCurrentPosition(success,
					failure,
					getOptions)})}

	function watchPosition() {
		Geolocation
			.watchPosition(onPositionUpdate,
				onUpdateError,
				watchOptions)}

	// useEffect(() => {
	// 	Geolocation.requestForegroundPermissionsAsync()
	// 		.then(function({status}) {
	// 			if (status !== 'granted') {
	// 				setLocationError('Permission to access location was denied')
	// 				setLocationReady(true)
	// 				return}

	// 			Geolocation.getCurrentPositionAsync({accuracy: Geolocation.Accuracy.High})
	// 				.then(function(location) {
	// 					setLocation(location)
	// 					setLocationReady(true)
	// 				}).catch(function(error) {
	// 					setLocationError(error)
	// 					setLocationReady(true)})})
	// }, [setLocationReady,
	// 	setLocationError,
	// 	setLocation])

	return {position, motion,
		error, ready,
		getPosition,
		watchPosition}
}
