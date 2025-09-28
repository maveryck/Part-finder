import './index.css' // Importa tus estilos

// --- Configuración de Supabase ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// --- Función para obtener todos los servidores ---
async function obtenerServidores() {
  console.log("Intentando obtener servidores desde Supabase...");
  
  if (!supabaseUrl || !supabaseKey) {
    console.error("Error: Las variables de Supabase no están definidas en .env.local");
    return;
  }
  
  const apiUrl = `${supabaseUrl}/rest/v1/servidores?select=*`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error de red: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("¡Datos recibidos de Supabase!", data);
    
    // --- Aquí es donde mostraremos los datos en la página ---
    const appElement = document.querySelector<HTMLDivElement>('#app')!;
    appElement.innerHTML = `
      <h1>Lista de Servidores</h1>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;

  } catch (error) {
    console.error("Falló la obtención de servidores:", error);
  }
}

// --- Llama a la función cuando la página cargue ---
obtenerServidores();
