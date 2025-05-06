const daysInMonth = 31;
const calendarDiv = document.getElementById('calendar');
const eventList = document.getElementById('eventList');
const month = '05';
const year = '2025';

// إنشاء التقويم
for (let day = 1; day <= daysInMonth; day++) {
  const dayDiv = document.createElement('div');
  dayDiv.className = 'day';
  const paddedDay = day.toString().padStart(2, '0');
  const dateKey = `${year}-${month}-${paddedDay}`;
  dayDiv.textContent = day;
  dayDiv.onclick = () => showEvents(dateKey);
  calendarDiv.appendChild(dayDiv);
}

let eventsData = {};

// تحميل الأحداث من ملف JSON
fetch('/event.json')

  .then(response => response.json())
  .then(data => eventsData = data)
  .catch(error => console.error('حدث خطأ أثناء تحميل الأحداث:', error));

// عرض الأحداث لليوم المحدد
function showEvents(date) {
  eventList.innerHTML = '';
  const events = eventsData[date];
  if (events && events.length > 0) {
    events.forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'event';
      eventDiv.textContent = event;
      eventList.appendChild(eventDiv);
    });
  } else {
    eventList.textContent = 'لا توجد أحداث لهذا اليوم.';
  }
}