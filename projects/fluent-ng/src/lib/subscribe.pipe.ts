import {
  ChangeDetectorRef,
  EventEmitter,
  OnDestroy,
  Pipe,
  PipeTransform,
  ɵisObservable,
  ɵmarkDirty,
} from '@angular/core'
import {Observable, Subscribable, Unsubscribable,} from 'rxjs'

@Pipe({
  name: 'subscribe',
  pure: false,
})
export class SubscribePipe implements PipeTransform, OnDestroy {
  private latestValue: any = null

  private subscription: Unsubscribable | null = null
  private source: Subscribable<any> | EventEmitter<any> | null = null

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  transform<T>(dataStream: Observable<T> | Subscribable<T>, preload?: any): T | null;
  transform<T>(dataStream: null | undefined, preload?: any): null;
  transform<T>(dataStream: Observable<T> | Subscribable<T> | null | undefined, preload?: any): T | null;
  transform<T>(dataStream: Observable<T> | Subscribable<T> | null | undefined, preload?: any): T | null {
    if (!this.source) {
      if (ɵisObservable(dataStream) && dataStream['value'] !== undefined) {
        this.latestValue = dataStream['value']
      } else {
        this.latestValue = preload ?? null
      }

      if (dataStream) {
        this.subscribe(dataStream)
      }
      return this.latestValue
    }

    if (dataStream !== this.source) {
      this.cleanUpResources()
      return this.transform(dataStream as any)
    }
    return this.latestValue
  }

  private subscribe<T>(dataStream: Observable<T> | Subscribable<T> | null | undefined): void {
    this.source = dataStream
    if (!ɵisObservable(dataStream)) {
      throw  Error(`InvalidPipeArgument: '${dataStream}' for pipe stream`)
    }

    this.subscription = dataStream.subscribe({
      next: (value) => {
        if (dataStream === this.source) {
          this.latestValue = value

          //@ts-ignore this field exist but not in typing
          if (this.changeDetector.context) {
            //@ts-ignore
            ɵmarkDirty(this.changeDetector.context)
          }
        }
      },
      error: (e: any) => {
        throw e
      },
    })
  }

  private cleanUpResources(): void {
    this.subscription?.unsubscribe()
    this.latestValue = null
    this.subscription = null
    this.source = null
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.cleanUpResources()
    }
  }
}

