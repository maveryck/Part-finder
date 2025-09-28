import '/style.css'; // Asegúrate de que este archivo CSS existe en la raíz o ajusta la ruta.

// --- Configuración de Supabase (Lee las variables de entorno) ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// --- Obtener referencias a los elementos HTML ---
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results-container');

// --- Función para buscar servidores en Supabase ---
async function buscarServidores(terminoDeBusqueda) {
  // Asegurarnos de que el contenedor de resultados existe antes de usarlo.
  if (!resultsContainer) {
    console.error("No se encontró el elemento #results-container");
    return;
  }
  resultsContainer.innerHTML = '<p>Buscando...</p>';

  // Validar que las claves de la API están presentes.
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

    if (!response.ok) {
      // Si la respuesta no es exitosa, lanza un error con el mensaje del servidor.
      const errorData = await response.text();
      throw new Error(`Error de red: ${response.statusText} - ${errorData}`);
    }
    
    const data = await response.json();
    mostrarResultados(data);

  } catch (error) {
    console.error("Falló la búsqueda:", error);
    resultsContainer.innerHTML = `<p>Error al buscar: ${error}</p>`;
  }
}

// --- Función para mostrar los resultados en la página ---
function mostrarResultados(servidores) {
  if (!resultsContainer) return;

  if (!servidores || servidores.length === 0) {
    resultsContainer.innerHTML = '<p>No se encontraron servidores con ese nombre.</p>';
    return;
  }

  // Genera el HTML para cada resultado y lo une
  const resultadosHtml = servidores.map(servidor => `
    <div class="resultado-item" style="border: 1px solid #ccc; padding: 10px; margin-top: 10px; border-radius: 5px;">
      <h3>${servidor.marca} ${servidor.nombre_modelo}</h3>
      <p>ID del Servidor: ${servidor.id}</p>
      <a href="#">Ver detalles completos</a>
    </div>
  `).join('');
  
  resultsContainer.innerHTML = resultadosHtml;
}

// --- Event Listener: Se activa cuando se envía el formulario ---
// Nos aseguramos de que los elementos del formulario existan antes de añadir el listener.
if (searchForm && searchInput) {
  searchForm.addEventListener('submit', (event) => {
    // MUY IMPORTANTE: Previene que la página se recargue al enviar el formulario
    event.preventDefault(); 
    
    const termino = searchInput.value.trim(); // Obtiene el texto del input y quita espacios en blanco
    
    if (termino) {
      buscarServidores(termino);
    }
  });
} else {
    console.error("No se encontró el formulario de búsqueda #search-form o el input #search-input en el HTML.");
}
