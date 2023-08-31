interface UsePositionProps {
    config?: typeof config;
    getOptions?: typeof getOptions;
    streamOptions?: typeof streamOptions;
    streamPosition?: boolean;
}
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
declare const config: {
    skipPermissionRequests: boolean;
    enableBackgroundLocationUpdates: boolean;
    authorizationLevel: string;
    locationProvider: string;
};
declare const getOptions: {
    enableHighAccuracy: boolean;
    timeout: number;
    maximumAge: number;
};
declare const streamOptions: {
    enableHighAccuracy: boolean;
    interval: number;
    fastestInterval: number;
    timeout: number;
    maximumAge: number;
    distanceFilter: number;
};
export default function usePosition(props?: UsePositionProps): {
    position: Position | null;
    motion: Motion | null;
    error: PositionError | undefined;
    ready: boolean;
    getPosition: () => Promise<unknown>;
};
export {};
