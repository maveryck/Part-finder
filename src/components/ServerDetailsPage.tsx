import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Monitor, Info, Package } from 'lucide-react';

const ServerDetailsPage = () => {
  const { brand, model } = useParams();

  // Mock data for demonstration
  const serverData = {
    name: model?.replace('-', ' '),
    brand: brand,
    image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Servidor rack 2U diseñado para aplicaciones empresariales críticas",
    
    components: {
      "RAM": [
        {
          description: "16GB DDR4-2933 ECC RDIMM",
          partNumber: "SNP888JGC/16G",
          notes: "Compatible con slots DIMM 1-24"
        },
        {
          description: "32GB DDR4-2933 ECC RDIMM",
          partNumber: "SNP888JGC/32G",
          notes: "Máximo 768GB por servidor"
        },
        {
          description: "64GB DDR4-2933 ECC LRDIMM",
          partNumber: "SNP888JGL/64G",
          notes: "Para configuraciones de alta densidad"
        }
      ],
      "Almacenamiento": [
        {
          description: "1TB SATA 7.2K RPM 3.5\" HDD",
          partNumber: "400-AUST",
          notes: "Hot-plug, compatible con backplane SAS/SATA"
        },
        {
          description: "480GB SATA SSD 2.5\"",
          partNumber: "400-BDUD",
          notes: "Ideal para sistemas operativos"
        },
        {
          description: "1.92TB NVMe SSD M.2",
          partNumber: "400-BDUE",
          notes: "Para aplicaciones de alto rendimiento"
        }
      ],
      "CPU": [
        {
          description: "Intel Xeon Gold 6248R 3.0GHz",
          partNumber: "338-BVKX",
          notes: "24 cores, 35.75MB cache, 205W TDP"
        },
        {
          description: "Intel Xeon Gold 6258R 2.7GHz",
          partNumber: "338-BVKY",
          notes: "28 cores, 38.5MB cache, 205W TDP"
        }
      ],
      "Fuentes de Poder": [
        {
          description: "750W 80+ Platinum PSU",
          partNumber: "450-AEBL",
          notes: "Hot-plug redundante"
        },
        {
          description: "1100W 80+ Platinum PSU",
          partNumber: "450-AEBM",
          notes: "Para configuraciones de alto consumo"
        }
      ],
      "Tarjetas de Red": [
        {
          description: "Broadcom 57416 10GbE Dual Port",
          partNumber: "540-BBUN",
          notes: "SFP+ low profile"
        },
        {
          description: "Intel X710 10GbE Quad Port",
          partNumber: "540-BBIV",
          notes: "RJ45 full height"
        }
      ],
      "Controladoras RAID": [
        {
          description: "PERC H745 8GB Cache",
          partNumber: "405-AAER",
          notes: "Soporta RAID 0,1,5,6,10,50,60"
        },
        {
          description: "PERC H330 Mini Mono",
          partNumber: "405-AAEI",
          notes: "Configuración básica RAID 0,1,5,10"
        }
      ]
    }
  };

  const getBrandIcon = (brandName: string) => {
    return Monitor; // Using a generic icon for all brands
  };

  const getBrandColor = (brandName: string) => {
    const colors: { [key: string]: string } = {
      'Dell': 'text-blue-600',
      'HPE': 'text-green-600',
      'Lenovo': 'text-red-600',
      'Supermicro': 'text-purple-600',
      'Cisco': 'text-cyan-600',
      'IBM': 'text-blue-800',
      'Oracle': 'text-red-500',
      'Fujitsu': 'text-indigo-600',
      'Gigabyte': 'text-orange-600',
      'ASRock Rack': 'text-gray-700'
    };
    return colors[brandName || ''] || 'text-gray-600';
  };

  const BrandIcon = getBrandIcon(brand || '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <span className="text-gray-900">{brand} {serverData.name}</span>
      </div>

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver a la búsqueda</span>
      </Link>

      {/* Server Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
          <div className="flex-shrink-0 mb-6 lg:mb-0">
            <img
              src={serverData.image}
              alt={`${brand} ${serverData.name}`}
              className="w-full lg:w-64 h-48 object-cover rounded-lg shadow-md"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <BrandIcon className={`h-6 w-6 ${getBrandColor(brand || '')}`} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {brand} {serverData.name}
                </h1>
                <p className="text-lg text-gray-600 mt-1">{serverData.description}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 bg-blue-50 p-4 rounded-lg">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Información importante:</p>
                <p className="text-blue-800 mt-1">
                  Los part numbers pueden variar según la región y configuración específica. 
                  Consulte con su distribuidor autorizado para verificar disponibilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Components Sections */}
      <div className="space-y-8">
        {Object.entries(serverData.components).map(([category, components]) => (
          <div key={category} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {components.length} componentes
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Descripción</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Part Number</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {components.map((component, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">
                            {component.description}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                            {component.partNumber}
                          </code>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">
                            {component.notes}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Los part numbers y especificaciones están sujetos a cambios por parte del fabricante.
          Última actualización: Enero 2025
        </p>
      </div>
    </div>
  );
};

export default ServerDetailsPage;