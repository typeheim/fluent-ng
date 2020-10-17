import {
  Pipe,
  PipeTransform,
  ChangeDetectorRef,
  OnDestroy,
  ɵisPromise,
} from '@angular/core';

export interface PromiseConfig {
  default: any;
}

@Pipe({
  name: 'await',
  pure: false,
})
export class AwaitPipe implements PipeTransform, OnDestroy {
  private latestValue: any = null;
  private source: Promise<any> = null;

  constructor(private changeDetector: ChangeDetectorRef) {}

  transform<T>(dataStream: Promise<T> | null | undefined, config?: PromiseConfig): T | null {
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

  private subscribe(dataStream: Promise<any>): void {
    this.source = dataStream;

    if (!ɵisPromise(dataStream)) {
      throw  Error(`InvalidPipeArgument: '${dataStream}' for pipe await`);
    }
    dataStream.then((value) => {
      if (dataStream === this.source) {
        this.latestValue = value;
        if (!this.changeDetector['destroyed']) {
          this.changeDetector.detectChanges();
        }
      }
    }, e => {
      throw e;
    });
  }

  private cleanUpResources(): void {
    this.latestValue = null;
    this.source = null;
  }

  ngOnDestroy(): void {
    this.cleanUpResources();
  }
}

