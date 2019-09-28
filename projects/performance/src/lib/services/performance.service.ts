import { Inject, Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { WINDOW } from '../services/window.service';
import { takeUntil } from 'rxjs/operators';
import { EntryType } from '../entry-types/entry-type';
import { Configuration, Paint } from '../interfaces';
import { LongTaskEntryType } from '../entry-types/longtask-entry-type';
import { PaintEntryType } from '../entry-types/paint-entry-type';
import { CONFIGURATION_INJECTION_TOKEN } from '../configuration.injection-token';

/** @dynamic */
@Injectable()
export class PerformanceService {
  get fp$(): Observable<Paint> {
    const entryType = this.entryTypes.find(
      (e): e is PaintEntryType => e.entryType === PaintEntryType.entryType
    );
    return entryType === undefined ? of(null) : entryType.fp$;
  }

  /**
   * Get performance entries using the `PerformanceObserver` API.
   * NOTE: This requires the `buffered` implementation as part of PerformanceObserver API 2
   */
  protected get performance$(): Observable<PerformanceEntry> {
    if ('PerformanceObserver' in this.window) {
      return new Observable<PerformanceEntry>(observer => {
        this.performanceObserver = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            observer.next(entry);
          }
        });
        this.performanceObserver.observe({
          entryTypes: this.entryTypes.map(entryType => entryType.entryType),
          buffered: true
        });

        return () => {
          this.performanceObserver.disconnect();
        };
      });
    }
    return of(null);
  }

  /** The PerformanceObserver instance. */
  protected performanceObserver: PerformanceObserver;

  /** The entry types to observe. */
  private entryTypes: EntryType[] = [];

  /** Disable subject for disabling the observer. */
  private unsubscribe = new Subject();

  constructor(
    @Inject(CONFIGURATION_INJECTION_TOKEN)
    private readonly configuration: Configuration,
    @Inject(WINDOW) protected readonly window: Window
  ) {
    this.populateEntryTypes();
    this.performance$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(entry =>
        this.entryTypes.forEach(entryType => entryType.entryCallback(entry))
      );
  }

  disable(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /** Populate the entryTypes based on the provided Configuration. */
  private populateEntryTypes(): void {
    if (this.configuration.entryTypes.longTask) {
      this.entryTypes.push(new LongTaskEntryType());
    }

    if (this.configuration.entryTypes.paint) {
      this.entryTypes.push(new PaintEntryType());
    }
  }
}
