import { NgModule } from '@angular/core';

import { CONFIGURATION_INJECTION_TOKEN } from './configuration.injection-token';
import { Configuration } from './interfaces';
import { PerformanceService, WINDOW_PROVIDERS } from './services';

@NgModule()
export class PerformanceModule {
  static forRoot(configuration: Configuration) {
    return {
      ngModule: PerformanceModule,
      providers: [
        {
          provide: CONFIGURATION_INJECTION_TOKEN,
          useValue: configuration
        },
        PerformanceService,
        WINDOW_PROVIDERS
      ]
    };
  }
}
