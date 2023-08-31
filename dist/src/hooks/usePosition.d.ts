type UsePositionProps = {
    config?: Config;
    getOptions?: GetOptions;
    streamOptions?: StreamOptions;
    streamPosition?: boolean;
};
type Config = {
    skipPermissionRequests: boolean;
    enableBackgroundLocationUpdates: boolean;
    authorizationLevel: 'whenInUse' | 'always' | 'auto';
    locationProvider: 'playServices' | 'android' | 'auto';
};
type GetOptions = {
    enableHighAccuracy: boolean;
    timeout: number;
    maximumAge: number;
};
type StreamOptions = {
    enableHighAccuracy: boolean;
    interval: number;
    fastestInterval: number;
    timeout: number;
    maximumAge: number;
    distanceFilter: number;
};
interface Position {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    timestamp: number;
}
interface Motion {
    speed: number;
    heading: number;
}
interface PositionError {
    message: string;
    status: string;
    code: number;
}
export default function usePosition({ streamPosition, config: customConfig, getOptions: customGetOptions, streamOptions: customStreamOptions }?: UsePositionProps): {
    position: Position | null;
    motion: Motion | null;
    error: PositionError | undefined;
    ready: boolean;
    getPosition: () => Promise<unknown>;
};
export {};
