import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './Home.css';
import bannerEps1 from './assets/banner-eps-1.jpg';
import bannerEps2 from './assets/banner-eps-2.jpg';
import bannerEps3 from './assets/banner-eps-3.jpg';
import roadSquare from './assets/road-square.jpg';
import githubIcon from './assets/github-icon.png';
import belPic from './assets/bel.png';
import rayPic from './assets/ray.png';
import felipePic from './assets/felipe.png';
import kaikyPic from './assets/kaiky.png';
import nanaPic from './assets/nana.png';
import instaIcon from './assets/insta-icon.png';
import twitterIcon from './assets/twitter-icon.png';
import spotifyIcon from './assets/spotify-icon.png';
import blueskyIcon from './assets/bluesky-icon.png';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { id: 1, title: null, src: bannerEps1 },
  { id: 2, title: null, src: bannerEps2 },
  { id: 3, title: null, src: bannerEps3 },
];

const episodesPreview = [
  { number: '56', title: 'Episódio 56', type: 'Análise do mangá', isLatest: true },
  { number: '55', title: 'Episódio 55', type: 'Análise do mangá' },
  { number: '54', title: 'Episódio 54', type: 'Análise do mangá' },
  { number: '43', title: 'Episódio 43', type: 'Análise do anime' },
];

const newsPreview = [
  {
    category: 'Anúncios',
    title: 'Lorem ipsum dolor sit amet, novo arco confirmado pra próxima temporada',
    excerpt: 'Consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt.',
    date: '18 Jul 2026',
  },
  {
    category: 'Bastidores',
    title: 'Como gravamos o episódio especial de aniversário',
    excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    date: '11 Jul 2026',
  },
  {
    category: 'Mangá & Anime',
    title: 'O que o último capítulo muda pra teoria da crew',
    excerpt: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
    date: '04 Jul 2026',
  },
];

const crewPreview = [
  { name: 'Bel', role: 'Host/Capitão', photo: belPic },
  { name: 'Ray', role: 'Co-host/Cozinheira', photo: rayPic },
  { name: 'Felipe', role: 'Navegador', photo: felipePic },
  { name: 'Kaiky', role: 'Atirador', photo: kaikyPic },
  { name: 'Nana', role: 'Social Media/Dev', photo: nanaPic },
];

const faqPreview = [
  {
    question: 'Do que se trata o Road Podglifos?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt.',
  },
  {
    question: 'Com que frequência saem episódios novos?',
    answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
  },
  {
    question: 'Onde posso ouvir o podcast?',
    answer: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
  },
];

const socialMedia = [
  { name: 'Instagram', url: 'https://www.instagram.com/roadpodglifos/', icon: instaIcon, accent: '#e1306c' },
  { name: 'Twitter (X)', url: 'https://twitter.com/roadpodglifos', icon: twitterIcon, accent: '#1d9bf0' },
  { name: 'Spotify', url: 'https://open.spotify.com/show/1i6oVgf1NiEJCPhxrpsB7Z?si=c98091d1149948fe', icon: spotifyIcon, accent: '#1db954' },
  { name: 'Bluesky', url: 'https://bsky.app/profile/roadpodglifos.bsky.social', icon: blueskyIcon, accent: '#3a8bff' },
];

function ImagePlaceholder({ label }) {
  return (
    <div className="home-image-placeholder" role="img" aria-label={label}>
      <span className="home-image-placeholder-icon" aria-hidden="true">🖼</span>
      <span className="home-image-placeholder-text">{label}</span>
    </div>
  );
}

function Home() {
  useDocumentTitle('Road Podglifos');
  const [activeIndex, setActiveIndex] = useState(0);
  const pageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.home-reveal');

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: pageRef });

  return (
    <main className="App-main home-page" ref={pageRef}>
      <div className="home-glow home-glow--accent" aria-hidden="true" />
      <div className="home-glow home-glow--accent2" aria-hidden="true" />
      <div className="home-grid-overlay" aria-hidden="true" />

      <div className="all-episodes-carousel">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === activeIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.src})` }}
          >
            <span className="carousel-title">{slide.title}</span>
          </div>
        ))}
        <div className="carousel-dots">
          {slides.map((slide, index) => (
            <span
              key={slide.id}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <section className="home-content">
        <div className="home-content-logo">
          <img src={roadSquare} alt="Road Square" />
        </div>
        <div className="home-content-text">
          <span className="home-content-eyebrow">Podcast • Mangá & Anime</span>
          <h2>Road Podglifos</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt. Praesent euismod ligula vel felis sodales, non tincidunt nisl faucibus.
          </p>
        </div>
      </section>

      {/* ── Episódios ── */}
      <section className="home-section home-reveal" aria-labelledby="home-episodes-title">
        <div className="home-section-topline">
          <div>
            <p className="home-section-kicker">NO AR</p>
            <h2 id="home-episodes-title">Últimos episódios</h2>
          </div>
          <Link to="/episodes/all" className="home-section-link">Ver todos os episódios →</Link>
        </div>
        <p className="home-section-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Um catálogo pra revisitar cada arco, teoria e desvio de rota.
        </p>

        <div className="home-episodes-grid">
          {episodesPreview.map((episode) => (
            <article key={episode.number} className={`home-episode-card ${episode.isLatest ? 'is-latest' : ''}`}>
              {episode.isLatest && <span className="home-episode-flag">NOVO</span>}
              <span className="home-episode-number">{episode.number}</span>
              <div className="home-episode-info">
                <span className="home-episode-type">{episode.type}</span>
                <h3>{episode.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Notícias ── */}
      <section className="home-section home-reveal" aria-labelledby="home-news-title">
        <div className="home-section-topline">
          <div>
            <p className="home-section-kicker">MURAL DA TRIPULAÇÃO</p>
            <h2 id="home-news-title">Notícias</h2>
          </div>
          <Link to="/news/all" className="home-section-link">Ver todas as notícias →</Link>
        </div>
        <p className="home-section-description">
          Anúncios, bastidores e tudo que rola no universo do mangá e do anime, direto da crew pra você.
        </p>

        <div className="home-news-grid">
          {newsPreview.map((item) => (
            <article className="home-news-card" key={item.title}>
              <ImagePlaceholder label="Imagem da notícia" />
              <div className="home-news-card-body">
                <span className="home-news-badge">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <span className="home-news-date">{item.date}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Crew ── */}
      <section className="home-section home-reveal" aria-labelledby="home-crew-title">
        <div className="home-section-topline">
          <div>
            <p className="home-section-kicker">QUEM FAZ ACONTECER</p>
            <h2 id="home-crew-title">Crew</h2>
          </div>
          <Link to="/crew" className="home-section-link">Conhecer a crew →</Link>
        </div>
        <p className="home-section-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt.
        </p>

        <div className="home-crew-grid">
          {crewPreview.map((member, index) => (
            <Link
              to="/crew"
              className="home-crew-card"
              key={member.name}
              style={{ '--stagger': index % 2 === 1 ? 1 : 0 }}
            >
              <img src={member.photo} alt={member.name} className="home-crew-photo" />
              <div className="home-crew-card-overlay">
                <span className="home-crew-name">{member.name}</span>
                <span className="home-crew-role">{member.role}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="home-section home-reveal" aria-labelledby="home-faq-title">
        <div className="home-section-topline">
          <div>
            <p className="home-section-kicker">DÚVIDAS FREQUENTES</p>
            <h2 id="home-faq-title">FAQ</h2>
          </div>
          <Link to="/faq" className="home-section-link">Ver todas as perguntas →</Link>
        </div>

        <div className="home-faq-list">
          {faqPreview.map((item) => (
            <div className="home-faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contato / Redes sociais ── */}
      <section className="home-section home-reveal" aria-labelledby="home-contact-title">
        <div className="home-section-topline">
          <div>
            <p className="home-section-kicker">FALE COM A GENTE</p>
            <h2 id="home-contact-title">Contato</h2>
          </div>
          <Link to="/contact" className="home-section-link">Ir para contato →</Link>
        </div>
        <p className="home-section-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sugestões de pauta são sempre bem-vindas — respondemos em até 48h.
        </p>

        <div className="home-social-grid">
          {socialMedia.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="home-social-card"
              style={{ '--brand-color': social.accent }}
            >
              <div className="home-social-icon">
                <img src={social.icon} alt="" />
              </div>
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 Road Podglifos. Todos os direitos reservados.</p>
        <p className="home-footer-credit">
          Design by{' '}
          <a href="https://github.com/marinsnanadev" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="" className="home-footer-github-icon" />
            Nana Marins
          </a>
        </p>
      </footer>
    </main>
  );
}

export default Home;
