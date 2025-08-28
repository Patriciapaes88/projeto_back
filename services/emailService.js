
const nodemailer = require('nodemailer');
require('dotenv').config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Credenciais de e-mail não configuradas corretamente.');
}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  secure: true,
  tls: {
    rejectUnauthorized: true
  }
});

async function enviarEmail(destinatario, assunto, corpoHtml) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: assunto,
    html: corpoHtml
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email enviado para ${destinatario}`);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}

module.exports = { enviarEmail };

