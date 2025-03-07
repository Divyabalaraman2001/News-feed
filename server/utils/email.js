
const nodemailer = require('nodemailer');
require('dotenv').config();
const {  trendingNewsEmail } = require('./emailTemplate')





const sendVerificationEmail = async (recipientEmail,newsTitle,newsSummary,newsLink) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })

        const emailcontent = trendingNewsEmail(newsTitle,newsSummary,newsLink);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'new news upadted',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending  email:', error);
    }
}







module.exports = {
    sendVerificationEmail
}