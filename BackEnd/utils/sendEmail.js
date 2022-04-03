const nodemailer = require("nodemailer");


const sendEmail = async (Options) =>{

    const transporter= nodemailer.createTransport({
        host: "smtp.gmail.com",  // host and port for gmail  process.env.SMTP_HOST
        port: 465,     //process.env.SMTP_PORT
        service:"gmail",  //process.env.SMTP_SERVICE  simple mail transfer protocol
        auth:{
            user:"cricdiariesofficial@gmail.com",       //process.env.SMTP_EMAIL
            pass:"San@1234"   // process.env.SMPT_PASSWORD
        }
    })

    const mailOptions= {
        from :"cricdiariesofficial@gmail.com",
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