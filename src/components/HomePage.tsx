import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Monitor, HardDrive, Cpu, Zap } from 'lucide-react';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const serverBrands = [
    { name: 'Dell', icon: Monitor, color: 'bg-blue-600' },
    { name: 'HPE', icon: HardDrive, color: 'bg-green-600' },
    { name: 'Lenovo', icon: Cpu, color: 'bg-red-600' },
    { name: 'Supermicro', icon: Monitor, color: 'bg-purple-600' },
    { name: 'Cisco', icon: HardDrive, color: 'bg-cyan-600' },
    { name: 'IBM', icon: Cpu, color: 'bg-blue-800' },
    { name: 'Oracle', icon: Zap, color: 'bg-red-500' },
    { name: 'Fujitsu', icon: Monitor, color: 'bg-indigo-600' },
    { name: 'Gigabyte', icon: HardDrive, color: 'bg-orange-600' },
    { name: 'ASRock Rack', icon: Cpu, color: 'bg-gray-700' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Simulate search - navigate to a sample server
      navigate('/server/Dell/PowerEdge-R740');
    }
  };

  const handleBrandClick = (brand: string) => {
    // Navigate to a sample server for the selected brand
    const sampleModels: { [key: string]: string } = {
      'Dell': 'PowerEdge-R740',
      'HPE': 'ProLiant-DL380',
      'Lenovo': 'ThinkSystem-SR650',
      'Supermicro': 'SuperServer-6029P',
      'Cisco': 'UCS-C240-M5',
      'IBM': 'System-x3650-M5',
      'Oracle': 'Sun-Server-X7-2',
      'Fujitsu': 'PRIMERGY-RX2540',
      'Gigabyte': 'R282-Z90',
      'ASRock Rack': 'EP2C612D16-2T8R'
    };
    
    navigate(`/server/${brand}/${sampleModels[brand] || 'Generic-Model'}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Encuentra las Partes de tu Servidor
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Busca part numbers específicos, componentes y especificaciones técnicas para servidores de las principales marcas
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Introduce el modelo del servidor..."
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Brands Grid */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Explora por Marca
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {serverBrands.map((brand) => {
            const IconComponent = brand.icon;
            return (
              <button
                key={brand.name}
                onClick={() => handleBrandClick(brand.name)}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 text-center"
              >
                <div className={`w-12 h-12 ${brand.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {brand.name}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Búsqueda Rápida</h4>
          <p className="text-gray-600">Encuentra part numbers específicos en segundos</p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="h-8 w-8 text-green-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Base de Datos Completa</h4>
          <p className="text-gray-600">Información detallada de componentes y especificaciones</p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-purple-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Actualizado Constantemente</h4>
          <p className="text-gray-600">Información siempre actualizada con los últimos modelos</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;