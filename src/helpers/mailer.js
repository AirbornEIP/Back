exports.sendEmailGoogle = async function (text, subject, email) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'mathieutercan@gmail.com',
            pass: 'yrtorbfnhaqwfgap'
        }
    });
    let mailOptions = {
        from: 'Airborn <mathieutercan@gmail.com',
        to: email,
        subject: subject,
        text: text
    }
    transporter.sendMail(mailOptions, function (err, result) {
        if (err) {
            console.log(err + result);
        } else {
            console.log("email sent")
        } 
    })
}