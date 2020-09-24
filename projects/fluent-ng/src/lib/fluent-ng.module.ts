import {
  NgModule,
  ModuleWithProviders,
} from '@angular/core';
import { StreamPipe } from './stream.pipe';
import { AwaitPipe } from './await.pipe';

@NgModule({
  declarations: [StreamPipe, AwaitPipe],
  imports: [],
  exports: [],
})
export class FluentNgModule {
  static forRoot(): ModuleWithProviders<FluentNgModule> {
    return {
      ngModule: FluentNgModule,
      providers: [],
    };
  }
}
