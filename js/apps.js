let day = document.getElementById("dayInput");
let month = document.getElementById("monthInput");
let year = document.getElementById("yearInput");
const button = document.getElementById("button");
let textInput = document.getElementsByTagName("input");
const errorOutput = document.getElementsByClassName("error");
let errorOutputDay = document.getElementById("dayError");
let errorOutputMonth = document.getElementById("monthError");
let errorOutputYear = document.getElementById("yearError");

// Hide errors on page reload
for (let error of errorOutput) {
    error.style.display = 'none';
}

// Get current date
let calc = new Date();

// Check for input
for (let input of textInput) {
    input.addEventListener('input', () => {
        // clear old errors for new inputs
        for (let error of errorOutput) {
            error.style.display = 'none';
            error.textContent = "";
        }

        // Reset border colors for new inputs
        day.style.borderColor = '';
        month.style.borderColor = '';
        year.style.borderColor = '';

        // Begin the nested loop!
        if (day.value !== '') {
            const dayNumber = Number(day.value); // ensures number isnt text
            if (dayNumber < 1 || dayNumber > 31) { // Check to see if day is below range
                day.value = '';
                errorOutputDay.style.display = 'block';
                errorOutputDay.textContent = 'Day must be between 1 and 31';
                day.style.borderColor = 'var(--pri-red)';
            } else {
                if (month.value !== '') {
                    const monthNumber = Number(month.value); // ensures number isnt text
                    if (!Number.isFinite(monthNumber) || monthNumber < 1 || monthNumber > 12) { // checks to see if month is within range
                        month.value = ''
                        errorOutputMonth.style.display = 'block';
                        errorOutputMonth.textContent = 'Month must be between 1 and 12';
                        month.style.borderColor = 'var(--pri-red)';
                    } else {
                        const yearNumber = Number(year.value); // ensures number isnt text
                        const daysInMonth = new Date(yearNumber, monthNumber, 0).getDate(); // checks for day list in each month and leap year (best. variable. ever.)
                        if (dayNumber > daysInMonth) {
                            day.value = '';
                            errorOutputDay.style.display = 'block';
                            errorOutputDay.textContent = `There are only ${daysInMonth} days in month ${monthNumber}`; // fancy shmancy
                            day.style.borderColor = 'var(--pri-red)';
                        } else {
                            if (year.value !== '') {
                                if (yearNumber > new Date().getFullYear()) { // check if inputted year is greater than the current year
                                    year.value = '';
                                    errorOutputYear.style.display = 'block';
                                    errorOutputYear.textContent = 'Person must be alive today'
                                    year.style.borderColor = 'var(--pri-red)';
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}

button.addEventListener('click', () => {
    if (day.value == '') {
        errorOutputDay.style.display = 'block';
        errorOutputDay.textContent = 'Please input a day';
        day.style.borderColor = 'var(--pri-red)';
    } else if (month.value == '') {
        errorOutputMonth.style.display = 'block';
        errorOutputMonth.textContent = 'Please input a month';
        month.style.borderColor = 'var(--pri-red)';
    } else if (year.value == '') {
        errorOutputYear.style.display = 'block';
        errorOutputYear.textContent = 'Please input a year'
        year.style.borderColor = 'var(--pri-red)';
    } else {
        // ensures numbers arent text
        const yearNumber = Number(year.value);
        const monthNumber = Number(month.value);
        const dayNumber = Number(day.value);

        // Creates a date from the inputs
        let dateInput = new Date(yearNumber, monthNumber - 1, dayNumber);

        // Debug stuff
        console.log("Today's date is: " + calc.toLocaleDateString());
        console.log("The inputted date is: " + dateInput.toLocaleDateString());

        let outputYear = calc.getFullYear() - yearNumber;
        let outputMonth = calc.getMonth() - monthNumber - 1;
        let outputDay = calc.getDate() - dayNumber;

        // Handlers if calculation creates negative numbers
        if (outputDay < 0) {
            outputMonth--;
            const previousMonth = new Date(calc.getFullYear(), calc.getMonth(), 0);
            outputDay += previousMonth.getDate();
        }

        if (outputMonth < 0) {
            outputYear--;
            outputMonth += 12;
        }

        // Complete output
        document.getElementById("yearOutput").innerHTML = outputYear;
        document.getElementById("monthOutput").innerHTML = outputMonth;
        document.getElementById("dayOutput").innerHTML = outputDay;

        // Debug stuff
        console.log(outputYear + " Years");
        console.log(outputMonth + " Months");
        console.log(outputDay + " Days");
    }
});

