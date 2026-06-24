import { useState } from 'react';
import './Contact.css';

const socialMedia = [
  { name: 'Instagram', url: 'https://www.instagram.com/roadpodglifos/' },
  { name: 'Twitter (X)', url: 'https://twitter.com/roadpodglifos' },
  { name: 'Spotify', url: 'https://open.spotify.com/show/1i6oVgf1NiEJCPhxrpsB7Z?si=c98091d1149948fe' },
  { name: 'Bluesky', url: 'https://bsky.app/profile/roadpodglifos.bsky.social' },
];

function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMail = async (event) => {
    event.preventDefault();
    setStatus('');

    const emailValue = email.trim();
    const messageValue = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue || !messageValue) {
      setStatus('Por favor, preencha o e-mail e a mensagem.');
      return;
    }

    if (!emailPattern.test(emailValue)) {
      setStatus('Por favor, informe um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://example.com/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (!response.ok) {
        throw new Error('Erro no servidor');
      }

      setEmail('');
      setMessage('');
      setStatus('Mensagem enviada com sucesso!');
    } catch (error) {
      setStatus('Falha ao enviar. Substitua a URL pelo seu endpoint de e-mail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <h1>Contato</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt. Praesent euismod ligula vel felis sodales, non tincidunt nisl faucibus.</p>
      </section>

      <section className="contact-form-section">
        <form className="contact-form" onSubmit={sendMail}>
          <label htmlFor="contact-email">Seu e-mail</label>
          <input
            id="contact-email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="contact-message">Sua mensagem</label>
          <textarea
            id="contact-message"
            placeholder="Escreva sua mensagem aqui..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={6}
          />

          <button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? 'Enviando...' : 'Enviar mensagem'}
          </button>

          {status && (
            <p className="contact-status" role="status" aria-live="polite">
              {status}
            </p>
          )}
        </form>
      </section>

      <footer className="contact-footer">
        <div className="contact-footer-heading">
          <h2>Redes sociais</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt. Praesent euismod ligula vel felis sodales, non tincidunt nisl faucibus.</p>
        </div>
        <div className="contact-social-grid">
          {socialMedia.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-card"
            >
              <div className="contact-social-icon">{social.name.split(' ')[0]}</div>
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}

export default Contact;
