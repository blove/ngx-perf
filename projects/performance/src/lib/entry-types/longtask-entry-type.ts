import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import ttiPolyfill from 'tti-polyfill';

import { LongTask } from '../interfaces';
import { EntryType } from './entry-type';

@Injectable()
export class LongTaskEntryType extends EntryType {
  /** The longtask entry-type name. */
  static entryType:
    | 'frame'
    | 'longtask'
    | 'mark'
    | 'measure'
    | 'navigation'
    | 'paint'
    | 'resource' = 'longtask';

  /** The entry-type name based on the PerformanceEntry web API. */
  entryType = LongTaskEntryType.entryType;

  /**
   * Get long running tasks.
   */
  get longTasks$() {
    return this.longTasks.asObservable();
  }

  get tti$(): Observable<number> {
    return new Observable<number>(observer => {
      ttiPolyfill
        .getFirstConsistentlyInteractive()
        .then(tti => {
          observer.next(tti);
        })
        .catch(e => observer.error(e));
    });
  }

  /** Long task events. */
  private longTasks = new ReplaySubject<LongTask>();

  constructor() {
    super();
  }

  /** The callback when observing performance entries. */
  entryCallback(performanceEntry: PerformanceEntry): void {
    if (performanceEntry.entryType !== LongTaskEntryType.entryType) {
      return;
    }

    this.longTasks.next({
      name: performanceEntry.name,
      start: performanceEntry.startTime,
      duration: performanceEntry.duration,
      end: performanceEntry.startTime + performanceEntry.duration,
      label: JSON.stringify((performanceEntry as any).attribution)
    });
  }
}
