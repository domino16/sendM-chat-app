import { NgModule, isDevMode } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { HomeModule } from "./features/home/home.module";
import { SharedModule } from "./shared/shared.module";
import { ChatModule } from "./features/chat/chat.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { jwtInterceptorProvider } from "./core/interceptors/token.interceptor";
import { ServiceWorkerModule } from "@angular/service-worker";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { authReducer } from "./store/auth/auth.reducer";
import { AuthEffects } from "./store/auth/auth.effects";
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    ChatModule,
    SharedModule,
    BrowserModule.withServerTransition({ appId: "serverApp" }), BrowserAnimationsModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature(AuthEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  providers: [jwtInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
