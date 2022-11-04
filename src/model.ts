/**
 * @category model
 * @since 1.0.0
 */
export interface Loading {
  readonly _tag: 'Loading'
}

/**
 * @category model
 * @since 1.0.0
 */
export interface Failure<E> {
  readonly _tag: 'Failure'
  readonly failure: E
}

/**
 * @category model
 * @since 1.0.0
 */
export interface Empty {
  readonly _tag: 'Empty'
}

/**
 * @category model
 * @since 1.0.0
 */
export interface Success<A> {
  readonly _tag: 'Success'
  readonly success: A
}

/**
 * @category model
 * @since 1.0.0
 */
export type RemoteData<E, A> = Loading | Failure<E> | Success<A> | Empty
