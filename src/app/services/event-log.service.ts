import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventLog, CreateEventLogRequest } from '../models/event-log.model';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {
  private baseUrl = 'https://localhost:7189/api';

  constructor(private http: HttpClient) { }

  /**
   * Crear un nuevo log de evento
   */
  createEventLog(eventLogData: CreateEventLogRequest): Observable<EventLog> {
    return this.http.post<EventLog>(`${this.baseUrl}/EventLogs`, eventLogData);
  }

  /**
   * Obtener todos los logs de eventos
   */
  getAllEventLogs(): Observable<EventLog[]> {
    return this.http.get<EventLog[]>(`${this.baseUrl}/EventLogs`);
  }

  /**
   * Obtener un log de evento por ID
   */
  getEventLogById(id: string): Observable<EventLog> {
    return this.http.get<EventLog>(`${this.baseUrl}/EventLogs/${id}`);
  }
} 