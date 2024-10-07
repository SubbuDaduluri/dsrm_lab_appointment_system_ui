import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatLineModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { ToastrModule } from "ngx-toastr";
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import { NumbersOnlyDirective } from "./directives/numbers-only.directive";
import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        RouterModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        RouterLinkActive,
        MatLineModule,
        MatDividerModule,
        MatInputModule,
        MatProgressSpinner,
        MatProgressBarModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSortModule,
        DatePipe,
        MatGridListModule,
        MatTabsModule,
        ToastrModule,
        NgxMatSelectSearchModule,
        MatTooltipModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatStepperModule,
        NumbersOnlyDirective,
        GoogleMapsModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        RouterModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        RouterLinkActive,
        MatLineModule,
        MatDividerModule,
        MatInputModule,
        MatProgressSpinner,
        MatProgressBarModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSortModule,
        DatePipe,
        MatGridListModule,
        MatTabsModule,
        ToastrModule,
        NgxMatSelectSearchModule,
        MatTooltipModule,
        MatCardModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatStepperModule,
        NumbersOnlyDirective,
        GoogleMapsModule
    ]
})

export class AppCommomModule {

}