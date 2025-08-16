import { createReducer, on } from '@ngrx/store';
import { EventLogState } from '../models/event-log.model';
import * as EventLogActions from './event-log.actions';

export const initialState: EventLogState = {
  eventLogs: [],
  loading: false,
  error: null,
  success: null
};

export const eventLogReducer = createReducer(
  initialState,
  
  // Load Event Logs
  on(EventLogActions.loadEventLogs, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(EventLogActions.loadEventLogsSuccess, (state, { eventLogs }) => ({
    ...state,
    eventLogs,
    loading: false,
    error: null
  })),
  
  on(EventLogActions.loadEventLogsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Create Event Log
  on(EventLogActions.createEventLog, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null
  })),
  
  on(EventLogActions.createEventLogSuccess, (state, { eventLog }) => ({
    ...state,
    eventLogs: [eventLog, ...state.eventLogs],
    loading: false,
    error: null,
    success: 'Log de evento creado exitosamente'
  })),
  
  on(EventLogActions.createEventLogFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Clear messages
  on(EventLogActions.clearError, (state) => ({
    ...state,
    error: null
  })),
  
  on(EventLogActions.clearSuccess, (state) => ({
    ...state,
    success: null
  }))
); 