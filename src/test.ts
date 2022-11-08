/**
 * @internal
 * @since 1.0.0
 */

import * as RD from '.'
import { pipe } from 'fp-ts/function'

test('loading', () => {
  expect(RD.isLoading(RD.loading)).toBeTruthy()
})

test('failure', () => {
  expect(RD.isFailure(RD.failure(Error('Oh no')))).toBeTruthy()
})

test('empty', () => {
  expect(RD.isEmpty(RD.empty)).toBeTruthy()
})

test('success', () => {
  expect(RD.success(RD.success(42))).toBeTruthy()
})

test('map', () => {
  expect(
    pipe(
      RD.success(10),
      RD.map((n) => n + 1),
      RD.map((n) => `${n}`),
      RD.map((str) => str.toLowerCase())
    )
  ).toEqual({ _tag: 'Success', success: '11' })

  expect(
    pipe(
      RD.empty,
      RD.map((n) => n + 1)
    )
  ).toEqual({ _tag: 'Empty' })

  expect(
    pipe(
      RD.failure('oh no'),
      RD.map((n) => n + 1)
    )
  ).toEqual({ _tag: 'Failure', failure: 'oh no' })

  expect(
    pipe(
      RD.loading,
      RD.map((n) => n + 1)
    )
  ).toEqual({ _tag: 'Loading' })
})

test('chain', () => {
  expect(
    pipe(
      RD.success(10),
      RD.chain((_n) => RD.loading)
    )
  ).toEqual({ _tag: 'Loading' })

  expect(
    pipe(
      RD.success(10),
      RD.chain((_n) => RD.empty)
    )
  ).toEqual({ _tag: 'Empty' })

  expect(
    pipe(
      RD.loading,
      RD.chain((n) => RD.empty)
    )
  ).toEqual({ _tag: 'Loading' })

  expect(
    pipe(
      RD.empty,
      RD.chain((n) => RD.loading)
    )
  ).toEqual({ _tag: 'Empty' })

  expect(
    pipe(
      RD.failure('oh no'),
      RD.chain<string>((_n) => RD.loading)
    )
  ).toEqual({ _tag: 'Failure', failure: 'oh no' })

  expect(
    pipe(
      RD.failure('oh no'),
      RD.chainW((_n) => RD.loading)
    )
  ).toEqual({ _tag: 'Failure', failure: 'oh no' })
})

test('reduce', () => {
  expect(
    pipe(
      RD.success(42),
      RD.reduce(10, (acc, item) => acc + item)
    )
  ).toEqual(52)

  expect(
    pipe(
      RD.empty,
      RD.reduce(10, (acc, item) => acc + item)
    )
  ).toEqual(10)

  expect(
    pipe(
      RD.success('foo'),
      RD.reduce('bar', (a, b) => a + b)
    )
  ).toEqual('barfoo')
})

test('reduceRight', () => {
  expect(
    pipe(
      RD.success('foo'),
      RD.reduceRight('bar', (a, b) => a + b)
    )
  ).toEqual('foobar')

  expect(
    pipe(
      RD.empty,
      RD.reduceRight('bar', (a, b) => a + b)
    )
  ).toEqual('bar')
})

test('fold', () => {
  expect(
    pipe(
      RD.loading,
      RD.fold(
        () => 'loading',
        () => 'error',
        () => 'empty',
        () => 'success'
      )
    )
  ).toEqual('loading')

  expect(
    pipe(
      RD.failure(42),
      RD.fold(
        () => 'loading',
        () => 'error',
        () => 'empty',
        () => 'success'
      )
    )
  ).toEqual('error')

  expect(
    pipe(
      RD.empty,
      RD.fold(
        () => 'loading',
        () => 'error',
        () => 'empty',
        () => 'success'
      )
    )
  ).toEqual('empty')

  expect(
    pipe(
      RD.success(42),
      RD.fold(
        () => 'loading',
        () => 'error',
        () => 'empty',
        () => 'success'
      )
    )
  ).toEqual('success')
})

test('foldW can return different types', () => {
  expect(
    pipe(
      RD.loading,
      RD.foldW(
        () => 10,
        console.log,
        () => 'empty',
        () => ['success']
      )
    )
  ).toEqual(10)
})

test('of', () => {
  expect(RD.of({ loading: true })).toEqual(RD.loading)
  expect(RD.of({ loading: true, failure: 'no' })).toEqual(RD.loading)
  expect(RD.of({ loading: true, value: 'no' })).toEqual(RD.loading)
  expect(RD.of({ loading: true, value: 'testing', failure: 'no' })).toEqual(
    RD.loading
  )
  expect(RD.of({ loading: true, value: undefined, failure: 'no' })).toEqual(
    RD.loading
  )

  expect(RD.of({ failure: 'oh no', loading: false })).toEqual(
    RD.failure('oh no')
  )
  expect(RD.of({ loading: false, failure: 'oh no' })).toEqual(
    RD.failure('oh no')
  )
  expect(RD.of({ failure: 'oh no', value: 'oh no', loading: false })).toEqual(
    RD.failure('oh no')
  )
  expect(RD.of({ loading: false, value: 'testing', failure: 'oh no' })).toEqual(
    RD.failure('oh no')
  )
  expect(RD.of({ loading: false, value: undefined, failure: 'oh no' })).toEqual(
    RD.failure('oh no')
  )

  expect(RD.of({ loading: false, value: undefined })).toEqual(RD.empty)

  expect(RD.of({ loading: false, value: 42 })).toEqual(RD.success(42))
})
