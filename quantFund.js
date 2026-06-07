let entries = [];
let balance = 0;

function addEntry(entryType) {
    // 1. get variables
    const entryAmount = document.getElementById("entry-amount").value;
    const entryNote = document.getElementById("entry-reason").value;

    // 2. store values in localStorage
    const entryValue = Number(entryAmount)

    entries.push({
        type: entryType,
        amount: entryValue,
        note: entryNote
    });

    localStorage.setItem("entries", JSON.stringify(entries));
    console.log(entries)

    // 3. calculate and update balance
    balance = entryType === 'add' ? balance + entryValue : balance - entryValue;
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
        const entryType = entry.type === "add" ? "+" : "-";
        item.style.color = entry.type === "add" ? "green" : "red";

        item.textContent = "#" + (index + 1) + " | " + entryType + " MYR " + entry.amount + " | " + entry.note
        entryList.appendChild(item)
    })

}

const saved = localStorage.getItem("entries")

if (saved) {
    entries = JSON.parse(saved);
    calculateBalanceDuringFirstLoad();
    displayEntries();
}

function calculateBalanceDuringFirstLoad() {

    entries.forEach((entry) => {
        balance = entry.type === "add" ? balance + entry.amount : balance - entry.amount;
    })

    document.getElementById("balance").textContent = "MYR " + balance;
}