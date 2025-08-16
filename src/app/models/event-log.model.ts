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
  Api = 1,
  Manual = 2
}

export const EventLogTypeLabels: Record<EventLogType, string> = {
  [EventLogType.Api]: 'API',
  [EventLogType.Manual]: 'Manual'
}; 