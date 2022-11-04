---
title: Home
nav_order: 1
---

# @jvlk/fp-ts-remote-data

A library to make it easy to work with remote data. Compatible with the `fp-ts` ecosystem, but it's not required.

RemoteData represents a value that can be in one of four states:

- Loading
- Error
- Empty
- Success

## Example in React

```tsx
import * as RD from '@jvlk/fp-ts-remote-data'
import { pipe } from 'fp-ts/function'

import useBlogRequest from './useBlogRequest'
import Loading from './Loading'
import Error from './Error'
import Empty from './Empty'
import Blog from './Blog'

function Component() {
  const blog = useBlogRequest()

  return pipe(
    blog,
    RD.fold(
        () => <Loading />),
        err => <Error error={err}>,
        () => <Empty/>,
        entries => <Blog entries={entries}>
  )
}
```

## Installation

Using NPM:

```
npm i @jvlk/fp-ts-remote-data
```

Using Yarn:

```
yarn add @jvlk/fp-ts-remote-data
```

## Thanks

The start of this repo began as a clone of https://github.com/sylcastaing/fp-ts-remote-data. I have modified it and diverged from it. That library is much more "sound" from a `fp-ts` types perspective, but I wanted to create something that was focused more on developer usability. I've removed many of the functions in favor of simplifying things. I have also added the 4th state of `empty` to avoid having to use a value of `Option` if the results don't contain any data.

The original concept of the RemoteData type comes from [How Elm Slays a UI Antipattern](http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html).
