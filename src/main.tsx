import './style.css'

// --- Configuración de Supabase (Lee las variables de entorno) ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// --- Obtener referencias a los elementos HTML ---
// Asegúrate de que en tu index.html tienes estos IDs
const appElement = document.querySelector<HTMLDivElement>('#app')!;
const searchForm = document.querySelector<HTMLFormElement>('#search-form');
const searchInput = document.querySelector<HTMLInputElement>('#search-input');
const resultsContainer = document.querySelector<HTMLDivElement>('#results-container');

// --- Función para buscar servidores en Supabase ---
async function buscarServidores(terminoDeBusqueda: string) {
  if (!resultsContainer) return;
  resultsContainer.innerHTML = '<p>Buscando...</p>'; // Muestra un mensaje de carga

  if (!supabaseUrl || !supabaseKey) {
    console.error("Error: Variables de Supabase no configuradas.");
    resultsContainer.innerHTML = '<p>Error: Configuración de API incompleta.</p>';
    return;
  }

  // Construye la URL con el filtro 'ilike' para buscar texto que CONTENGA el término
  const apiUrl = `${supabaseUrl}/rest/v1/servidores?nombre_modelo=ilike.%${terminoDeBusqueda}%&select=*`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) throw new Error(`Error de red: ${response.statusText}`);

    const data = await response.json();
    mostrarResultados(data);

  } catch (error) {
    console.error("Falló la búsqueda:", error);
    resultsContainer.innerHTML = `<p>Error al buscar: ${error}</p>`;
  }
}

// --- Función para mostrar los resultados en la página ---
function mostrarResultados(servidores: any[]) {
  if (!resultsContainer) return;

  if (servidores.length === 0) {
    resultsContainer.innerHTML = '<p>No se encontraron servidores con ese nombre.</p>';
    return;
  }

  // Genera el HTML para cada resultado y lo une
  const resultadosHtml = servidores.map(servidor => `
    <div class="resultado-item">
      <h3>${servidor.marca} ${servidor.nombre_modelo}</h3>
      <a href="/server/${servidor.marca}/${servidor.nombre_modelo}">Ver detalles</a>
    </div>
  `).join('');

  resultsContainer.innerHTML = resultadosHtml;
}

// --- Event Listener: Se activa cuando se envía el formulario ---
if (searchForm && searchInput) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // MUY IMPORTANTE: Previene que la página se recargue
    
    const termino = searchInput.value.trim(); // Obtiene el texto del input
    if (termino) {
      buscarServidores(termino);
    }
  });
}

// --- Mensaje inicial en la página ---
if (appElement) {
    appElement.innerHTML = `
        <h1>Busca un Servidor</h1>
        <form id="search-form">
            <input type="text" id="search-input" placeholder="Ej: PowerEdge R760" />
            <button type="submit">Buscar</button>
        </form>
        <div id="results-container"></div>
    `;
    // Re-asignamos las referencias después de cambiar el HTML
    const newSearchForm = document.querySelector<HTMLFormElement>('#search-form');
    const newSearchInput = document.querySelector<HTMLInputElement>('#search-input');
    const newResultsContainer = document.querySelector<HTMLDivElement>('#results-container');

    if (newSearchForm && newSearchInput) {
        newSearchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const termino = newSearchInput.value.trim();
            if (termino) {
                buscarServidores(termino);
            }
        });
    }
}
