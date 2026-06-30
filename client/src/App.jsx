import { Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil';
import PageEnConstruction from './components/PageEnConstruction';
import Detail from './components/Detail';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/en-construction" element={<PageEnConstruction />} />
      <Route path="/contenu/:id" element={<Detail />} />
      <Route path="/admin" element={<Login />} />
    </Routes>
  );
}

export default App;