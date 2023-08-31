export default function usePosition(): {
    position: null;
    motion: null;
    error: null;
    ready: boolean;
    getPosition: () => Promise<unknown>;
    watchPosition: () => void;
};
