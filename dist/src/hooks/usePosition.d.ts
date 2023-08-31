interface PositionHookProps {
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
export default function usePosition({ streamPosition }: PositionHookProps): {
    position: Position | null;
    motion: Motion | null;
    error: PositionError | undefined;
    ready: boolean;
    getPosition: () => Promise<unknown>;
};
export {};
