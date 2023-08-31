import {useState, useEffect} from 'react'
import {Dimensions} from 'react-native'

const screens = [{size: 'sm', width: 480},
	{size: 'md', width: 720},
	{size: 'lg', width: 1080},
	{size: 'xl', width: 1440}]

export default function useCurrentScreen() {
	const [currentScreen, setCurrentScreen] = useState('md')
	const dimensions = Dimensions.get('window')

	useEffect(() => {
		setCurrentScreen(screens
			.find(function(screen) {
				dimensions.width > screen.width
			})?.size || 'xs')
	}, [dimensions.width])

	return currentScreen
}
