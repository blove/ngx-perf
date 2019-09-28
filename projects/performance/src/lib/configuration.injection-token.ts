import { InjectionToken } from '@angular/core';

import { Configuration } from './interfaces';

export const CONFIGURATION_INJECTION_TOKEN = new InjectionToken<Configuration>(
  'Configuration'
);
