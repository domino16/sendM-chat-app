import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, FormsModule],
})
export class HomeModule {}
