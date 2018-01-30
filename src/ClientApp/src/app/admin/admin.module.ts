﻿import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialLib } from '../shared/materialLib.module';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { VoidwellPipesModule } from '../shared/pipes/voidwellpipes.modules';
import { routing } from './admin.routes';
import { AdminWrapperComponent } from './adminwrapper.component';
import { DashboardComponent } from './dashboard.component';
import { BlogComponent, BlogEditorDialog } from './blog.component';
import { UsersComponent, UserEditorDialog } from './users.component';
import { RolesComponent } from './roles.component';
import { EventsComponent, EventEditorDialog } from './events.component';

@NgModule({
    declarations: [
        AdminWrapperComponent,
        DashboardComponent,
        BlogComponent,
        UsersComponent,
        RolesComponent,
        EventsComponent,
        EventEditorDialog,
        UserEditorDialog,
        BlogEditorDialog
    ],
    imports: [
        FormsModule,
        MaterialLib,
        CommonModule,
        VoidwellPipesModule,
        routing,
        SharedComponentsModule
    ],
    entryComponents: [
        AdminWrapperComponent,
        EventEditorDialog,
        UserEditorDialog,
        BlogEditorDialog
    ]
})
export class AdminModule { }
