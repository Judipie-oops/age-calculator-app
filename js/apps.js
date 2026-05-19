let d = document.getElementById("dayInput");
let m = document.getElementById("monthInput");
let y = document.getElementById("yearInput");
const button = document.getElementById("button");
let textInput = document.getElementsByTagName("input");
const errorOutput = document.getElementsByTagName("h3");
let errorOutputDay = document.getElementById("dayError");
let errorOutputMonth = document.getElementById("monthError");
let errorOutputYear = document.getElementById("yearError");
errorOutput.style.display = 'none';

let calc = new Date();

for (let input of textInput) {
    input.addEventListener('input', () => {
        if (d.value !== '' && d.value < 1) {
            errorOutput.style.display = 'none';
            d.value = 1;
            errorOutputDay.style.display = 'block';
        }
    });
}

button.addEventListener('click', () => {
    let dateInput = new Date(y.value, m.value - 1, d.value);
    // Debug stuff
    console.log("Today's date is: " + calc.toLocaleDateString());
    console.log("The inputted date is: " + dateInput.toLocaleDateString());

    let outputYear = calc.getFullYear() - y.value;
    let outputMonth = calc.getMonth() - m.value - 1;
    let outputDay = calc.getDate() - d.value;

    if (outputDay < 0) {
        outputMonth--;
        const previousMonth = new Date(calc.getFullYear(), calc.getMonth(), 0);
        outputDay += previousMonth.getDate();
    }

    if (outputMonth < 0) {
        outputYear--;
        outputMonth += 12;
    }

    document.getElementById("yearOutput").innerHTML = outputYear;
    document.getElementById("monthOutput").innerHTML = outputMonth;
    document.getElementById("dayOutput").innerHTML = outputDay;

    // Debug stuff
    console.log(outputYear + " Years");
    console.log(outputMonth + " Months");
    console.log(outputDay + " Days");
});