export type Getter<T> = () => T;
export type Setter<T> = (value: T) => void;
export type MaybeGetter<T> = T | Getter<T>;

export type Arrayable<T> = T | T[];

export type CleanupFunction = () => void;
