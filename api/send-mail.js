const nodemailer = require('nodemailer');
const { validateContact } = require('./_lib/validateContact');

// Origem permitida a chamar essa function. Em produção, restrinja ao domínio
// real do site (ex: https://roadpodglifos.com); em dev, o CRA roda em localhost:3000.
const ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN || '*';

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true', // true para porta 465, false para 587/STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return cachedTransporter;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const { valid, errors, email, message } = validateContact(req.body);

  if (!valid) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP não configurado: defina SMTP_HOST, SMTP_USER e SMTP_PASS.');
    return res.status(500).json({ error: 'Serviço de e-mail não configurado.' });
  }

  const toAddress = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;

  try {
    await getTransporter().sendMail({
      from: `"Road Podglifos - Contato" <${process.env.SMTP_USER}>`,
      to: toAddress,
      replyTo: email,
      subject: `Nova mensagem de contato de ${email}`,
      text: message,
      html: `<p><strong>De:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Falha ao enviar e-mail:', error);
    return res.status(502).json({ error: 'Falha ao enviar a mensagem. Tente novamente mais tarde.' });
  }
};

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}