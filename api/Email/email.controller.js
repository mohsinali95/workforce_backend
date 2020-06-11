




var nodemailer = require('nodemailer');
const { authEmailConfig } = require("../../config/config")
var sendEmail = require("@sendgrid/mail")

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: authEmailConfig,
    tls: {
        rejectUnauthorized: false
    }
});
// sendEmail.setApiKey(authEmailConfig.apiKey)
var mailOptionsHtml = {
    to: 'nomii0900@gmail.com',
    from: "no-reply@mmcgbl.ca",
    html: '',
    // template_id: 'd-a41fade473754377bb942c491d388392',
};
var mailOptionstext = {
    from: 'aug.mohsin15@gmail.com',
    to: [],
    subject: '',
    message: '',
    text: ''
};

module.exports = {
    host: "159.65.139.197",
    sendEmail: (to, subject, body) => {
        return new Promise((reslove, reject) => {
            mailOptionsHtml.to = to
            mailOptionsHtml.subject = subject
            mailOptionsHtml.html = body
            transporter.sendMail(mailOptionsHtml,(error, info)=>{
                if (error) {
                   
                  reject(error)
                } else {
                 reslove(info)
                }
              });
        })
    }
}