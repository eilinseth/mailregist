import nodemailer from "nodemailer"

export const sendMail = async (email:string,token:string) => {
    try{
        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            }
        })
    
        const mailOptions= {
            from : process.env.EMAIL_USER,
            to : email ,
            subject : "Verify your email",
            text : `Click the link to verify : http://localhost:3000/verify?token=${token}`
        }
    
        return transporter.sendMail(mailOptions)

    }catch(error){
        console.error ("Error sending mail",error)
        throw new Error
    }
}
