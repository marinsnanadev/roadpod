import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AllEpisodes.css';

const episodeList = [
  ['55', 'https://open.spotify.com/embed/episode/2J8WaRZdd2xyhILaGnlcpa?utm_source=generator&theme=0&si=59b593e4e6d1458f', 'Análise do mangá'],
  ['54', 'https://open.spotify.com/embed/episode/5czxbA5hDL6ECJN9Mt5caP?utm_source=generator&si=99505446dd2b4fc0', 'Análise do mangá'],
  ['53', 'https://open.spotify.com/embed/episode/1KcLDcgiqTR7oizPQQAtCc?utm_source=generator&theme=0&si=6b33ad693d0f43d6', 'Análise do mangá'],
  ['52', 'https://open.spotify.com/embed/episode/7N2UA3LoPCdWLHy939b6XJ?utm_source=generator&si=f215518a887f4146', 'Análise do mangá'],
  ['51', 'https://open.spotify.com/embed/episode/1xdhxzZh8sW5soc6PLm3xT?utm_source=generator&theme=0&si=4e9f1f767b374e18', 'Análise do mangá'],
  ['50', 'https://open.spotify.com/embed/episode/48CqhmtucsDsshsYTVj2MK?utm_source=generator&si=7f43feeb62374b5c', 'Análise do mangá'],
  ['49', 'https://open.spotify.com/embed/episode/7HxhUwyhl5DnrIsnxpUHUS?utm_source=generator&si=b1a52fa90d7b4727', 'Análise do mangá'],
  ['48', 'https://open.spotify.com/embed/episode/5ws1oYNAwdt9pQEI2lw9rv?utm_source=generator&si=dc1df452abda4512', 'Análise do mangá'],
  ['47', 'https://open.spotify.com/embed/episode/4pjUQrX38EM01rilNGD8FB?utm_source=generator&theme=0&si=bc040c875733428f', 'Análise do mangá'],
  ['46', 'https://open.spotify.com/embed/episode/5Yii6guH6Ms0D0s02LJkRe?utm_source=generator&si=0ea0c600ef144b88', 'Análise do mangá'],
  ['45', 'https://open.spotify.com/embed/episode/6CGld40TyuHRB1yce48fng?utm_source=generator&theme=0&si=a575ebe8d98c4397', 'Análise do mangá'],
  ['44', 'https://open.spotify.com/embed/episode/6fQzKLQ5kVEkBFkTNmdnNv?utm_source=generator&si=8a91781d47504e47', 'Episódios especiais'],
  ['43', 'https://open.spotify.com/embed/episode/2swMofecDKuTxf7cXuSD4y?utm_source=generator&theme=0&si=f01eb5f21e3e4fe3', 'Análise do anime'],
  ['42', 'https://open.spotify.com/embed/episode/2RedG35B2PgmTJqADwQST5?utm_source=generator&si=2bba92f0928a4e14', 'Análise do mangá'],
  ['41', 'https://open.spotify.com/embed/episode/3O1zdJRWJjVHcHVprWe3Po?utm_source=generator&theme=0&si=7fe736a900764e33', 'Episódios especiais'],
  ['40', 'https://open.spotify.com/embed/episode/1f1Wge2h1jyTiyh3iFSZ0W?utm_source=generator&si=64b5b6dd4b934d17', 'Análise do mangá'],
].map(([number, src, type]) => ({
  id: `episode-${number}`,
  number,
  title: `Episódio ${number}`,
  src,
  type,
}));

const routeFilterMap = {
  all: 'Todos os episódios',
  manga: 'Análise do mangá',
  anime: 'Análise do anime',
  specials: 'Episódios especiais',
  fillers: 'Fillers',
};

const filters = ['Todos os episódios', 'Análise do mangá', 'Análise do anime', 'Episódios especiais'];

const typeStyleMap = {
  'Análise do mangá': 'manga',
  'Análise do anime': 'anime',
  'Episódios especiais': 'special',
  Fillers: 'fillers',
};

function SpotifyPlayer({ src, title }) {
  return (
    <div className="spotify-embed-wrapper">
      <iframe
        data-testid="embed-iframe"
        src={src}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`Spotify — ${title}`}
      />
    </div>
  );
}

function AllEpisodes() {
  const { episodeType } = useParams();
  const defaultFilter = routeFilterMap[episodeType] || 'Todos os episódios';
  const [selectedType, setSelectedType] = useState(defaultFilter);
  const [expandedEpisode, setExpandedEpisode] = useState(null);

  useEffect(() => {
    setSelectedType(defaultFilter);
    setExpandedEpisode(null);
  }, [defaultFilter]);

  const visibleEpisodes = selectedType === 'Todos os episódios'
    ? episodeList
    : episodeList.filter((episode) => episode.type === selectedType);

  const chooseFilter = (filter) => {
    setSelectedType(filter);
    setExpandedEpisode(null);
  };

  const toggleEpisode = (id) => {
    setExpandedEpisode((current) => (current === id ? null : id));
  };

  return (
    <main className="all-episodes-page">
      <div className="episodes-ambient" aria-hidden="true" />
      <section className="all-episodes-content" aria-labelledby="episodes-title">
        <header className="episodes-hero">
          <div className="episodes-intro">
            <p className="episodes-eyebrow">ROAD PODGLIFOS / ARQUIVO DE ÁUDIO</p>
            <h1 id="episodes-title">Episódios</h1>
            <p className="episodes-description">Um catálogo para revisitar cada arco, teoria e desvio de rota do universo One Piece.</p>
            <p className="episodes-total"><strong>{episodeList.length + 1}</strong> conversas para ouvir sem pressa</p>
          </div>

          <aside className="featured-episode" aria-label="Último episódio">
            <div className="featured-copy">
              <span className="featured-label">NO AR AGORA</span>
              <p className="featured-number">EP. 56</p>
              <h2>Análise do mangá</h2>
              <p>Comece pela nossa conversa mais recente.</p>
            </div>
            <SpotifyPlayer
              src="https://open.spotify.com/embed/episode/2xHpeBE4xwYrqJ0UtpXTvA?utm_source=generator&si=bda3ecfa74984af1"
              title="Último episódio — Episódio 56"
            />
          </aside>
        </header>

        <section className="episode-library" aria-labelledby="library-heading">
          <div className="episode-library-topline">
            <div>
              <p className="section-kicker">EXPLORE O CATÁLOGO</p>
              <h2 id="library-heading">{selectedType}</h2>
            </div>
            <span className="episode-count">{visibleEpisodes.length} episódio{visibleEpisodes.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="episode-filter-buttons" aria-label="Filtrar episódios">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-button ${selectedType === filter ? 'active' : ''}`}
                onClick={() => chooseFilter(filter)}
                aria-pressed={selectedType === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          {visibleEpisodes.length ? (
            <div className="episode-list">
              {visibleEpisodes.map((episode) => {
                const isExpanded = expandedEpisode === episode.id;
                const typeClass = typeStyleMap[episode.type] || 'manga';
                const panelId = `${episode.id}-player`;

                return (
                  <article className={`episode-entry type-${typeClass}`} key={episode.id}>
                    <div className={`episode-row ${isExpanded ? 'is-open' : ''}`}>
                      <span className="episode-number" aria-hidden="true">{episode.number.padStart(2, '0')}</span>
                      <div className="episode-metadata">
                        <span className="episode-badge">{episode.type}</span>
                        <h3>{episode.title}</h3>
                      </div>
                      <button
                        type="button"
                        className="episode-open-button"
                        onClick={() => toggleEpisode(episode.id)}
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                        aria-label={`${isExpanded ? 'Fechar' : 'Abrir'} player de ${episode.title}`}
                      >
                        <span>{isExpanded ? 'Fechar' : 'Ouvir'}</span>
                        <span className="button-mark" aria-hidden="true">{isExpanded ? '×' : '▶'}</span>
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="expanded-player" id={panelId}>
                        <div className="expanded-player-heading">
                          <div>
                            <p>REPRODUZINDO AGORA</p>
                            <h4>{episode.title}</h4>
                          </div>
                          <button type="button" onClick={() => setExpandedEpisode(null)} aria-label={`Fechar player de ${episode.title}`}>Fechar ×</button>
                        </div>
                        <SpotifyPlayer src={episode.src} title={episode.title} />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="episode-empty" role="status">
              <p>Nenhum episódio encontrado nesta coleção.</p>
              <button type="button" onClick={() => chooseFilter('Todos os episódios')}>Ver todos os episódios</button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default AllEpisodes;
