import {
  Pipe,
  PipeTransform,
  ChangeDetectorRef,
  EventEmitter,
  OnDestroy,
  ɵisObservable,
} from '@angular/core';
import {
  Observable,
  SubscriptionLike,
} from 'rxjs';

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
  private source: Observable<any> | EventEmitter<any> | null = null;

  constructor(private changeDetector: ChangeDetectorRef) {}

  transform(dataStream: Observable<any> | null | undefined, config?: StreamConfig): any {
    if (!this.source) {
      this.latestValue = this.latestValue ?? config?.default ?? null;
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

  private subscribe(dataStream: Observable<any> | EventEmitter<any>): void {
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

