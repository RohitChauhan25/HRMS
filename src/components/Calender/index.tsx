import Fullcalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function Calendar({ events }: any) {
  return (
    <div>
      <Fullcalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        allDaySlot={false}
        events={events}
        slotMinTime="09:00:00"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height={'90vh'}
      />
    </div>
  )
}

export default Calendar
