const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const eventsList = document.getElementById("eventsList");

/* INSERT YOUR OUTLOOK ICS LINK BELOW */
const outlookICS = "PASTE-YOUR-ICS-LINK-HERE";

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