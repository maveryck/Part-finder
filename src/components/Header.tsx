import { Link } from 'react-router-dom';
import { Server } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Server className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Server Part Finder</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Inicio
            </Link>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Catálogo
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Soporte
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;