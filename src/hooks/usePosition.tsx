import {useState, useEffect} from 'react'
import Geolocation from '@react-native-community/geolocation'

type UsePositionProps = {
  config?: Config
  getOptions?: GetOptions
  streamOptions?: StreamOptions
  streamPosition?: boolean}

type Config = {
  skipPermissionRequests: boolean
  enableBackgroundLocationUpdates: boolean
  authorizationLevel: 'whenInUse' | 'always' | 'auto'
  locationProvider: 'playServices' | 'android' | 'auto'}

type GetOptions = {
  enableHighAccuracy: boolean
  timeout: number
  maximumAge: number}

type StreamOptions = {
  enableHighAccuracy: boolean
  interval: number
  fastestInterval: number
  timeout: number
  maximumAge: number
  distanceFilter: number}

interface Position {
	latitude: number
	longitude: number
	accuracy: number
	altitude: number
	altitudeAccuracy: number
	timestamp: number}

interface Motion {
	speed: number
	heading: number}

type PositionError = {
	message: string
	status: string
	code: number}

const defaultCconfig: Config = {skipPermissionRequests: false,
	enableBackgroundLocationUpdates: false,
	authorizationLevel: 'whenInUse',
	locationProvider: 'auto'}

const defaultGettOptions = {enableHighAccuracy: true,
	timeout: 10000, maximumAge: 10000}

const defaultStreamOptions = {enableHighAccuracy: true,
	interval: 2500, fastestInterval: 1000,
	timeout: 10000, maximumAge: 10000,
	distanceFilter: 25}

export default function usePosition(
	{streamPosition=false,
		config: customConfig = defaultCconfig,
		getOptions: customGetOptions = defaultGettOptions,
		streamOptions: customStreamOptions = defaultStreamOptions}
      : UsePositionProps = {}) {

	const config = {...defaultCconfig,
		...customConfig}
	const getOptions = {...defaultGettOptions,
		...customGetOptions}
	const streamOptions = {...defaultStreamOptions,
		...customStreamOptions}

	const [position, setPosition] = useState<Position | null>(null)
	const [motion, setMotion] = useState<Motion | null>(null)
	const [error, setError] = useState<PositionError>()
	const [ready, setReady] = useState(false)

	useEffect(function() {
		Geolocation.setRNConfiguration(config)
	}, [])

	useEffect(function() {
		const id = setupPositionStream()

		function setupPositionStream() {
			if (!streamPosition) return false
			else return Geolocation
				.watchPosition(onPositionUpdate,
					onUpdateError, streamOptions)}

		function cleanUpPositionStream(id) {
			if (id) Geolocation.clearWatch(id)}

		return function() {cleanUpPositionStream(id)}
	}, [streamPosition, streamOptions])

	function onPositionUpdate(data): Position {
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

	function onUpdateError({code, message, ...rest}): PositionError {
		const errKeys = ['PERMISSION_DENIED', 'POSITION_UNAVAILABLE', 'TIMEOUT']

		const status = Object.keys(rest)
			.find(function(key) {
				const isErr = rest[key]
				return Boolean(Number(isErr))
          && errKeys.includes(key as string)})
      || 'UNKNOWN_ERROR'

		const nextError: PositionError
      = {status, message, code}

		if (nextError) {
			setError(nextError)
			setReady(true)
			return nextError}

		throw new Error('Error object is undefined')
	}

	function getPosition(): Promise<Position> {
		return new Promise(function(resolve, reject) {
			function success(positionData) {
				const resolvedData = onPositionUpdate(positionData)
				resolve(resolvedData)}

			function failure(error) {
				onUpdateError(error)
				reject(error)}

			Geolocation
				.getCurrentPosition(success,
					failure, getOptions)
		})
	}

	return {position, motion,
		error, ready,
		getPosition}
}
