import { useEffect, useState } from 'react';
import './Home.css';
import bannerEps1 from './assets/banner-eps-1.jpg';
import bannerEps2 from './assets/banner-eps-2.jpg';
import bannerEps3 from './assets/banner-eps-3.jpg';
import roadSquare from './assets/road-square.jpg';

const slides = [
  { id: 1, title: 'Image 1', src: bannerEps1 },
  { id: 2, title: 'Image 2', src: bannerEps2 },
  { id: 3, title: 'Image 3', src: bannerEps3 },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="App-main">
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
      </div>

      <section className="home-content">
        <div className="home-content-logo">
          <img src={roadSquare} alt="Road Square" />
        </div>
        <h2>Road Podglifos</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt. Praesent euismod ligula vel felis sodales, non tincidunt nisl faucibus.
        </p>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 Road Podglifos. Todos os direitos reservados.</p>
        <p> Design by <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">nana boladona nois é pika </a></p>
      </footer>
    </main>
  );
}
    
export default Home;
