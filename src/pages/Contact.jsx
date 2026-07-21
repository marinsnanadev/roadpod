import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './Contact.css';
import instaIcon from './assets/insta-icon.png';
import twitterIcon from './assets/twitter-icon.png';
import spotifyIcon from './assets/spotify-icon.png';
import blueskyIcon from './assets/bluesky-icon.png';

const socialMedia = [
  { name: 'Instagram', url: 'https://www.instagram.com/roadpodglifos/', icon: instaIcon, accent: '#e1306c' },
  { name: 'Twitter (X)', url: 'https://twitter.com/roadpodglifos', icon: twitterIcon, accent: '#1d9bf0' },
  { name: 'Spotify', url: 'https://open.spotify.com/show/1i6oVgf1NiEJCPhxrpsB7Z?si=c98091d1149948fe', icon: spotifyIcon, accent: '#1db954' },
  { name: 'Bluesky', url: 'https://bsky.app/profile/roadpodglifos.bsky.social', icon: blueskyIcon, accent: '#3a8bff' },
];

const MESSAGE_LIMIT = 500;

function Contact() {
  useDocumentTitle('Road Podglifos | Contato');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error
  const [copiedSocial, setCopiedSocial] = useState(null);
  const pageRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.contact-reveal',
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
      }
    );
  }, { scope: pageRef });

  const sendMail = async (event) => {
    event.preventDefault();
    setStatus('');

    const emailValue = email.trim();
    const messageValue = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue || !messageValue) {
      setStatus('Por favor, preencha o e-mail e a mensagem.');
      setSubmitState('error');
      return;
    }

    if (!emailPattern.test(emailValue)) {
      setStatus('Por favor, informe um e-mail válido.');
      setSubmitState('error');
      return;
    }

    setSubmitState('loading');

    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, message: messageValue }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Erro no servidor');
      }

      setEmail('');
      setMessage('');
      setStatus('Mensagem enviada com sucesso! Te respondemos em breve.');
      setSubmitState('success');
    } catch (error) {
      setStatus(error.message || 'Falha ao enviar. Tente novamente em instantes.');
      setSubmitState('error');
    } finally {
      setTimeout(() => setSubmitState((current) => (current === 'loading' ? 'idle' : current)), 0);
    }
  };

  const handleCopy = async (social) => {
    try {
      await navigator.clipboard.writeText(social.url);
      setCopiedSocial(social.name);
      setTimeout(() => setCopiedSocial(null), 1800);
    } catch (error) {
      // Clipboard indisponível (ex: contexto não seguro); ignora silenciosamente.
    }
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <main className="contact-page" ref={pageRef}>
      <div className="contact-glow contact-glow--accent2" aria-hidden="true" />
      <div className="contact-glow contact-glow--accent" aria-hidden="true" />
      <div className="contact-grid-overlay" aria-hidden="true" />

      <section className="contact-layout">
        <div className="contact-info contact-reveal">
          <span className="contact-eyebrow">Fale com a gente</span>
          <h3>Contact</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt. Praesent euismod ligula vel felis sodales, non tincidunt nisl faucibus.
          </p>

          <div className="contact-meta">
            <div className="contact-meta-item">
              <span className="contact-meta-dot" />
              Respondemos em até 48h
            </div>
            <div className="contact-meta-item">
              <span className="contact-meta-dot contact-meta-dot--alt" />
              Sugestões de pauta são bem-vindas
            </div>
          </div>
        </div>

        <form className="contact-form contact-reveal" onSubmit={sendMail}>
          <div className={`field-group ${email ? 'has-value' : ''} ${email && !isEmailValid ? 'field-invalid' : ''}`}>
            <input
              id="contact-email"
              type="email"
              placeholder=" "
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="contact-email">Seu e-mail</label>
            {email && (
              <span className={`field-indicator ${isEmailValid ? 'valid' : 'invalid'}`}>
                {isEmailValid ? '✓' : '!'}
              </span>
            )}
          </div>

          <div className={`field-group ${message ? 'has-value' : ''}`}>
            <textarea
              id="contact-message"
              placeholder=" "
              value={message}
              onChange={(event) => setMessage(event.target.value.slice(0, MESSAGE_LIMIT))}
              rows={6}
            />
            <label htmlFor="contact-message">Sua mensagem</label>
            <span className="char-counter">{message.length}/{MESSAGE_LIMIT}</span>
          </div>

          <button type="submit" className={`submit-button state-${submitState}`} disabled={submitState === 'loading'}>
            <span className="submit-button-label">
              {submitState === 'loading' && 'Enviando...'}
              {submitState === 'success' && 'Enviado ✓'}
              {(submitState === 'idle' || submitState === 'error') && 'Enviar mensagem'}
            </span>
            {submitState === 'loading' && <span className="submit-spinner" />}
          </button>

          {status && (
            <p className={`contact-status status-${submitState}`} role="status" aria-live="polite">
              {status}
            </p>
          )}
        </form>
      </section>

      <footer className="contact-footer contact-reveal">
        <div className="contact-footer-heading">
          <h3>Redes sociais</h3>
          <p className="contact-footer-subtitle">Clique pra abrir, ou segure pra copiar o link</p>
        </div>
        <div className="contact-social-grid">
          {socialMedia.map((social) => (
            <div key={social.name} className="contact-social-card-wrapper" style={{ '--brand-color': social.accent }}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-card"
                aria-label={social.name}
              >
                <div className="contact-social-icon">
                  <img src={social.icon} alt="" />
                </div>
                <span className="contact-social-name">{social.name}</span>
              </a>
              <button
                type="button"
                className="contact-social-copy"
                onClick={() => handleCopy(social)}
                aria-label={`Copiar link do ${social.name}`}
              >
                {copiedSocial === social.name ? 'Copiado!' : 'Copiar link'}
              </button>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}

export default Contact;