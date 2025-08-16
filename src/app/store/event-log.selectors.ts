import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventLogState } from '../models/event-log.model';

export const selectEventLogState = createFeatureSelector<EventLogState>('eventLogs');

export const selectAllEventLogs = createSelector(
  selectEventLogState,
  (state: EventLogState) => state.eventLogs
);

export const selectEventLogsLoading = createSelector(
  selectEventLogState,
  (state: EventLogState) => state.loading
);

export const selectEventLogsError = createSelector(
  selectEventLogState,
  (state: EventLogState) => state.error
);

export const selectEventLogsSuccess = createSelector(
  selectEventLogState,
  (state: EventLogState) => state.success
);

export const selectEventLogsCount = createSelector(
  selectAllEventLogs,
  (eventLogs) => eventLogs.length
);

export const selectEventLogsByType = createSelector(
  selectAllEventLogs,
  (eventLogs) => {
    return {
      info: eventLogs.filter(log => log.tipo === 1).length,
      warning: eventLogs.filter(log => log.tipo === 2).length,
      error: eventLogs.filter(log => log.tipo === 3).length
    };
  }
);

export const selectEventLogsSortedByDate = createSelector(
  selectAllEventLogs,
  (eventLogs) => [...eventLogs].sort((a, b) => {
    const dateA = new Date(a.fechaCreacion || 0).getTime();
    const dateB = new Date(b.fechaCreacion || 0).getTime();
    return dateB - dateA;
  })
); 