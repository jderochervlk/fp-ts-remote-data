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

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <E, A = E, B = A>(
  f: (a: A) => RemoteData<E, B>
) => (ma: RemoteData<E, A>) => RemoteData<E, B>
```

Added in v1.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <D, A, B>(
  f: (a: A) => RemoteData<D, B>
) => <E>(ma: RemoteData<E, A>) => RemoteData<D | E, B>
```

Added in v1.0.0

## fold

**Signature**

```ts
export declare const fold: <E, A, B>(
  loading: () => B,
  failure: (e: E) => B,
  empty: () => B,
  success: (a: A) => B
) => (rd: RemoteData<E, A>) => B
```

Added in v1.0.0

## foldW

**Signature**

```ts
export declare const foldW: <E, A, U, T, V, Z>(
  loading: () => U,
  failure: (e: E) => T,
  empty: () => V,
  success: (a: A) => Z
) => (rd: RemoteData<E, A>) => U | T | V | Z
```

Added in v1.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: RemoteData<E, A>) => RemoteData<E, B>
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
