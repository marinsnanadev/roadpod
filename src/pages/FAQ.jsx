import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './FAQ.css';

const faqCategories = [
  {
    category: 'Sobre o podcast',
    accent: 'accent',
    items: [
      {
        question: 'Do que se trata o Road Podglifos?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt. Praesent euismod ligula vel felis sodales.',
      },
      {
        question: 'Com que frequência saem episódios novos?',
        answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.',
      },
      {
        question: 'Onde posso ouvir o podcast?',
        answer: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint.',
      },
    ],
  },
  {
    category: 'Episódios',
    accent: 'accent2',
    items: [
      {
        question: 'Qual a diferença entre os tipos de episódio (mangá, anime, especiais, fillers)?',
        answer: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.',
      },
      {
        question: 'Vocês têm episódios com spoilers marcados?',
        answer: 'Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum.',
      },
      {
        question: 'Como sugiro um tema ou arco pra vocês analisarem?',
        answer: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, ut enim ad minima veniam quis nostrum.',
      },
    ],
  },
  {
    category: 'Comunidade & Contato',
    accent: 'accent3',
    items: [
      {
        question: 'Como faço pra falar com a crew?',
        answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, excepteur sint occaecat cupidatat non proident.',
      },
      {
        question: 'Vocês fazem participações ou colabs com outros podcasts?',
        answer: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, duis aute irure dolor in reprehenderit.',
      },
      {
        question: 'Posso usar trechos dos episódios em vídeos/clipes?',
        answer: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas.',
      },
    ],
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <span className="faq-icon" aria-hidden="true">+</span>
      </button>
      <div className="faq-answer-wrapper">
        <p className="faq-answer">{item.answer}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [openKey, setOpenKey] = useState('0-0');
  const pageRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.faq-reveal',
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }
    );
  }, { scope: pageRef });

  const toggle = (key) => {
    setOpenKey((current) => (current === key ? null : key));
  };

  return (
    <main className="faq-page" ref={pageRef}>
      <div className="faq-glow faq-glow--accent" aria-hidden="true" />
      <div className="faq-glow faq-glow--accent2" aria-hidden="true" />
      <div className="faq-grid-overlay" aria-hidden="true" />

      <section className="faq-hero faq-reveal">
        <span className="faq-eyebrow">Dúvidas frequentes</span>
        <h1>FAQ</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis,
          at dignissim lacus tincidunt praesent euismod ligula vel felis sodales.
        </p>
      </section>

      <div className="faq-categories">
        {faqCategories.map((group, groupIndex) => (
          <section key={group.category} className={`faq-category faq-reveal accent-${group.accent}`}>
            <h2 className="faq-category-title">
              <span className="faq-category-dot" />
              {group.category}
            </h2>

            <div className="faq-list">
              {group.items.map((item, itemIndex) => {
                const key = `${groupIndex}-${itemIndex}`;
                return (
                  <FAQItem
                    key={key}
                    item={item}
                    isOpen={openKey === key}
                    onToggle={() => toggle(key)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="faq-cta faq-reveal">
        <h3>Não achou sua resposta?</h3>
        <p>Manda sua pergunta direto pra gente na página de contato.</p>
        <Link to="/contact" className="faq-cta-button">Falar com a crew</Link>
      </section>
    </main>
  );
}

export default FAQ;