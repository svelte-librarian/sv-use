export type Getter<T> = () => T;
export type Setter<T> = (value: T) => void;

export type CleanupFunction = () => void;
