const nodemailer = require('nodemailer');

exports.mailer = async (text: string, subject: string, email: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mathieutercan@gmail.com',
            pass: 'kgpeossptbrorvyd',
        },
    });
    const mailOptions = {
        from: 'Airborn <mathieutercan@gmail.com>',
        to: email,
        subject,
        text,
    };
    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err + result);
        } else {
            console.log('email sent');
        }
    });
};
