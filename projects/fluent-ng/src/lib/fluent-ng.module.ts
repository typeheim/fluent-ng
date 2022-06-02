import {
    ModuleWithProviders,
    NgModule,
} from '@angular/core'
import { StreamPipe } from './stream.pipe'
import { AwaitPipe } from './await.pipe'
import { SubscribePipe } from './subscribe.pipe'

@NgModule({
    declarations: [
        StreamPipe,
        AwaitPipe,
        SubscribePipe
    ],
    imports: [],
    exports: [
        StreamPipe,
        AwaitPipe,
        SubscribePipe,
    ],
})
export class FluentNgModule {
    static forRoot(): ModuleWithProviders<FluentNgModule> {
        return {
            ngModule: FluentNgModule,
            providers: [],
        }
    }
}
