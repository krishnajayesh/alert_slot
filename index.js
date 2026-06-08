import sendMail from "./mail.js";

await sendMail("Just for testing")

const doc_date_res = await fetch("https://www.drrmlims.ac.in/OnlineToken/GetDates?doctorId=2145");
const res = await doc_date_res.json();

if (doc_date_res.status == 429 || doc_date_res.status != 200) 
    await sendMail("Rate limit reached");


const date = res.map((x) => x.Text).map((y) => y.split("-"))
console.log(date)
const day1 = date[0][0] > 10 
const day2 = date[1][0] > 10

const isDateAvail = day1 | day2

if(isDateAvail) {
    await sendMail("Slot book karo, portal open ho gaya hai")
    console.log("mail send")
} else {
    console.log(false)
}

