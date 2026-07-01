import sendMail from "./mail.js";

const doc_date_res = await fetch("https://www.drrmlims.ac.in/OnlineToken/GetDates?doctorId=2145");
const res = await doc_date_res.json();

if (doc_date_res.status == 429 || doc_date_res.status != 200) 
    await sendMail("Rate limit reached");

if (res.length == 0) {
    console.log("No response came")
    process.exit(0)
}

const date = res.map((x) => x.Text).map((y) => y.split("-"))
const isDateAvail = date.map((x) => x[0] > 10).reduce((x,y) => x || y)
console.log(date)

if(isDateAvail) {
    await sendMail("Slot book karo, portal open ho gaya hai")
    console.log("mail send")
} else {
    console.log(false)
}
