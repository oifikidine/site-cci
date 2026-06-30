import { Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil';
import PageEnConstruction from './components/PageEnConstruction';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/en-construction" element={<PageEnConstruction />} />
    </Routes>
  );
}

export default App;