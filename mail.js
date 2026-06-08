import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "krishna.jayesh1505@gmail.com",
        pass: process.env.pass
    }
})

export default async function sendMail(text_to_send) {
    try {
      await transporter.verify();
      console.log("Server is ready to take our messages");
    } catch (err) {
      console.error("Verification failed:", err);
    }

    try {
        const info = await transporter.sendMail({
            from: "krishna.jayesh1505@gmail.com",
            to: ["jayesh152005@gmail.com", "jiteshsanskrit@gmail.com"],
            subject: text_to_send,
            text: "Hello world?",
            html: "<b>Slot open</b> <p>Apply here: <a>https://www.drrmlims.ac.in/OnlineToken</a></p>",
        });

        console.log("Message sent: %s", info.messageId);
        return "success"
        } catch (err) {
        console.error("Error while sending mail:", err);
        return "failed"
        }
    
}


