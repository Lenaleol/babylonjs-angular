import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GeometriesComponent} from './components/geometries/geometries.component';
import {BagelsComponent} from './components/bagels/bagels.component';


const routes: Routes = [
    {
        path: '',
        component: BagelsComponent
    },
    {
        path: 'geometries',
        component: GeometriesComponent
    },
    {
        path: '**',
        component: BagelsComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
