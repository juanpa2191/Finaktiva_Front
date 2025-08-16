export interface EventLog {
  id?: string;
  descripcion: string;
  tipo: number;
  fechaCreacion?: string;
}

export interface CreateEventLogRequest {
  descripcion: string;
  tipo: number;
}

export interface EventLogState {
  eventLogs: EventLog[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

export enum EventLogType {
  Info = 1,
  Warning = 2,
  Error = 3
}

export const EventLogTypeLabels: Record<EventLogType, string> = {
  [EventLogType.Info]: 'Información',
  [EventLogType.Warning]: 'Advertencia',
  [EventLogType.Error]: 'Error'
}; 