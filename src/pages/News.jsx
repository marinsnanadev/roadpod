import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './News.css';

const newsList = [
  {
    id: 'news-12',
    title: 'Lorem ipsum dolor sit amet, novo arco confirmado pra próxima temporada',
    excerpt: 'Consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt praesent euismod ligula vel felis sodales.',
    date: '18 Jul 2026',
    category: 'Anúncios',
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula turpis nec urna facilisis, at dignissim lacus tincidunt praesent euismod ligula vel felis sodales, non tincidunt nisl faucibus.',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.',
      'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est omnis dolor repellendus.',
    ],
    gallery: ['Imagem principal da matéria', 'Foto extra 1', 'Foto extra 2'],
  },
  {
    id: 'news-11',
    title: 'Bastidores: como gravamos o episódio especial de aniversário',
    excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo.',
    date: '11 Jul 2026',
    category: 'Bastidores',
    body: [
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto.',
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.',
    ],
    gallery: ['Foto do estúdio', 'Making of'],
  },
  {
    id: 'news-10',
    title: 'O que o último capítulo do mangá muda pra teoria da crew',
    excerpt: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',
    date: '04 Jul 2026',
    category: 'Mangá & Anime',
    body: [
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ut enim ad minima veniam quis nostrum exercitationem.',
    ],
    gallery: ['Print do capítulo', 'Comparação mangá x anime'],
  },
  {
    id: 'news-9',
    title: 'Road Podglifos chega às 500 mil reproduções — obrigado, tripulação!',
    excerpt: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
    date: '27 Jun 2026',
    category: 'Anúncios',
    body: [
      'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est omnis dolor repellendus.',
      'Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum hic tenetur a sapiente.',
    ],
    gallery: ['Print da conquista', 'Comemoração da crew'],
  },
  {
    id: 'news-8',
    title: 'Nova arte de capa: processo criativo com a Kaiky Haru',
    excerpt: 'Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae.',
    date: '20 Jun 2026',
    category: 'Bastidores',
    body: [
      'Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum hic tenetur a sapiente delectus.',
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.',
    ],
    gallery: ['Esboço inicial', 'Arte finalizada'],
  },
  {
    id: 'news-7',
    title: 'Análise: a temporada do anime está seguindo o ritmo do mangá?',
    excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.',
    date: '13 Jun 2026',
    category: 'Mangá & Anime',
    body: [
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.',
    ],
    gallery: ['Linha do tempo dos arcos'],
  },
  {
    id: 'news-6',
    title: 'Enquete: qual arco vocês querem que a gente reanalise em episódio especial?',
    excerpt: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem.',
    date: '06 Jun 2026',
    category: 'Anúncios',
    body: [
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur at vero eos.',
      'Et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
    ],
    gallery: ['Banner da enquete'],
  },
  {
    id: 'news-5',
    title: 'Bastidores: trocamos de estúdio de gravação, confira o setup novo',
    excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.',
    date: '30 Mai 2026',
    category: 'Bastidores',
    body: [
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.',
      'Deserunt mollit anim id est laborum ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur.',
    ],
    gallery: ['Setup novo', 'Bastidores da mudança'],
  },
  {
    id: 'news-4',
    title: 'Cinco teorias da comunidade que acertamos em cheio esse ano',
    excerpt: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ut enim.',
    date: '23 Mai 2026',
    category: 'Mangá & Anime',
    body: [
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ut enim ad minima veniam quis nostrum exercitationem ullam.',
      'Corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.',
    ],
    gallery: ['Recorte das teorias'],
  },
];

const routeFilterMap = {
  all: 'Todas',
  anuncios: 'Anúncios',
  'manga-anime': 'Mangá & Anime',
  bastidores: 'Bastidores',
};

const filters = ['Todas', 'Anúncios', 'Mangá & Anime', 'Bastidores'];

const categoryStyleMap = {
  Anúncios: 'anuncios',
  'Mangá & Anime': 'manga',
  Bastidores: 'bastidores',
};

function ImagePlaceholder({ label }) {
  return (
    <div className="news-image-placeholder" role="img" aria-label={label}>
      <span className="news-image-placeholder-icon" aria-hidden="true">🖼</span>
      <span className="news-image-placeholder-text">{label}</span>
    </div>
  );
}

function News() {
  const { newsType } = useParams();
  const defaultFilter = routeFilterMap[newsType] || 'Todas';
  const [selectedCategory, setSelectedCategory] = useState(defaultFilter);
  const [openArticleId, setOpenArticleId] = useState(null);
  const detailRef = useRef(null);

  useDocumentTitle(`Road Podglifos | Notícias${selectedCategory !== 'Todas' ? ` — ${selectedCategory}` : ''}`);

  useEffect(() => {
    setSelectedCategory(defaultFilter);
  }, [defaultFilter]);

  const [featured, ...rest] = newsList;
  const allArticlesById = Object.fromEntries(newsList.map((item) => [item.id, item]));
  const openArticle = openArticleId ? allArticlesById[openArticleId] : null;

  const visibleNews = selectedCategory === 'Todas'
    ? rest
    : rest.filter((item) => item.category === selectedCategory);

  const openDetail = (id) => {
    setOpenArticleId(id);
    // Espera o painel renderizar antes de rolar até ele.
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const closeDetail = () => setOpenArticleId(null);

  return (
    <main className="news-page">
      <div className="news-ambient" aria-hidden="true" />

      <section className="news-content" aria-labelledby="news-title">
        <header className="news-hero">
          <p className="news-eyebrow">ROAD PODGLIFOS / MURAL DA TRIPULAÇÃO</p>
          <h1 id="news-title">Notícias</h1>
          <p className="news-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Anúncios, bastidores e tudo que rola no
            universo do mangá e do anime, direto da crew pra você.
          </p>
        </header>

        <article className="news-featured" aria-label="Notícia em destaque">
          <ImagePlaceholder label="Imagem de destaque" />
          <div className="news-featured-copy">
            <span className={`news-badge badge-${categoryStyleMap[featured.category] || 'anuncios'}`}>{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="news-featured-meta">
              <span>{featured.date}</span>
              <button type="button" className="news-read-more" onClick={() => openDetail(featured.id)}>
                {openArticleId === featured.id ? 'Lendo agora ✓' : 'Ler matéria completa'}
              </button>
            </div>
          </div>
        </article>

        <section className="news-library" aria-labelledby="library-heading">
          <div className="news-library-topline">
            <div>
              <p className="section-kicker">EXPLORE O MURAL</p>
              <h2 id="library-heading">{selectedCategory === 'Todas' ? 'Todas as notícias' : selectedCategory}</h2>
            </div>
            <span className="news-count">{visibleNews.length} matéria{visibleNews.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="news-filter-buttons" aria-label="Filtrar notícias">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-button ${selectedCategory === filter ? 'active' : ''}`}
                onClick={() => setSelectedCategory(filter)}
                aria-pressed={selectedCategory === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          {visibleNews.length ? (
            <div className="news-grid">
              {visibleNews.map((item) => (
                <article className={`news-card ${openArticleId === item.id ? 'is-open' : ''}`} key={item.id}>
                  <ImagePlaceholder label="Imagem da notícia" />
                  <div className="news-card-body">
                    <span className={`news-badge badge-${categoryStyleMap[item.category] || 'anuncios'}`}>{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <div className="news-card-meta">
                      <span>{item.date}</span>
                      <button type="button" className="news-read-more news-read-more--ghost" onClick={() => openDetail(item.id)}>
                        {openArticleId === item.id ? 'Lendo agora ✓' : 'Ler mais'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="news-empty" role="status">
              <p>Nenhuma notícia encontrada nessa categoria.</p>
              <button type="button" onClick={() => setSelectedCategory('Todas')}>Ver todas as notícias</button>
            </div>
          )}
        </section>

        {openArticle && (
          <section className="news-detail" aria-labelledby="news-detail-title" ref={detailRef}>
            <div className="news-detail-heading">
              <div>
                <p className="news-detail-kicker">LENDO AGORA</p>
                <span className={`news-badge badge-${categoryStyleMap[openArticle.category] || 'anuncios'}`}>{openArticle.category}</span>
              </div>
              <button type="button" className="news-detail-close" onClick={closeDetail} aria-label="Fechar matéria">
                Fechar ×
              </button>
            </div>

            <h2 id="news-detail-title">{openArticle.title}</h2>
            <span className="news-detail-date">{openArticle.date}</span>

            <div className="news-detail-gallery">
              {(openArticle.gallery || ['Imagem da matéria']).map((label) => (
                <ImagePlaceholder key={label} label={label} />
              ))}
            </div>

            <div className="news-detail-body">
              {openArticle.body.map((paragraph, index) => (
                <p key={`${openArticle.id}-p-${index}`}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        <section className="news-newsletter" aria-label="Inscreva-se para novidades">
          <div className="news-newsletter-copy">
            <h3>Não perca nenhuma novidade</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit — avisos de episódios e notícias direto no seu e-mail.</p>
          </div>
          <a href="/contact" className="news-newsletter-button">Falar com a crew</a>
        </section>
      </section>
    </main>
  );
}

export default News;
