import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Crew from './pages/Crew';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Home from './pages/Home';
import AllEpisodes from './pages/AllEpisodes';



function NotFound() {
  return (
    <main className="App-main">
      <h1>404</h1>
      <p>Página não encontrada.</p>
    </main>
  );
}



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/episodes/:episodeType" element={<AllEpisodes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
