import {
  NgModule,
  ModuleWithProviders,
} from '@angular/core';
import { StreamPipe } from './stream.pipe';
import { AwaitPipe } from './await.pipe';

@NgModule({
  declarations: [StreamPipe, AwaitPipe],
  imports: [],
  exports: [StreamPipe, AwaitPipe],
})
export class FluentNgModule {
  static forRoot(): ModuleWithProviders<FluentNgModule> {
    return {
      ngModule: FluentNgModule,
      providers: [],
    };
  }
}
