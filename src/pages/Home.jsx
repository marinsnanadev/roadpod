import { useEffect, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './Home.css';
import bannerEps1 from './assets/banner-eps-1.jpg';
import bannerEps2 from './assets/banner-eps-2.jpg';
import bannerEps3 from './assets/banner-eps-3.jpg';
import roadSquare from './assets/road-square.jpg';
import githubIcon from './assets/github-icon.png';

const slides = [
  { id: 1, title: null, src: bannerEps1 },
  { id: 2, title: null, src: bannerEps2 },
  { id: 3, title: null, src: bannerEps3 },
];

function Home() {
  useDocumentTitle('Road Podglifos');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="App-main home-page">
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