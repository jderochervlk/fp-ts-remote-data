/**
 * @internal
 * @since 1.0.0
 */

import { Empty, Failure, Loading, RemoteData, Success } from './model'

/**
 * Returns `true` if the RemoteData is an instance of `Loading`, `false` otherwise.
 *
 * @example
 * import * as RD from '@jvlk/fp-ts-remote-data'
 *
 * RD.isLoading(RD.success(1)) // false
 * RD.isLoading(RD.failure(1)) // false
 * RD.isLoading(RD.empty) // false
 * RD.isLoading(RD.loading) // true
 *
 * @category guards
 * @since 1.0.0
 */
export const isLoading = <E, A>(t: RemoteData<E, A>): t is Loading =>
  t._tag === 'Loading'

/**
 * Returns `true` if the RemoteData is an instance of `Failure`, `false` otherwise.
 *
 * @example
 * import * as RD from '@jvlk/fp-ts-remote-data'
 *
 * RD.isFailure(RD.success(1)) // false
 * RD.isFailure(RD.failure(1)) // true
 * RD.isFailure(RD.empty) // false
 * RD.isFailure(RD.loading) // false
 *
 * @category guards
 * @since 1.0.0
 */
export const isFailure = <E, A>(t: RemoteData<E, A>): t is Failure<E> =>
  t._tag === 'Failure'

/**
 * Returns `true` if the RemoteData is an instance of `Empty`, `false` otherwise.
 *
 * @example
 * import * as RD from '@jvlk/fp-ts-remote-data'
 *
 * RD.isEmpty(RD.success(1)) // false
 * RD.isEmpty(RD.failure(1)) // false
 * RD.isEmpty(RD.empty) // true
 * RD.isEmpty(RD.loading) // false
 *
 * @category guards
 * @since 1.0.0
 */
export const isEmpty = <E, A>(t: RemoteData<E, A>): t is Empty =>
  t._tag === 'Empty'

/**
 * Returns `true` if the RemoteData is an instance of `Success`, `false` otherwise.
 *
 * @example
 * import * as RD from '@jvlk/fp-ts-remote-data'
 *
 * RD.isSuccess(RD.success(1)) // true
 * RD.isSuccess(RD.failure(1)) // false
 * RD.isSuccess(RD.empty) // false
 * RD.isSuccess(RD.loading) // false
 *
 * @category guards
 * @since 1.0.0
 */
export const isSuccess = <E, A>(t: RemoteData<E, A>): t is Success<A> =>
  t._tag === 'Success'
