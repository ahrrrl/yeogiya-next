'use client';

import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from '../../SpaceDetail.module.scss';

moment.locale('ko');
const localizer = momentLocalizer(moment);

interface SchedulePlusId {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export default function SpaceDetailClient({
  schedules,
}: {
  schedules: SchedulePlusId[];
}) {
  const [selectedEvent, setSelectedEvent] = useState<SchedulePlusId | null>(
    null
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = schedules.map((schedule) => ({
    id: schedule.id,
    title: `${schedule.startTime} - ${schedule.endTime}`,
    start: new Date(`${schedule.date}T${schedule.startTime}`),
    end: new Date(`${schedule.date}T${schedule.endTime}`),
    resource: schedule,
  }));

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event.resource);
  };

  const handleReservation = () => {
    if (selectedEvent) {
      alert(
        `${selectedEvent.date} ${selectedEvent.startTime}에 예약되었습니다.`
      );
      setSelectedEvent(null);
    }
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const customDayPropGetter = (date: Date) => {
    const currentMonth = currentDate.getMonth();
    if (date.getMonth() !== currentMonth) {
      return {
        className: styles.outsideMonth,
        style: {
          backgroundColor: '#f0f0f0',
        },
      };
    }
    return {};
  };

  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        views={['month']}
        defaultView={Views.MONTH}
        date={currentDate}
        onNavigate={handleNavigate}
        dayPropGetter={customDayPropGetter}
        formats={{
          dayFormat: 'D',
        }}
        messages={{
          showMore: (count) => `+${count}개 더보기`,
        }}
        components={{
          month: {
            dateHeader: ({ date, label }) => <span>{label}</span>,
          },
        }}
        popup
        popupOffset={{ x: 0, y: 0 }}
      />
      {selectedEvent && (
        <div className={styles.selectedEvent}>
          <p>
            선택된 일정: {selectedEvent.date} {selectedEvent.startTime} -{' '}
            {selectedEvent.endTime}
          </p>
          <button onClick={handleReservation} className={styles.reserveButton}>
            예약하기
          </button>
        </div>
      )}
    </div>
  );
}
