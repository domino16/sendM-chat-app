import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup/signup.component";
import { SharedModule } from "../../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
