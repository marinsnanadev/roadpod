import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './NotFound.css';

function NotFound() {
  useDocumentTitle('Road Podglifos | Página não encontrada');

  return (
    <main className="not-found-page">
      <div className="not-found-glow not-found-glow--accent" aria-hidden="true" />
      <div className="not-found-glow not-found-glow--accent2" aria-hidden="true" />
      <div className="not-found-grid-overlay" aria-hidden="true" />

      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1>Página não encontrada</h1>
        <p>Esse capítulo ainda não foi escrito. O link pode estar quebrado ou a página pode ter mudado de lugar.</p>
        <Link to="/" className="not-found-button">Voltar para o início</Link>
      </div>
    </main>
  );
}

export default NotFound;