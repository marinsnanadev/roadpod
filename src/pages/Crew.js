import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Crew.css';
import rayPic from './assets/ray.png';
import belPic from './assets/bel.png';
import felipePic from './assets/felipe.png';
import kaikyPic from './assets/kaiky.png';
import nanaPic from './assets/nana.png';
import instaIcon from './assets/insta-icon.png'

gsap.registerPlugin(ScrollTrigger);

const crewMembers = [
  {
    name: 'Bel',
    role: 'Host/Capitão',
    photo: belPic,
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt. Praesent euismod ligula vel felis sodales, non tincidunt nisl faucibus.',
  },
  {
    name: 'Ray',
    role: 'Co-host/Cozinheira',
    photo: rayPic,
    bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
  },
  {
    name: 'Felipe',
    role: 'Navegador',
    photo: felipePic,
    bio: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
  },
  {
    name: 'Kaiky',
    role: 'Atirador',
    photo: kaikyPic,
    bio: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus itaque earum.',
  },
  {
    name: 'Nath',
    role: 'Espadachim',
    photo: null,
    bio: 'Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum hic tenetur a sapiente delectus reiciendis.',
  },
  {
    name: 'Nana',
    role: 'Social Media/Developer',
    photo: nanaPic,
    bio: 'Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum hic tenetur a sapiente delectus reiciendis.',
  },
];

function CrewCard({ member, index }) {
  const isLeft = index % 2 === 0;

  const photo = (
    <div className="crew-photo">
      {member.photo
        ? <img src={member.photo} alt={member.name} />
        : <span className="crew-photo-initials">{member.name.charAt(0)}</span>
      }
    </div>
  );

  const info = (
    <div className={`crew-info ${isLeft ? 'crew-info--left' : 'crew-info--right'}`}>
      <h2 className="crew-name">{member.name}</h2>
      <span className="crew-role">{member.role}</span>
      <p className="crew-bio">{member.bio}</p>
    </div>
  );

  return (
    <div className="crew-card" data-index={index}>
      {isLeft ? photo : info}
      {isLeft ? info : photo}
    </div>
  );
}

function Crew() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.crew-card');

    cards.forEach((card, i) => {
      const isLeft = i % 2 === 0;

      gsap.fromTo(
        card,
        { autoAlpha: 0, x: isLeft ? -70 : 70, y: 24 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main className="crew-page" ref={containerRef}>
      <h1 className="crew-heading">Crew</h1>
      <p className="credits">Artes por Kaiky Haru <a href="https://www.instagram.com/kaikyharu/" target="_blank" rel="noopener noreferrer" className="crew-instagram-link">
        <img src={instaIcon} alt="Instagram" />
      </a></p>
      <div className="crew-list">
        {crewMembers.map((member, i) => (
          <CrewCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </main>
  );
}

export default Crew;