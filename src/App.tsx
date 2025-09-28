import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ServerDetailsPage from './components/ServerDetailsPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/server/:brand/:model" element={<ServerDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;