let entries = [];
let balance = 0;


//---------------------------------
// METHODS
//---------------------------------
function addEntry(entryType) {
    let entryAmount, entryNote;

    if(entryType === 'addDefault') {
        entryAmount = 50;
        const accomplishmentText = prompt("Please enter accomplisment for the day");

        if(accomplishmentText === null) {
            return;
        } else if(accomplishmentText.trim() === "") {
            alert("Using default 3 accomplisments. Good job!");
            entryNote = "Achieved daily target (1-  Punctual, 2- Study, 3- Do something extra)"
        } else {
            entryNote = accomplishmentText;
        }
    } else {
        // **********************
        // 1. get variables
        // **********************
        entryAmount = document.getElementById("entry-amount").value;
        entryNote = document.getElementById("entry-reason").value;
    }

    const isPositiveEntry = entryType.includes('add');
    if(isPositiveEntry) {
        celebrate();
    }
    

    // **********************
    // 2. store values in localStorage
    // **********************
    const entryValue = Number(entryAmount)

    entries.push({
        type: entryType,
        amount: entryValue,
        note: entryNote
    });

    localStorage.setItem("entries", JSON.stringify(entries));
    console.log(entries)

    // **********************
    // 3. calculate and update balance
    // **********************
    balance = isPositiveEntry ? balance + entryValue : balance - entryValue;
    document.getElementById("balance").textContent = "MYR " + balance;

    displayEntries();
}

function displayEntries() {

    // 1. grab entries array
    const entryList = document.getElementById("entry-list");
    entryList.innerHTML = "<h2>History</h2>";

    // 2. fill in entries array
    entries.forEach((entry, index) => {
        const item = document.createElement("p");

        const entryTypeIsPositive = entry.type.includes('add');

        const entryType = entryTypeIsPositive ? "+" : "-";
        item.style.color = entryTypeIsPositive ? "green" : "red";

        item.textContent = "#" + (index + 1) + " | " + entryType + " MYR " + entry.amount + " | " + entry.note
        entryList.appendChild(item)
    })

}

function calculateBalanceDuringFirstLoad() {

    entries.forEach((entry) => {
        balance = entry.type === "add" ? balance + entry.amount : balance - entry.amount;
    })

    document.getElementById("balance").textContent = "MYR " + balance;
}

//---------------------------------
// render stuff
//---------------------------------
const saved = localStorage.getItem("entries")

if (saved) {
    entries = JSON.parse(saved);
    calculateBalanceDuringFirstLoad();
    displayEntries();
}

//---------------------------------
// FUN STUFF
//---------------------------------
function celebrate() {
  confetti({
  particleCount: 100,  // how many confetti pieces to generate
  spread: 70,           // angle in degrees — how wide the burst fans out
  origin: { y: 0.6 }    // where on screen it starts (0.6 = 60% down from the top)
  });
}
