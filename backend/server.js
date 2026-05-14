/**
 * @owner Empresa o Inc Vinilo Vive
 * @description Archivo principal del servidor Backend (Node.js + Express).
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

// ── Captura de errores no controlados ────────────────────────────────────────
// Evita que el proceso muera silenciosamente sin dejar rastro en los logs.
process.on("uncaughtException", (err) => {
  console.error("[FATAL] uncaughtException:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("[FATAL] unhandledRejection:", reason);
});

// ── Validación de variables de entorno requeridas ────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "[ERROR] Variables de entorno faltantes: " +
    (!SUPABASE_URL ? "SUPABASE_URL " : "") +
    (!SUPABASE_KEY ? "SUPABASE_KEY" : "")
  );
  console.error(
    "[ERROR] El servidor arrancará pero las rutas de base de datos fallarán " +
    "hasta que se configuren las variables correctamente."
  );
}

const app = express();
app.use(cors());
app.use(express.json());

// ── Cliente Supabase ──────────────────────────────────────────────────────────
// Se inicializa con valores de relleno cuando faltan las variables para que el
// proceso no explote en el require-time y el servidor pueda responder al menos
// al healthcheck de Railway en GET /.
let supabase;
try {
  supabase = createClient(
    SUPABASE_URL || "https://placeholder.supabase.co",
    SUPABASE_KEY || "placeholder-key"
  );
  if (SUPABASE_URL && SUPABASE_KEY) {
    console.log("[INFO] Cliente Supabase inicializado correctamente.");
  } else {
    console.warn("[WARN] Cliente Supabase inicializado con valores de relleno — las consultas a BD fallarán.");
  }
} catch (err) {
  console.error("[ERROR] No se pudo inicializar el cliente Supabase:", err);
  // Objeto nulo-seguro para que las rutas devuelvan 503 en lugar de crashear.
  supabase = null;
}

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Endpoint: Todos los productos activos (con opción de filtro por género)
app.get("/productos", async (req, res) => {
  let query = supabase.from("productos").select("*").eq("activo", true);
  
  if (req.query.genero) {
    query = query.eq("genero", req.query.genero);
  }

  const { data, error } = await query;
  if (error) return res.status(500).json(error);
  res.json(data);
});

// Endpoint: Disco del mes
app.get("/disco-del-mes", async (req, res) => {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .eq("disco_del_mes", true)
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    return res.status(500).json(error);
  }
  
  res.json(data || null);
});

// Endpoint: Recién llegados
app.get("/recien-llegados", async (req, res) => {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .eq("recien_llegado", true);

  if (error) return res.status(500).json(error);
  res.json(data);
});

// Endpoint: Destacados
app.get("/destacados", async (req, res) => {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .eq("destacado", true);

  if (error) return res.status(500).json(error);
  res.json(data);
});

// Endpoint: Obtener un producto por ID o Slug
app.get("/productos/:idOrSlug", async (req, res) => {
  const { idOrSlug } = req.params;
  console.log(`[API] Buscando producto: ${idOrSlug}`);
  
  try {
    // Validar si es un UUID (8-4-4-4-12 caracteres hexadecimales)
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    
    let query = supabase.from("productos").select("*").eq("activo", true);
    
    if (isUuid) {
      // Si es UUID, buscamos por ID
      query = query.eq("id", idOrSlug);
    } else {
      // Si no es UUID, buscamos por SLUG
      query = query.eq("slug", idOrSlug);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Error en Supabase:", error);
      return res.status(500).json({ error: error.message });
    }

    // Si no se encontró por la vía anterior, intentar la otra (por si acaso el ID no es UUID)
    if (!data && !isUuid) {
      // Intentar buscar por ID numérico si la columna lo permite (o si idOrSlug es numérico)
      const { data: dataRetry, error: errorRetry } = await supabase
        .from("productos")
        .select("*")
        .eq("id", idOrSlug) // PostgREST intentará convertir si es posible
        .eq("activo", true)
        .maybeSingle();
      
      if (dataRetry) return res.json(dataRetry);
    }

    if (!data) {
      console.log(`[API] Producto no encontrado: ${idOrSlug}`);
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error crítico:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint: Crear una nueva orden
app.post("/ordenes", async (req, res) => {
  const { usuario_id, total, items, nombre, email } = req.body;
  console.log("[API] Recibiendo nueva orden:", { total, itemsCount: items?.length, email });

  try {
    let final_usuario_id = usuario_id;

    // 1. Manejo de Usuario (Relación 1:N)
    // Buscamos si el usuario ya existe por email para no duplicar
    if (!final_usuario_id && email) {
      const { data: existingUser } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", email)
        .maybeSingle();
      
      if (existingUser) {
        final_usuario_id = existingUser.id;
      } else {
        // Si no existe, lo creamos con los atributos exactos del diagrama
        console.log("[API] Creando nuevo usuario para la orden...");
        const { data: newUser, error: createError } = await supabase
          .from("usuarios")
          .insert([{ 
            nombre: nombre || "Cliente Invitado", 
            email: email, 
            password: "login_invitado_" + Math.random().toString(36).slice(-8) // Atributo obligatorio en diagrama
          }])
          .select()
          .single();

        if (createError) {
          console.error("Error al crear usuario:", createError);
          throw createError;
        }
        final_usuario_id = newUser.id;
      }
    }

    // 2. Crear la orden (Tabla 'ordenes')
    // Atributos: id (auto), usuario_id, total, estado, fecha (auto)
    const { data: orden, error: ordenError } = await supabase
      .from("ordenes")
      .insert([{ 
        usuario_id: final_usuario_id, 
        total: parseFloat(total), 
        estado: 'pendiente' 
      }])
      .select()
      .single();

    if (ordenError) {
      console.error("Error en tabla 'ordenes':", ordenError);
      throw ordenError;
    }

    // 3. Crear detalles (Tabla 'detalle_orden')
    // Atributos: id (auto), orden_id, producto_id, cantidad, precio_unitario
    const detalles = items.map(item => ({
      orden_id: orden.id,
      producto_id: item.producto_id,
      cantidad: parseInt(item.cantidad),
      precio_unitario: parseFloat(item.precio_unitario)
    }));

    const { error: detallesError } = await supabase
      .from("detalle_orden")
      .insert(detalles);

    if (detallesError) {
      console.error("Error en tabla 'detalle_orden':", detallesError);
      throw detallesError;
    }

    res.json({ success: true, orden_id: orden.id });

  } catch (error) {
    console.error("Error crítico procesando pedido:", error);
    res.status(500).json({ 
      error: "Error al procesar el pedido en la base de datos", 
      details: error.message 
    });
  }
});

// --- NUEVOS ENDPOINTS PARA EL PANEL ADMIN ---

// Endpoint: Crear un nuevo producto
app.post("/productos", async (req, res) => {
  const productData = req.body;
  const { data, error } = await supabase
    .from("productos")
    .insert([productData])
    .select()
    .single();

  if (error) return res.status(500).json(error);
  res.json(data);
});

// Endpoint: Actualizar un producto (incluyendo stock)
app.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const { data, error } = await supabase
    .from("productos")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(500).json(error);
  res.json(data);
});

// Endpoint: Eliminar físicamente un producto
app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    // Primero verificamos si el producto tiene detalles de orden asociados
    const { data: details, error: detailsError } = await supabase
      .from("detalle_orden")
      .select("id")
      .eq("producto_id", id)
      .limit(1);

    if (detailsError) throw detailsError;

    if (details && details.length > 0) {
      // Si tiene órdenes asociadas, no podemos borrarlo físicamente por integridad referencial
      // Lo desactivamos en su lugar
      const { error: updateError } = await supabase
        .from("productos")
        .update({ activo: false })
        .eq("id", id);
      
      if (updateError) throw updateError;
      return res.json({ success: true, message: "Producto desactivado por integridad referencial" });
    }

    // Si no tiene órdenes, lo borramos físicamente
    const { error: deleteError } = await supabase
      .from("productos")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;
    res.json({ success: true, message: "Producto eliminado físicamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Estadísticas básicas para el dashboard
app.get("/admin/stats", async (req, res) => {
  try {
    const { count: totalProductos } = await supabase
      .from("productos")
      .select("*", { count: 'exact', head: true })
      .eq("activo", true);

    const { count: totalOrdenes } = await supabase
      .from("ordenes")
      .select("*", { count: 'exact', head: true });

    const { data: ordenesRecientes } = await supabase
      .from("ordenes")
      .select("total")
      .order("id", { ascending: false });

    const totalVentas = ordenesRecientes?.reduce((acc, curr) => acc + Number(curr.total || 0), 0) || 0;

    res.json({
      totalProductos,
      totalOrdenes,
      totalVentas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Obtener todas las órdenes con detalles de usuario
app.get("/admin/ordenes", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("ordenes")
      .select(`
        *,
        usuarios (nombre, email)
      `)
      .order("id", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Obtener detalles de una orden específica
app.get("/admin/ordenes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data: orden, error: ordenError } = await supabase
      .from("ordenes")
      .select(`
        *,
        usuarios (nombre, email),
        detalle_orden (
          *,
          productos (nombre, imagen_url)
        )
      `)
      .eq("id", id)
      .single();

    if (ordenError) throw ordenError;
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Actualizar estado de una orden
app.put("/admin/ordenes/:id/estado", async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const { data, error } = await supabase
      .from("ordenes")
      .update({ estado })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log("=".repeat(50));
  console.log(`[INFO] Servidor Vinilo Vive arrancado correctamente`);
  console.log(`[INFO] Escuchando en http://0.0.0.0:${PORT}`);
  console.log(`[INFO] NODE_ENV: ${process.env.NODE_ENV || "development"}`);
  console.log(`[INFO] Supabase URL configurada: ${SUPABASE_URL ? "✅ sí" : "❌ no"}`);
  console.log(`[INFO] Supabase KEY configurada: ${SUPABASE_KEY ? "✅ sí" : "❌ no"}`);
  console.log("=".repeat(50));
});

