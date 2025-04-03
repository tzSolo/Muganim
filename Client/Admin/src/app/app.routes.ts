import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "manage-users", component: UsersManagementComponent },
    { path: "workspace", component: WorkspaceComponent }
];
