import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TestDirective } from "../test.directive";
import { AlertComponent } from "./alert/alert.component";
//import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations:[
        TestDirective,
        LoadingSpinnerComponent,
        AlertComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports:[
        TestDirective,
        CommonModule,
        LoadingSpinnerComponent,
        AlertComponent
    ]
})
export class SharedModule{}