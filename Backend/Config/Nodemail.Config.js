require('dotenv').config()
const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth:{
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASS,
    }
})

async function verifyTransporter() {
    try {
        await transport.verify();
        console.log("server is ready to take our message");
        
    } catch (error) {
        console.log(error.message);
        
    }
}
async function sendMail(recipitentsEmail,subject,message,html) {
    try {
        await transport.sendMail({
          from: process.env.SMTP_USER,
           to:recipitentsEmail,
           subject,
           text:message,
           html:html
        })
        console.log(`mail sent successfully to${recipitentsEmail}`);
        
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports ={verifyTransporter,sendMail}