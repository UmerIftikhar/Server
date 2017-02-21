var mailer = require("nodemailer");

    // Use Smtp Protocol to send Email
    var smtpTransport = mailer.createTransport("SMTP",{
        service: "Gmail",
		//host: 'smtp.yourprovider.org',		//yourprovider = > gmail
        auth: {
            user: "uiftikhar1@gmail.com",
            pass: ""
        }
    });









