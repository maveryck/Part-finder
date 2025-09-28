import '/style.css'; // O la ruta correcta a tu CSS. Si sigue dando error de build, bórrala.

// --- Configuración de Supabase ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// --- Referencias a los elementos HTML (que ahora SÍ existen) ---
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results-container');

// ... (El resto del código: `async function buscarServidores`, `function mostrarResultados`, etc. se queda exactamente igual que en mi mensaje anterior)
async function buscarServidores(terminoDeBusqueda) {
  if (!resultsContainer) return;
  resultsContainer.innerHTML = '<p>Buscando...</p>';

  if (!supabaseUrl || !supabaseKey) {
    console.error("Error: Variables de Supabase no configuradas.");
    resultsContainer.innerHTML = '<p>Error: Configuración de API incompleta.</p>';
    return;
  }

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

function mostrarResultados(servidores) {
  if (!resultsContainer) return;
  if (!servidores || servidores.length === 0) {
    resultsContainer.innerHTML = '<p>No se encontraron servidores con ese nombre.</p>';
    return;
  }

  const resultadosHtml = servidores.map(servidor => `
    <div class="resultado-item" style="border: 1px solid #ccc; padding: 10px; margin-top: 10px; border-radius: 5px;">
      <h3>${servidor.marca} ${servidor.nombre_modelo}</h3>
      <p>ID del Servidor: ${servidor.id}</p>
      <a href="#">Ver detalles completos</a>
    </div>
  `).join('');
  resultsContainer.innerHTML = resultadosHtml;
}

// --- Event Listener ---
if (searchForm && searchInput) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const termino = searchInput.value.trim();
    if (termino) {
      buscarServidores(termino);
    }
  });
} else {
    console.error("CRÍTICO: No se encontró el formulario #search-form o el input #search-input. Revisa tu index.html.");
}
