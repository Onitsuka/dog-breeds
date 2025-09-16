import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from './app.routes';
import { DOG_FACTORY } from "../../shared/infrastructure/api/breeds/factories/dog-factory.token";
import { DogFactoryImpl } from "../../shared/infrastructure/api/breeds/factories/dog-factory.impl";
import {provideHttpClient, withFetch} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    {
      provide: DOG_FACTORY,
      useClass: DogFactoryImpl,
    },
  ]
};
