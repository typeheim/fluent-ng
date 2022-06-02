# FluentNG

Collection of Angular extensions
<p>
    <a href="https://www.npmjs.com/package/@typeheim/fluent-ng" target="_blank"><img src="https://img.shields.io/npm/v/@typeheim/fluent-ng.svg" alt="NPM Version" /></a>
    <a href="https://travis-ci.org/github/typeheim/fluent-ng" target="_blank"><img src="https://travis-ci.org/typeheim/fluent-ng.svg?branch=master" alt="Build Status" /></a>
    <a href="https://www.npmjs.com/package/@typeheim/fluent-ng" target="_blank"><img src="https://img.shields.io/npm/l/@typeheim/fluent-ng.svg" alt="Package License" /></a>
    <a href="https://discord.gg/dmMznp9" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

# Getting Started

Install package
```shell
yarn add @typeheim/fluent-ng
//or
npm -i @typeheim/fluent-ng
```

## SubscribePipe

SubscribePipe is an alternative to Angular core AsyncPipe. SubscribePipe is tuned to work only with observables and support setting default values instead of `null`.
Unlike AsyncPipe, SubscribePipe call `markDirty`, introduced with Ivy, instead of `markForCheck` giving better performance, resource utilization and smooth UI updates.
```typescript
@Component({
  template: `
    {{observableSource | subscribe}}
    {{observableSource | subscribe: 'default text' }}
  `
})
class StreamSampleComponent {
  observableSource = new Subject()
}
```

## StreamPipe

StreamPipe is an alternative to Angular core AsyncPipe. StreamPipe is tuned to work only with observables and support setting default values instead of `null`.
Unlike AsyncPipe, StreamPipe call `detectChanges` of `ChangeDetectorRef` instead of `markForCheck` that marks the component tree dirty up to the root component, and then re-renders the full path until the component that caused the change, and all its child components related to the change. In the end, StreamPipe, triggers change detection and rendering only in the very component where the change got introduced, and the child components effected by the change giving better performance and smooth UI chnages. 
```typescript
@Component({
  template: `
    {{observableSource | stream}}
    {{observableSource | stream: {default: 'default text'} }}
  `
})
class StreamSampleComponent {
  observableSource = new Subject()
}
```

## AwaitPipe

AwaitPipe works the same way as StreamPipe but instead of observables it expects promise.

```typescript
@Component({
  template: `
    {{promiseSource | await}}
    {{promiseSource | await: {default: 'default text'} }}
  `
})
class PromiseSampleComponent {
  promiseSource = new Promise((resolve) => resolve('it works!'))
}
```
