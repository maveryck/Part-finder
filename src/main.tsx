import './style.css'

// --- Configuración de Supabase ---
// Este código buscará las variables VITE_SUPABASE_URL y VITE_SUPABASE_KEY
// que serán proporcionadas por el entorno de construcción (en nuestro caso, Bolt.new)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// --- Función para obtener todos los servidores ---
async function obtenerServidores() {
  const appElement = document.querySelector<HTMLDivElement>('#app')!;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error("Error: Las variables de Supabase no están configuradas en el entorno de construcción.");
    appElement.innerHTML = `
      <h1>Error de Configuración</h1>
      <p>Las claves de la base de datos no están definidas. Por favor, configúrelas en las variables de entorno del proyecto.</p>
    `;
    return;
  }
  
  appElement.innerHTML = `<h1>Buscando servidores...</h1>`;
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
    
    appElement.innerHTML = `
      <h1>Lista de Servidores</h1>
      <p>Conexión exitosa. Se encontró lo siguiente en la base de datos:</p>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;

  } catch (error) {
    console.error("Falló la obtención de servidores:", error);
    appElement.innerHTML = `
      <h1>Error de Conexión</h1>
      <p>No se pudo conectar a la base de datos. Revisa la consola para más detalles.</p>
      <p>${error}</p>
    `;
  }
}

// --- Llama a la función cuando la página cargue ---
obtenerServidores();
