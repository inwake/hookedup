export default function usePosition({ continuous }: {
    continuous?: boolean | undefined;
}): {
    position: null;
    motion: null;
    error: null;
    ready: boolean;
    getPosition: () => Promise<unknown>;
};
