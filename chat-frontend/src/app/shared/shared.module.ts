import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material/material.module";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/menu/header/header.component";
import { SidenavComponent } from "./components/menu/sidenav/sidenav.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ProfilePopupComponent } from './components/profile-popup/profile-popup.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent, FooterComponent, LoadingSpinnerComponent, DeleteButtonComponent, DateFormatPipe, ProfilePopupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterLink
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DeleteButtonComponent,
    DateFormatPipe,
    ProfilePopupComponent,
  ],
})
export class SharedModule {}
