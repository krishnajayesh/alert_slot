import sendMail from "./mail.js";

const TARGET_DATE = "30-09-2026";
const URL = "https://www.drrmlims.ac.in/OnlineToken/GetDates?doctorId=2145";

try {
  const response = await fetch(URL);

  if (!response.ok) {
    console.error(`Request failed with status: ${response.status}`);
    if (response.status === 429) {
      await sendMail("Rate limit reached");
    }
    process.exit(1);
  }

  const res = await response.json();

  if (!Array.isArray(res) || res.length === 0) {
    console.log("No dates available");
    process.exit(0);
  }

  // Check if target date exists in the response
  const isDateAvail = res.some((slot) => slot.Text === TARGET_DATE);

  console.log("Available dates:", res.map((s) => s.Text));
  console.log(`Is ${TARGET_DATE} available:`, isDateAvail);

  if (isDateAvail) {
    await sendMail("Slot book karo, portal open ho gaya hai");
    console.log("Mail sent successfully");
  } else {
    console.log(`Target date ${TARGET_DATE} not found.`);
  }
} catch (error) {
  console.error("Error during execution:", error);
}
