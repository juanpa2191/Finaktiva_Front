import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, map, combineLatest, of } from 'rxjs';

import { EventLog, EventLogType, EventLogTypeLabels, CreateEventLogRequest } from '../../models/event-log.model';
import * as EventLogActions from '../../store/event-log.actions';
import * as EventLogSelectors from '../../store/event-log.selectors';

@Component({
  selector: 'app-event-log-manager',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './event-log-manager.component.html',
  styleUrl: './event-log-manager.component.scss'
})
export class EventLogManagerComponent implements OnInit, OnDestroy {
  eventLogs$: Observable<EventLog[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  success$: Observable<string | null>;
  eventLogsCount$: Observable<number>;
  eventLogsByType$: Observable<{ info: number; warning: number; error: number }>;
  eventLogsForTable$: Observable<EventLog[]>;

  eventLogForm: FormGroup;
  eventLogTypes = Object.values(EventLogType).filter(value => typeof value === 'number');
  eventLogTypeLabels = EventLogTypeLabels;
  displayedColumns: string[] = ['fechaCreacion', 'tipo', 'descripcion'];

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.eventLogs$ = this.store.select(EventLogSelectors.selectEventLogsSortedByDate);
    this.loading$ = this.store.select(EventLogSelectors.selectEventLogsLoading);
    this.error$ = this.store.select(EventLogSelectors.selectEventLogsError);
    this.success$ = this.store.select(EventLogSelectors.selectEventLogsSuccess);
    this.eventLogsCount$ = this.store.select(EventLogSelectors.selectEventLogsCount);
    this.eventLogsByType$ = this.store.select(EventLogSelectors.selectEventLogsByType);
    
    // Para la tabla, asegurar que siempre sea un array
    this.eventLogsForTable$ = combineLatest([
      of([]),
      this.eventLogs$
    ]).pipe(
      map(([initial, eventLogs]) => eventLogs || initial)
    );

    this.eventLogForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      tipo: [EventLogType.Info, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEventLogs();
    
    // Auto-clear messages
    this.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      if (error) {
        setTimeout(() => {
          this.store.dispatch(EventLogActions.clearError());
        }, 5000);
      }
    });

    this.success$.pipe(takeUntil(this.destroy$)).subscribe(success => {
      if (success) {
        setTimeout(() => {
          this.store.dispatch(EventLogActions.clearSuccess());
        }, 5000);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadEventLogs(): void {
    this.store.dispatch(EventLogActions.loadEventLogs());
  }

  createEventLog(): void {
    if (this.eventLogForm.valid) {
      const eventLogData: CreateEventLogRequest = {
        descripcion: this.eventLogForm.value.descripcion,
        tipo: this.eventLogForm.value.tipo
      };

      this.store.dispatch(EventLogActions.createEventLog({ eventLogData }));
      this.resetForm();
    }
  }

  resetForm(): void {
    this.eventLogForm.reset({
      descripcion: '',
      tipo: EventLogType.Info
    });
  }

  getTypeColor(tipo: number): string {
    switch (tipo) {
      case EventLogType.Info: return 'primary';
      case EventLogType.Warning: return 'accent';
      case EventLogType.Error: return 'warn';
      default: return 'primary';
    }
  }

  getTypeLabel(tipo: number | string): string {
    const numericType = typeof tipo === 'string' ? parseInt(tipo, 10) : tipo;
    return this.eventLogTypeLabels[numericType as EventLogType] || 'Desconocido';
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('es-ES');
  }

  clearError(): void {
    this.store.dispatch(EventLogActions.clearError());
  }

  clearSuccess(): void {
    this.store.dispatch(EventLogActions.clearSuccess());
  }
} 