---
title: constructors.ts
nav_order: 1
parent: Modules
---

## constructors overview

Functions to create a new RemoteData.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [empty](#empty)
  - [failure](#failure)
  - [loading](#loading)
  - [of](#of)
  - [success](#success)

---

# constructors

## empty

Constructs a new `RemoteData` with an empty state.

**Signature**

```ts
export declare const empty: RemoteData<never, never>
```

**Example**

```ts
import * as RD from '@jvlk/fp-ts-remote-data'

const emptyValue = RD.empty
```

Added in v1.0.0

## failure

Constructs a new `RemoteData` holding an `Failure` value.

**Signature**

```ts
export declare const failure: <E = never, A = never>(e: E) => RemoteData<E, A>
```

**Example**

```ts
import * as RD from '@jvlk/fp-ts-remote-data'

const failure = RD.failure(42)
```

Added in v1.0.0

## loading

Constructs a new `RemoteData` with a loading state.

**Signature**

```ts
export declare const loading: RemoteData<never, never>
```

**Example**

```ts
import * as RD from '@jvlk/fp-ts-remote-data'

const loadingValue = RD.loading
```

Added in v1.0.0

## of

Constructs a new `RemoteData` from an object

**Signature**

```ts
export declare const of: <E, A>(obj: remoteDataOf<E, A>) => RemoteData<E, A>
```

**Example**

```ts
import * as RD from '@jvlk/fp-ts-remote-data'

const one = RD.of({ loading: true }) // => loading
const two = RD.of({ loading: false, failure: Error('oh no') }) // => failure
const three = RD.of({ loading: false, value: undefined }) // => empty
const four = RD.of({ loading: false, value: 42 }) // => success
```

Added in v1.0.0

## success

Constructs a new `RemoteData` holding a `Success` value.

**Signature**

```ts
export declare const success: <E = never, A = never>(a: A) => RemoteData<E, A>
```

**Example**

```ts
import * as RD from '@jvlk/fp-ts-remote-data'

const successValue = RD.success(42)
```

Added in v1.0.0
