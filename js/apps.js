let d = document.getElementById("dayInput");
let m = document.getElementById("monthInput");
let y = document.getElementById("yearInput");
const button = document.getElementById("button");

let input = new Date(y.value, m.value - 1, d.value);
let calc = new Date();

button.addEventListener('click', () => {
    // Debug stuff
    console.log("Today's date is: " + calc.toLocaleDateString());
    console.log("The inputted date is: " + input.toLocaleDateString());

    let outputYear = calc.getFullYear() - input.getFullYear();
    let outputMonth = calc.getMonth() - input.getMonth();
    let outputDay = calc.getDate() - input.getDate();

    if (outputDay < 0) {
        outputMonth--;
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
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