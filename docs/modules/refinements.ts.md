---
title: refinements.ts
nav_order: 4
parent: Modules
---

## refinements overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [guards](#guards)
  - [isEmpty](#isempty)
  - [isFailure](#isfailure)
  - [isLoading](#isloading)
  - [isSuccess](#issuccess)

---

# guards

## isEmpty

Returns `true` if the RemoteData is an instance of `Empty`, `false` otherwise.

**Signature**

```ts
export declare const isEmpty: <E, A>(t: RemoteData<E, A>) => t is Empty
```

**Example**

```ts
import * as RD from '@jvlk/fp-ts-remote-data'

RD.isEmpty(RD.success(1)) // false
RD.isEmpty(RD.failure(1)) // false
RD.isEmpty(RD.empty) // true
RD.isEmpty(RD.loading) // false
```

Added in v1.0.0

## isFailure

Returns `true` if the RemoteData is an instance of `Failure`, `false` otherwise.

**Signature**

```ts
export declare const isFailure: <E, A>(t: RemoteData<E, A>) => t is Failure<E>
```

**Example**

```ts
import * as RD from '@jvlk/fp-ts-remote-data'

RD.isFailure(RD.success(1)) // false
RD.isFailure(RD.failure(1)) // true
RD.isFailure(RD.empty) // false
RD.isFailure(RD.loading) // false
```

Added in v1.0.0

## isLoading

Returns `true` if the RemoteData is an instance of `Loading`, `false` otherwise.

**Signature**

```ts
export declare const isLoading: <E, A>(t: RemoteData<E, A>) => t is Loading
```

**Example**

```ts
import * as RD from '@jvlk/fp-ts-remote-data'

RD.isLoading(RD.success(1)) // false
RD.isLoading(RD.failure(1)) // false
RD.isLoading(RD.empty) // false
RD.isLoading(RD.loading) // true
```

Added in v1.0.0

## isSuccess

Returns `true` if the RemoteData is an instance of `Success`, `false` otherwise.

**Signature**

```ts
export declare const isSuccess: <E, A>(t: RemoteData<E, A>) => t is Success<A>
```

**Example**

```ts
import * as RD from '@jvlk/fp-ts-remote-data'

RD.isSuccess(RD.success(1)) // true
RD.isSuccess(RD.failure(1)) // false
RD.isSuccess(RD.empty) // false
RD.isSuccess(RD.loading) // false
```

Added in v1.0.0
