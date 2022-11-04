---
title: model.ts
nav_order: 3
parent: Modules
---

## model overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Empty (interface)](#empty-interface)
  - [Failure (interface)](#failure-interface)
  - [Loading (interface)](#loading-interface)
  - [RemoteData (type alias)](#remotedata-type-alias)
  - [Success (interface)](#success-interface)

---

# model

## Empty (interface)

**Signature**

```ts
export interface Empty {
  readonly _tag: 'Empty'
}
```

Added in v1.0.0

## Failure (interface)

**Signature**

```ts
export interface Failure<E> {
  readonly _tag: 'Failure'
  readonly failure: E
}
```

Added in v1.0.0

## Loading (interface)

**Signature**

```ts
export interface Loading {
  readonly _tag: 'Loading'
}
```

Added in v1.0.0

## RemoteData (type alias)

**Signature**

```ts
export type RemoteData<E, A> = Loading | Failure<E> | Success<A> | Empty
```

Added in v1.0.0

## Success (interface)

**Signature**

```ts
export interface Success<A> {
  readonly _tag: 'Success'
  readonly success: A
}
```

Added in v1.0.0
