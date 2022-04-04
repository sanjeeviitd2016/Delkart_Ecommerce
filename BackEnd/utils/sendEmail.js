const nodemailer = require("nodemailer");


const sendEmail = async (Options) =>{

    const transporter= nodemailer.createTransport({
        host: "smtp.gmail.com",  // host and port for gmail  process.env.SMTP_HOST
        port: 465,     //process.env.SMTP_PORT
        service:"gmail",  //process.env.SMTP_SERVICE  simple mail transfer protocol
        auth:{
            user:process.env.SMTP_EMAIL ,
            pass: process.env.SMPT_PASSWORD
        }
    })

    const mailOptions= {
        from :process.env.SMTP_EMAIL,
        to : Options.email,
        subject: Options.subject,
        text: Options.message
    }

    // transporter.sendMail(mailOptions,()=>{
    //     console.log("mail has been sent")
    // })
    await transporter.sendMail(mailOptions)

}

module.exports= sendEmail;