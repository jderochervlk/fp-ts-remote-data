/**
 * @internal
 * @since 1.0.0
 */


import { success } from './constructors'
import { RemoteData } from './model'
import { isEmpty, isFailure, isLoading, isSuccess } from './refinements'

/**
 * @category instance operations
 * @since 1.0.0
 * @param f
 */
export const map: <A, B>(
  f: (a: A) => B
) => <E>(fa: RemoteData<E, A>) => RemoteData<E, B> = (f) => (fa) =>
  isSuccess(fa) ? success(f(fa.success)) : fa

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category instance operations
 * @since 1.0.0
 * @param f
 */
export const chainW =
  <D, A, B>(f: (a: A) => RemoteData<D, B>) =>
  <E>(ma: RemoteData<E, A>): RemoteData<D | E, B> =>
    isSuccess(ma) ? f(ma.success) : ma

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category instance operations
 * @since 1.0.0
 * @param f
 */
export const chain: <E, A = E, B = A>(
  f: (a: A) => RemoteData<E, B>
) => (ma: RemoteData<E, A>) => RemoteData<E, B> = chainW

/**
 * @category instance operations
 * @since 1.0.0
 * @param b
 * @param f
 */
export const reduce: <A, B>(
    b: B,
    f: (a: B, b: A) => B
) => <E>(fa: RemoteData<E, A>) => B = (b, f) => (fa) =>
    isSuccess(fa) ? f(b, fa.success) : b;

/**
* @category instance operations
* @since 1.0.0
* @param b
* @param f
*/
export const reduceRight: <A, B>(
    b: B,
    f: (a: A, b: B) => B
) => <E>(fa: RemoteData<E, A>) => B = (b, f) => (fa) =>
    isSuccess(fa) ? f(fa.success, b) : b;

/**
* @category instance operations
* @since 1.0.0
*/
export const foldW = <E, A, U, T, V, Z>(
    loading: () => U,
    failure: (e: E) => T,
    empty: () => V,
    success: (a: A) => Z
) => (rd: RemoteData<E, A>) => {
    return isLoading(rd)
        ? loading()
        : isFailure(rd)
            ? failure(rd.failure)
            : isEmpty(rd)
                ? empty()
                : success(rd.success)
}

/**
* @category instance operations
* @since 1.0.0
*/
export const fold = <E, A, B>( 
    loading: () => B,
    failure: (e: E) => B,
    empty: () => B,
    success: (a: A) => B
) => (rd: RemoteData<E, A>) => {
    return foldW<E, A, B, B, B, B>(loading, failure, empty, success)(rd)
}