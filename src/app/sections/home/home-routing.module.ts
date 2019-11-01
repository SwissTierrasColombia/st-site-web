import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';

// Components
import { WelcomeComponent } from './welcome/welcome.component';

// Guards

const routes: Routes = [
    {
        path: 'home',
        component: MainLayoutComponent,
        children: [
            { path: '', component: WelcomeComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
