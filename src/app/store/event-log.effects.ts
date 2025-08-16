import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { EventLogService } from '../services/event-log.service';
import * as EventLogActions from './event-log.actions';

@Injectable()
export class EventLogEffects {

  loadEventLogs$ = createEffect(() => this.actions$.pipe(
    ofType(EventLogActions.loadEventLogs),
    mergeMap(() => this.eventLogService.getAllEventLogs()
      .pipe(
        map(eventLogs => EventLogActions.loadEventLogsSuccess({ eventLogs })),
        catchError(error => of(EventLogActions.loadEventLogsFailure({ error: error.message })))
      ))
  ));

  createEventLog$ = createEffect(() => this.actions$.pipe(
    ofType(EventLogActions.createEventLog),
    mergeMap(({ eventLogData }) => this.eventLogService.createEventLog(eventLogData)
      .pipe(
        map(eventLog => EventLogActions.createEventLogSuccess({ eventLog })),
        catchError(error => of(EventLogActions.createEventLogFailure({ error: error.message })))
      ))
  ));

  // Auto-clear success message after 5 seconds
  clearSuccessMessage$ = createEffect(() => this.actions$.pipe(
    ofType(EventLogActions.createEventLogSuccess),
    tap(() => {
      setTimeout(() => {
        // This will be handled by the component
      }, 5000);
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private eventLogService: EventLogService
  ) {}
} 