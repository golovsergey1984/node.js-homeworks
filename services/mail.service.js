import nodemailer from 'nodemailer';

export const sendVerificationToken = async (email, verifyMailToken) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mavistepreport@gmail.com',
            pass: process.env.MAIL_PRIVATE_KEY
        }
    });
    const mailOptions = {
        from: 'mavistepreport@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Confirm your Email', // Subject line
        html: `<a href="http://localhost:3000/auth/verify/${verifyMailToken}" > Confirm your account</a> `
    };
    return await transporter.sendMail(mailOptions)
}

