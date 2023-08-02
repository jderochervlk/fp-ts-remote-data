/**
 * @since 1.0.0
 */

import { success } from './constructors'
import { RemoteData } from './model'
import { isEmpty, isFailure, isLoading, isSuccess } from './refinements'

/**
 * @example
 * import * as D from '@jvlk/fp-ts-remote-data'
 * import { pipe } from 'fp-ts/function'
 *
 * pipe(
 *  D.success(42),
 *  D.map(n => n + 10) // => success(52)
 * )
 *
 * pipe(
 *  D.empty,
 *  D.map(n => n + 10) // => empty
 * )
 *
 * @category instance operations
 * @since 1.0.0
 */
export const map: <A, B>(
  f: (a: A) => B
) => <E>(fa: RemoteData<E, A>) => RemoteData<E, B> = (f) => (fa) =>
  isSuccess(fa) ? success(f(fa.success)) : fa

/**
 * Less strict version of [`chain`](#chain) that allows you to **W**iden the failure type.
 *
 * @example
 * import * as D from '@jvlk/fp-ts-remote-data'
 * import { pipe } from 'fp-ts/function'
 *
 * pipe(
 *  D.failure<string, string>('error'), // RemoteData<string, string>
 *  D.chainW(() => D.failure(Error('number is too small'))) // => RemoteData<Error | string, string>
 * )
 *
 * @category instance operations
 * @since 1.0.0
 */
export const chainW =
  <D, A, B>(f: (a: A) => RemoteData<D, B>) =>
  <E>(ma: RemoteData<E, A>): RemoteData<D | E, B> =>
    isSuccess(ma) ? f(ma.success) : ma

/**
 * @example
 * import * as D from '@jvlk/fp-ts-remote-data'
 * import { pipe } from 'fp-ts/function'
 *
 * pipe(
 *  D.success(42),
 *  D.chain(n => n > 10 ? D.success(n) : D.failure(Error('number is too small')))
 * )
 *
 * @category instance operations
 * @since 1.0.0
 */
export const chain: <E, A = E, B = A>(
  f: (a: A) => RemoteData<E, B>
) => (ma: RemoteData<E, A>) => RemoteData<E, B> = chainW

/**
 * @category instance operations
 * @since 1.0.0
 */
export const reduce: <A, B>(
  b: B,
  f: (a: B, b: A) => B
) => <E>(fa: RemoteData<E, A>) => B = (b, f) => (fa) =>
  isSuccess(fa) ? f(b, fa.success) : b

/**
 * @category instance operations
 * @since 1.0.0
 */
export const reduceRight: <A, B>(
  b: B,
  f: (a: A, b: B) => B
) => <E>(fa: RemoteData<E, A>) => B = (b, f) => (fa) =>
  isSuccess(fa) ? f(fa.success, b) : b

/**
 * Fold and return different types in the response.
 *
 * @example
 * import * as D from '@jvlk/fp-ts-remote-data'
 * import { pipe } from 'fp-ts/function'
 *
 * const resultOne = pipe(
 *      D.success(42),
 *      D.foldW(
 *          () => "loading",
 *          e => Error(e),
 *          () => null,
 *          t => [t]
 *      )
 * )
 *
 * @category instance operations
 * @since 1.0.0
 */
export const foldW =
  <E, A, U, T, V, Z>(
    loading: () => U,
    failure: (e: E) => T,
    empty: () => V,
    success: (a: A) => Z
  ) =>
  (d: RemoteData<E, A>) => {
    return isLoading(d)
      ? loading()
      : isFailure(d)
      ? failure(d.failure)
      : isEmpty(d)
      ? empty()
      : success(d.success)
  }

/**
 * Fold and return the same type in the response.
 *
 * @example
 * import * as D from '@jvlk/fp-ts-remote-data'
 * import { pipe } from 'fp-ts/function'
 *
 * const resultOne = pipe(
 *      D.success(42),
 *      D.fold(
 *          () => "loading",
 *          e => `${e}`,
 *          () => "empty",
 *          t => `value is ${t}`
 *      )
 * )
 *
 * @category instance operations
 * @since 1.0.0
 */
export const fold =
  <E, A, B>(
    loading: () => B,
    failure: (e: E) => B,
    empty: () => B,
    success: (a: A) => B
  ) => {
    return foldW<E, A, B, B, B, B>(loading, failure, empty, success)
  }
