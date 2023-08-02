---
title: instances.ts
nav_order: 2
parent: Modules
---

## instances overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instance operations](#instance-operations)
  - [chain](#chain)
  - [chainW](#chainw)
  - [fold](#fold)
  - [foldW](#foldw)
  - [map](#map)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)

---

# instance operations

## chain

**Signature**

```ts
export declare const chain: <E, A = E, B = A>(
  f: (a: A) => RemoteData<E, B>
) => (ma: RemoteData<E, A>) => RemoteData<E, B>
```

**Example**

```ts
import * as D from '@jvlk/fp-ts-remote-data'
import { pipe } from 'fp-ts/function'

pipe(
  D.success(42),
  D.chain((n) => (n > 10 ? D.success(n) : D.failure(Error('number is too small'))))
)
```

Added in v1.0.0

## chainW

Less strict version of [`chain`](#chain) that allows you to **W**iden the failure type.

**Signature**

```ts
export declare const chainW: <D, A, B>(
  f: (a: A) => RemoteData<D, B>
) => <E>(ma: RemoteData<E, A>) => RemoteData<D | E, B>
```

**Example**

```ts
import * as D from '@jvlk/fp-ts-remote-data'
import { pipe } from 'fp-ts/function'

pipe(
  D.failure<string, string>('error'), // RemoteData<string, string>
  D.chainW(() => D.failure(Error('number is too small'))) // => RemoteData<Error | string, string>
)
```

Added in v1.0.0

## fold

Fold and return the same type in the response.

**Signature**

```ts
export declare const fold: <E, A, B>(
  loading: () => B,
  failure: (e: E) => B,
  empty: () => B,
  success: (a: A) => B
) => (d: RemoteData<E, A>) => B
```

**Example**

```ts
import * as D from '@jvlk/fp-ts-remote-data'
import { pipe } from 'fp-ts/function'

const resultOne = pipe(
  D.success(42),
  D.fold(
    () => 'loading',
    (e) => `${e}`,
    () => 'empty',
    (t) => `value is ${t}`
  )
)
```

Added in v1.0.0

## foldW

Fold and return different types in the response.

**Signature**

```ts
export declare const foldW: <E, A, U, T, V, Z>(
  loading: () => U,
  failure: (e: E) => T,
  empty: () => V,
  success: (a: A) => Z
) => (d: RemoteData<E, A>) => U | T | V | Z
```

**Example**

```ts
import * as D from '@jvlk/fp-ts-remote-data'
import { pipe } from 'fp-ts/function'

const resultOne = pipe(
  D.success(42),
  D.foldW(
    () => 'loading',
    (e) => Error(e),
    () => null,
    (t) => [t]
  )
)
```

Added in v1.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: RemoteData<E, A>) => RemoteData<E, B>
```

**Example**

```ts
import * as D from '@jvlk/fp-ts-remote-data'
import { pipe } from 'fp-ts/function'

pipe(
  D.success(42),
  D.map((n) => n + 10) // => success(52)
)

pipe(
  D.empty,
  D.map((n) => n + 10) // => empty
)
```

Added in v1.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (a: B, b: A) => B) => <E>(fa: RemoteData<E, A>) => B
```

Added in v1.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: RemoteData<E, A>) => B
```

Added in v1.0.0
