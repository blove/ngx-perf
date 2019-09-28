import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Paint } from '../interfaces';
import { EntryType } from './entry-type';

@Injectable()
export class PaintEntryType extends EntryType {
  /** The longtask entry-type name. */
  static entryType:
    | 'frame'
    | 'longtask'
    | 'mark'
    | 'measure'
    | 'navigation'
    | 'paint'
    | 'resource' = 'paint';

  /** The entry-type name based on the PerformanceEntry web API. */
  entryType = PaintEntryType.entryType;

  /**
   * Get the first contentful paint (FCP) timing.
   */
  get fcp$(): Observable<Paint> {
    return this.paints
      .asObservable()
      .pipe(filter(paint => paint.name === 'first-contentful-paint'));
  }

  /**
   * Get the first paint (FP) timing.
   */
  get fp$(): Observable<Paint> {
    return this.paints
      .asObservable()
      .pipe(filter(paint => paint.name === 'first-paint'));
  }

  /** PerformancePaintTiming events. */
  private paints = new ReplaySubject<Paint>();

  constructor() {
    super();
  }

  /** The callback when observing performance entries. */
  entryCallback(performanceEntry: PerformanceEntry): void {
    if (performanceEntry.entryType !== PaintEntryType.entryType) {
      return;
    }

    this.paints.next({
      name: performanceEntry.name,
      start: performanceEntry.startTime,
      duration: performanceEntry.duration,
      end: performanceEntry.startTime + performanceEntry.duration
    });
  }
}
