import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';

// Components
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';

// Guards

const routes: Routes = [
    {
        path: 'errors',
        component: MainLayoutComponent,
        children: [
            { path: 'not-found', component: ErrorNotFoundComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorRoutingModule { }
