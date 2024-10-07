import { ChangeDetectorRef, Component, model } from '@angular/core';
import { AppCommomModule } from '../../../shared/app.common.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { createEventId, INITIAL_EVENTS } from '../../../core/models/event-utils';


@Component({
  selector: 'app-calendar-appointment',
  standalone: true,
  imports: [AppCommomModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    FullCalendarModule
  ],
  templateUrl: './calendar-appointment.component.html',
  styleUrl: './calendar-appointment.component.scss'
})
export class CalendarAppointmentComponent {
  calendarVisible = true;
  seqNo = 0;
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: true },
    events: [
      {
        appointmentId : 'AP-01-01',
        title: 'Appointment With Subramanyam', 
        start: new Date("October 04, 2024 11:13:00"),
        end: new Date("October 04, 2024 12:50:00")
      },
      {
        appointmentId : 'AP-01-01', 
               title: 'Appointment With Subramanyam', 
        start: new Date("October 04, 2024 13:00:00"),
        end: new Date("October 04, 2024 13:30:00")
      },
      {
        appointmentId : 'AP-01-01',
                title: 'Appointment With Subramanyam', 
        start: new Date("October 04, 2024 13:40:00"),
        end: new Date("October 04, 2024 14:20:00")
      },
      {
        appointmentId : 'AP-01-01', 
               title: 'Appointment With Subramanyam', 
        start: new Date("October 04, 2024 14:40:00"),
        end: new Date("October 04, 2024 15:50:00")
      },
      {
        appointmentId : 'AP-01-01',
                title: 'Appointment With Subramanyam', 
        start: new Date("October 04, 2024 16:00:00"),
        end: new Date("October 04, 2024 17:50:00")
      },
     
    ]
  };
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }


  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`) +clickInfo.event.extendedProps['appointmentId']) {
     clickInfo.event.remove();
   //   alert(clickInfo.event.extendedProps['appointmentId']);
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

    createEventId(patientSeqNo: string) {
    return String(patientSeqNo);
  }

}
