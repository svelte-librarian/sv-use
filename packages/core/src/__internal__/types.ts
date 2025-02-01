export type Getter<T> = () => T;
export type Setter<T> = (value: T) => void;
export type MaybeGetter<T> = T | Getter<T>;

export type Arrayable<T> = T | T[];

export type CleanupFunction = () => void;

export interface AutoCleanup {
	/**
	 * Whether to auto-cleanup the event listener or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
}
