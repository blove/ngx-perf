import { Injectable } from '@angular/core';

@Injectable()
export abstract class EntryType {
  /** The entry-type name based on the PerformanceEntry web API. */
  abstract entryType:
    | 'frame'
    | 'longtask'
    | 'mark'
    | 'measure'
    | 'navigation'
    | 'paint'
    | 'resource';

  /** The callback when observing performance entries. */
  abstract entryCallback(performanceEntry: PerformanceEntry): void;
}
