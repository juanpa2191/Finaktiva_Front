import { createAction, props } from '@ngrx/store';
import { EventLog, CreateEventLogRequest } from '../models/event-log.model';

// Load Event Logs
export const loadEventLogs = createAction('[EventLog] Load Event Logs');
export const loadEventLogsSuccess = createAction(
  '[EventLog] Load Event Logs Success',
  props<{ eventLogs: EventLog[] }>()
);
export const loadEventLogsFailure = createAction(
  '[EventLog] Load Event Logs Failure',
  props<{ error: string }>()
);

// Create Event Log
export const createEventLog = createAction(
  '[EventLog] Create Event Log',
  props<{ eventLogData: CreateEventLogRequest }>()
);
export const createEventLogSuccess = createAction(
  '[EventLog] Create Event Log Success',
  props<{ eventLog: EventLog }>()
);
export const createEventLogFailure = createAction(
  '[EventLog] Create Event Log Failure',
  props<{ error: string }>()
);

// Clear messages
export const clearError = createAction('[EventLog] Clear Error');
export const clearSuccess = createAction('[EventLog] Clear Success'); 