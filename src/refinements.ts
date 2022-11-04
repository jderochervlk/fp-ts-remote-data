import { Empty, Failure, Loading, RemoteData, Success } from './model'

/**
 * Returns `true` if the RemoteData is an instance of `Loading`, `false` otherwise.
 *
 * @example
 * import * as RD from '@vlk/fp-ts-remote-data'
 *
 * RD.isPending(RD.success(1)) // false
 * RD.isPending(RD.failure(1)) // false
 * RD.isPending(RD.empty) // false
 * RD.isPending(RD.loading) // true
 *
 * @category guards
 * @since 1.0.0
 * @param t
 */
export const isLoading = <E, A>(t: RemoteData<E, A>): t is Loading =>
  t._tag === 'Loading'

/**
 * Returns `true` if the RemoteData is an instance of `Failure`, `false` otherwise.
 *
 * @example
 * import * as RD from '@vlk/fp-ts-remote-data'
 *
 * RD.isPending(RD.success(1)) // false
 * RD.isPending(RD.failure(1)) // true
 * RD.isPending(RD.empty) // false
 * RD.isPending(RD.loading) // false
 *
 * @category guards
 * @since 1.0.0
 * @param t
 */
export const isFailure = <E, A>(t: RemoteData<E, A>): t is Failure<E> =>
  t._tag === 'Failure'

/**
 * Returns `true` if the RemoteData is an instance of `Empty`, `false` otherwise.
 *
 * @example
 * import * as RD from '@vlk/fp-ts-remote-data'
 *
 * RD.isPending(RD.success(1)) // false
 * RD.isPending(RD.failure(1)) // false
 * RD.isPending(RD.empty) // true
 * RD.isPending(RD.loading) // false
 *
 * @category guards
 * @since 1.0.0
 * @param t
 */
export const isEmpty = <E, A>(t: RemoteData<E, A>): t is Empty =>
  t._tag === 'Empty'

/**
 * Returns `true` if the RemoteData is an instance of `Success`, `false` otherwise.
 *
 * @example
 * import * as RD from '@vlk/fp-ts-remote-data'
 *
 * RD.isPending(RD.success(1)) // true
 * RD.isPending(RD.failure(1)) // false
 * RD.isPending(RD.empty) // false
 * RD.isPending(RD.loading) // false
 *
 * @category guards
 * @since 1.0.0
 * @param t
 */
export const isSuccess = <E, A>(t: RemoteData<E, A>): t is Success<A> =>
  t._tag === 'Success'
