import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BagelsComponent} from './components/bagels/bagels.component';
import {GeometriesComponent} from './components/geometries/geometries.component';

@NgModule({
    declarations: [
        AppComponent,
        BagelsComponent,
        GeometriesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
