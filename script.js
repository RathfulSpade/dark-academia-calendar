const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const eventsList = document.getElementById("eventsList");

/* INSERT YOUR OUTLOOK ICS LINK BELOW */
const outlookICS = "https://outlook.office365.com/owa/calendar/43476d97a64b465ab8bebef7b385d223@easternflorida.edu/a8ed891cb6c749e997d464e5e6a1c0445745595197999061924/calendar.ics";

const today = new Date();

function renderCalendar() {
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

    for(let i = 0; i < firstDay; i++){
        const blank = document.createElement("div");
        blank.classList.add("day","empty");
        calendarDays.appendChild(blank);
    }

    for(let day = 1; day <= totalDays; day++){
        const cell = document.createElement("div");
        cell.classList.add("day");
        cell.textContent = day;

        if(
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ){
            cell.classList.add("today");
        }

        calendarDays.appendChild(cell);
    }
}

function loadEvents(){
    eventsList.innerHTML = `
        <li>Add your Outlook ICS link in script.js</li>
        <li>Then events can populate here</li>
        <li>Meeting with the moon at midnight</li>
    `;
}

renderCalendar();
loadEvents();
