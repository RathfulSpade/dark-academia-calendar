const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const eventsList = document.getElementById("eventsList");

/* INSERT GOOGLE ICS LINK BELOW */
const outlookICS = "https://calendar.google.com/calendar/ical/rrmiltb6a4mlkhagt2665ub2ei2o45bi%40import.calendar.google.com/public/basic.ics";

const today = new Date();
let parsedEvents = [];

function renderCalendar(){
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    monthYear.textContent = `${monthNames[month]} ${year}`;
    calendarDays.innerHTML = "";

    for(let i=0;i<firstDay;i++){
        const blank = document.createElement("div");
        blank.className = "day empty";
        calendarDays.appendChild(blank);
    }

    for(let day=1;day<=totalDays;day++){
        const cell = document.createElement("div");
        cell.className = "day";
        cell.textContent = day;

        if(day === today.getDate()){
            cell.classList.add("today");
        }

        const hasEvent = parsedEvents.some(ev=>{
            const d = new Date(ev.date);
            return d.getDate() === day &&
                   d.getMonth() === month &&
                   d.getFullYear() === year;
        });

        if(hasEvent){
            const dot = document.createElement("div");
            dot.className = "event-dot";
            cell.appendChild(dot);
        }

        calendarDays.appendChild(cell);
    }
}

async function loadEvents(){
    if(outlookICS.includes("PASTE")){
        eventsList.innerHTML = "<li>Add your Google ICS link in script.js</li>";
        renderCalendar();
        return;
    }

    try{
        const proxy = "https://api.allorigins.win/raw?url=";
        const res = await fetch(proxy + encodeURIComponent(outlookICS));
        const text = await res.text();

        const lines = text.split(/\r?\n/);

        parsedEvents = [];
        let current = {};

        lines.forEach(line=>{
            if(line.startsWith("BEGIN:VEVENT")) current = {};
            else if(line.startsWith("SUMMARY:")) current.title = line.replace("SUMMARY:","");
            else if(line.startsWith("DTSTART")) current.date = line.split(":")[1];
            else if(line.startsWith("END:VEVENT")) parsedEvents.push(current);
        });

        parsedEvents = parsedEvents
            .map(ev=>{
                let raw = ev.date;
                let formatted = raw.substring(0,4)+"-"+raw.substring(4,6)+"-"+raw.substring(6,8);
                return {title:ev.title,date:formatted};
            })
            .filter(ev=>new Date(ev.date) >= new Date())
            .slice(0,5);

        displayEvents();
        renderCalendar();

    }catch(err){
        eventsList.innerHTML = "<li>Unable to load events</li>";
        renderCalendar();
    }
}

function displayEvents(){
    eventsList.innerHTML = "";

    if(parsedEvents.length === 0){
        eventsList.innerHTML = "<li>No upcoming events</li>";
        return;
    }

    parsedEvents.forEach(ev=>{
        const li = document.createElement("li");
        const d = new Date(ev.date);

        li.textContent =
          `${d.toLocaleDateString()} • ${ev.title}`;

        eventsList.appendChild(li);
    });
}

loadEvents();
