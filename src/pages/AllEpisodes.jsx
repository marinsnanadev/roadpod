import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AllEpisodes.css';

const episodeList = [
  {
    title: 'Episodio 55 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/2J8WaRZdd2xyhILaGnlcpa?utm_source=generator&theme=0&si=59b593e4e6d1458f',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 54 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/5czxbA5hDL6ECJN9Mt5caP?utm_source=generator&si=99505446dd2b4fc0',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 53 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/1KcLDcgiqTR7oizPQQAtCc?utm_source=generator&theme=0&si=6b33ad693d0f43d6',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 52 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/7N2UA3LoPCdWLHy939b6XJ?utm_source=generator&si=f215518a887f4146',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 51 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/1xdhxzZh8sW5soc6PLm3xT?utm_source=generator&theme=0&si=4e9f1f767b374e18',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 50 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/48CqhmtucsDsshsYTVj2MK?utm_source=generator&si=7f43feeb62374b5c',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 49 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/7HxhUwyhl5DnrIsnxpUHUS?utm_source=generator&si=b1a52fa90d7b4727',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 48 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/5ws1oYNAwdt9pQEI2lw9rv?utm_source=generator&si=dc1df452abda4512',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 47 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/4pjUQrX38EM01rilNGD8FB?utm_source=generator&theme=0&si=bc040c875733428f',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 46 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/5Yii6guH6Ms0D0s02LJkRe?utm_source=generator&si=0ea0c600ef144b88',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 45 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/6CGld40TyuHRB1yce48fng?utm_source=generator&theme=0&si=a575ebe8d98c4397',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 44 - Episodios especiais',
    src: 'https://open.spotify.com/embed/episode/6fQzKLQ5kVEkBFkTNmdnNv?utm_source=generator&si=8a91781d47504e47',
    type: 'Episódios especiais',
  },
  {
    title: 'Episodio 43 - Análise do anime',
    src: 'https://open.spotify.com/embed/episode/2swMofecDKuTxf7cXuSD4y?utm_source=generator&theme=0&si=f01eb5f21e3e4fe3',
    type: 'Análise do anime',
  },
  {
    title: 'Episodio 42 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/2RedG35B2PgmTJqADwQST5?utm_source=generator&si=2bba92f0928a4e14',
    type: 'Análise do mangá',
  },
  {
    title: 'Episodio 41 - Episodios especiais',
    src: 'https://open.spotify.com/embed/episode/3O1zdJRWJjVHcHVprWe3Po?utm_source=generator&theme=0&si=7fe736a900764e33',
    type: 'Episódios especiais',
  },
  {
    title: 'Episodio 40 - Análise do mangá',
    src: 'https://open.spotify.com/embed/episode/1f1Wge2h1jyTiyh3iFSZ0W?utm_source=generator&si=64b5b6dd4b934d17',
    type: 'Análise do mangá',
  },
];

const routeFilterMap = {
  all: 'Todos os episódios',
  manga: 'Análise do mangá',
  anime: 'Análise do anime',
  specials: 'Episódios especiais',
  fillers: 'Fillers',
};

const filters = ['Todos os episódios', 'Análise do mangá', 'Análise do anime', 'Episódios especiais'];

function AllEpisodes() {
  const { episodeType } = useParams();
  const defaultFilter = routeFilterMap[episodeType] || 'Todos os episódios';
  const [selectedType, setSelectedType] = useState(() => defaultFilter);

  useEffect(() => {
    setSelectedType(defaultFilter);
  }, [defaultFilter]);

  return (
    <main className="all-episodes-page">
      <section className="all-episodes-content">
        <div className="episode-block">
          <h2>Último episódio</h2>
          <div className="spotify-embed-wrapper">
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/episode/2xHpeBE4xwYrqJ0UtpXTvA?utm_source=generator&si=bda3ecfa74984af1"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Último Episódio - Episodio 56 - Análise do mangá"
            />
          </div>
        </div>

        <div className="episode-links-placeholder">
          <h3>{selectedType === 'Todos os episódios' ? 'Todos os episódios' : selectedType}</h3>
          <div className="episode-filter-buttons">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-button ${selectedType === filter ? 'active' : ''}`}
                onClick={() => setSelectedType(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="episode-list">
            {(selectedType === 'Todos os episódios' ? episodeList : episodeList.filter((episode) => episode.type === selectedType)).map((episode) => (
                <div key={episode.title} className="spotify-embed-wrapper">
                  <iframe
                    data-testid="embed-iframe"
                    style={{ borderRadius: 12 }}
                    src={episode.src}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={episode.title}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default AllEpisodes;
