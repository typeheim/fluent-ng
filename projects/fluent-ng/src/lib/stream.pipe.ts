import {ChangeDetectorRef, EventEmitter, OnDestroy, Pipe, PipeTransform, ɵisObservable,} from '@angular/core';
import {Observable, Subscribable, SubscriptionLike,} from 'rxjs';

export interface StreamConfig {
  default: any;
}

@Pipe({
  name: 'stream',
  pure: false,
})
export class StreamPipe implements PipeTransform, OnDestroy {
  private latestValue: any = null;

  private subscription: SubscriptionLike;
  private source: Subscribable<any> | EventEmitter<any> | null = null

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  transform<T>(dataStream: Observable<T> | Subscribable<T>, config?: StreamConfig): T | null;
  transform<T>(dataStream: null | undefined, preload?: any): null;
  transform<T>(dataStream: Observable<T> | Subscribable<T> | null | undefined, config?: StreamConfig): T | null;
  transform<T>(dataStream: Observable<T> | Subscribable<T> | null | undefined, config?: StreamConfig): T | null {
    if (!this.source) {
      if (ɵisObservable(dataStream) && dataStream['value'] !== undefined) {
        this.latestValue = dataStream['value']
      } else {
        this.latestValue = this.latestValue ?? config?.default ?? null;
      }

      if (dataStream) {
        this.subscribe(dataStream);
      }
      return this.latestValue;
    }

    if (dataStream !== this.source) {
      this.cleanUpResources();
      return this.transform(dataStream as any);
    }
    return this.latestValue;
  }

  private subscribe<T>(dataStream: Observable<T> | Subscribable<T> | null | undefined): void {
    this.source = dataStream;
    if (!ɵisObservable(dataStream)) {
      throw  Error(`InvalidPipeArgument: '${dataStream}' for pipe stream`);
    }

    this.subscription = dataStream.subscribe({
      next: (value) => {
        if (dataStream === this.source) {
          this.latestValue = value;
          if (!this.changeDetector['destroyed']) {
            this.changeDetector.detectChanges();
          }

        }
      },
      error: (e: any) => {
        throw e;
      },
    });
  }

  private cleanUpResources(): void {
    this.subscription?.unsubscribe();
    this.latestValue = null;
    this.subscription = null;
    this.source = null;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.cleanUpResources();
    }
  }
}

