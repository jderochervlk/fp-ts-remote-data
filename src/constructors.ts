/**
 * Functions to create a new RemoteData.
 *
 * @since 1.0.0
 */
import type { RemoteData } from './model'

/**
 * Constructs a new `RemoteData` with a loading state.
 *
 * @example
 * import * as RD from '@jvlk/fp-ts-remote-data'
 *
 * const loadingValue = RD.loading
 *
 * @category constructors
 * @since 1.0.0
 */
export const loading: RemoteData<never, never> = { _tag: 'Loading' }

/**
 * Constructs a new `RemoteData` holding a `Success` value.
 *
 * @example
 * import * as RD from '@jvlk/fp-ts-remote-data'
 *
 * const successValue = RD.success(42)
 *
 * @category constructors
 * @since 1.0.0
 */
export const success = <E = never, A = never>(a: A): RemoteData<E, A> => ({
  _tag: 'Success',
  success: a,
})

/**
 * Constructs a new `RemoteData` holding an `Failure` value.
 *
 * @example
 * import * as RD from '@jvlk/fp-ts-remote-data'
 *
 * const failure = RD.failure(42)
 *
 * @category constructors
 * @since 1.0.0
 */
export const failure = <E = never, A = never>(e: E): RemoteData<E, A> => ({
  _tag: 'Failure',
  failure: e,
})

/**
 * Constructs a new `RemoteData` with an empty state.
 *
 * @example
 * import * as RD from '@jvlk/fp-ts-remote-data'
 *
 * const emptyValue = RD.empty
 *
 * @category constructors
 * @since 1.0.0
 */
export const empty: RemoteData<never, never> = { _tag: 'Empty' }

type remoteDataOf<E, A> = {
  loading: boolean
  failure?: E
  value?: A | null | undefined
}

/**
 * Constructs a new `RemoteData` from an object
 *
 * @category constructors
 * @since 1.0.0
 *
 * @example
 * import * as RD from '@jvlk/fp-ts-remote-data'
 *
 * const one = RD.of({ loading: true }) // => loading
 * const two = RD.of({ loading: false, failure: Error("oh no") }) // => failure
 * const three = RD.of({ loading: false, value: undefined }) // => empty
 * const four = RD.of({ loading: false, value: 42 }) // => success
 */
export const of = <E, A>(obj: remoteDataOf<E, A>): RemoteData<E, A> => {
  return obj.loading
    ? loading
    : obj.failure
    ? failure(obj.failure)
    : obj.value
    ? success(obj.value)
    : empty
}
