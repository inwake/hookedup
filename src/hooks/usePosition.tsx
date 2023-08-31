import {useState, useEffect} from 'react'
import Geolocation from '@react-native-community/geolocation'

interface PositionHookProps {
	streamPosition?: boolean
}

interface Position {
	latitude: number
	longitude: number
	accuracy: number
	altitude: number
	altitudeAccuracy: number
	timestamp: number
}

interface Motion {
	speed: number
	heading: number
}

interface PositionError {
	message: string
	status: string
	code: number
}

const config = {skipPermissionRequests: false,
	enableBackgroundLocationUpdates: false,
	authorizationLevel: 'whenInUse',
	locationProvider: 'auto'}

const getOptions = {enableHighAccuracy: true,
	timeout: 10000, maximumAge: 10000}

const watchOptions = {enableHighAccuracy: true,
	interval: 2500, fastestInterval: 1000,
	timeout: 10000, maximumAge: 10000,
	distanceFilter: 25}

export default function usePosition({streamPosition=false}: PositionHookProps) {
	const [position, setPosition] = useState<Position | null>(null)
	const [motion, setMotion] = useState<Motion | null>(null)
	const [error, setError] = useState<PositionError>()
	const [ready, setReady] = useState(false)

	useEffect(function() {
		(Geolocation as any)
			.setRNConfiguration(config)
	}, [])

	useEffect(function() {
		let id

		if (streamPosition) setupPositionStream()
		else if (!position) getPosition()

		function setupPositionStream() {
			if (streamPosition) {
				id = Geolocation
					.watchPosition(onPositionUpdate,
						onUpdateError,
						watchOptions)}}

		function cleanUpPositionStream() {
			Geolocation.clearWatch(id)}

		return cleanUpPositionStream
	}, [streamPosition])

	function onPositionUpdate(data: any): Position {
		const {coords, timestamp} = data
		const motionData = {speed: coords.speed,
			heading: coords.heading}
		const positionData =
			{latitude: coords.latitude,
				longitude: coords.longitude,
				accuracy: coords.accuracy,
				altitude: coords.altitude,
				altitudeAccuracy: coords
					.altitudeAccuracy,
				timestamp: timestamp}
		setPosition(positionData)
		setMotion(motionData)
		setReady(true)

		return positionData}

	function onUpdateError({code, message,
		PERMISSION_DENIED: denied,
		POSITION_UNAVAILABLE: unavailable,
		TIMEOUT: timeout}: any) {
		const codeMap = {denied,
			unavailable,
			timeout}
		const status = codeMap[code]
		setError({message, status, code})
		setReady(true)}

	function getPosition() {
		return new Promise(function(resolve, reject) {
			function success(positionData) {
				const resolvedData
					= onPositionUpdate(positionData)
				resolve(resolvedData)}
			function failure(error) {
				onUpdateError(error)
				reject(error)}
			Geolocation.getCurrentPosition(success, failure, getOptions)})}

	return {position, motion,
		error, ready,
		getPosition}
}
