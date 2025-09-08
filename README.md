<div align="center">

# 🤖 Creación de Chatbots con Gemini

Aprende a construir chatbots modernos paso a paso: desde la primera petición a la API de Gemini hasta un asistente con memoria, filtros inteligentes y personalidad definida.

<strong>Autor:</strong> Iván Martínez · <strong>Institución:</strong> CCOL · <strong>Septiembre 2025</strong>

---

</div>

## 🗂️ Tabla de Contenidos
1. Información General
2. Objetivos y Alcance
3. Ruta de Aprendizaje (Clases)
4. Guía Rápida de Ejecución
5. API y Ejemplos
6. Diseño Técnico y Arquitectura
7. Memoria Conversacional y Filtros
8. Buenas Prácticas Aplicadas
9. Roadmap (Clases Futuras)
10. Solución de Problemas (FAQ)
11. Próximas Extensiones
12. Créditos

---

## 1. Información General
- Curso: Creación de Chatbots con Gemini
- Autor: Iván Martínez
- Institución: CCOL
- Público objetivo: Estudiantes / Desarrolladores Backend Junior / Entusiastas de IA
- Tecnologías base: Node.js, Express, MongoDB, Gemini (@google/genai), Axios, Mongoose, dotenv

## 2. Objetivos y Alcance
Construir, entender y extender un chatbot inteligente capaz de:
- Responder preguntas usando modelos Gemini
- Persistir historial de conversaciones
- Mantener contexto a corto plazo
- Filtrar y responder rápido a preguntas frecuentes (canned responses)
- Especializarse en un dominio (ropa deportiva)

## 3. Ruta de Aprendizaje (Clases)

### Clase 1 – Fundamentos (HTTP + API Gemini)
Ubicación: `class_1/`
Enfoque en lo esencial: primera llamada a la API de Gemini vía REST y luego con el SDK.
Características:
- Servidor Express básico
- Endpoint `/ask`
- Uso de variables de entorno (`.env`)
- Implementación doble: Axios vs SDK (@google/genai)
Archivos clave: `chatbot.js`, `chatbot2.js`

### Clase 2 – Persistencia y Modularización
Ubicación: `class_2/`
Se introduce arquitectura organizada y base de datos.
Características:
- Patrón MVC simplificado
- Conexión a MongoDB (Mongoose)
- Modelo `ChatHistory`
- Guardado de cada intercambio usuario ↔ bot
- Controlador dedicado (`chat_controller.js`)

### Clase 3 – Memoria + Filtros Inteligentes + Personalidad
Ubicación: `class_3/`
Se agrega inteligencia contextual y optimización de respuestas.
Características:
- Recuperación de últimas 5 interacciones (memoria corta)
- Filtros de preguntas frecuentes (`utils/filterquestions.js`)
- Personalidad del asistente (Jean, asesor de ropa deportiva)
- Respuestas más consistentes mediante `systemInstruction`
- Ordenamiento cronológico para mantener coherencia

| Evolución | Clase 1 | Clase 2 | Clase 3 |
|-----------|---------|---------|---------|
| API Gemini | REST y SDK | SDK básico | Chats con historial |
| Persistencia | ❌ | ✅ | ✅ |
| Memoria | ❌ | ❌ | ✅ (últimas 5) |
| Filtros Rápidos | ❌ | ❌ | ✅ |
| Personalidad | Básica | Genérica | Definida (Jean) |
| Modularización | Baja | Media | Alta |

## 4. Guía Rápida de Ejecución
Prerequisitos: Node >=16, MongoDB activo, API Key de Gemini.

Clonar e instalar:
```bash
git clone https://github.com/XxIvanstromxX/ChatBot_IA.git
cd ChatBot_IA
for d in class_1 class_2 class_3; do (cd $d && npm install); done
```

Crear `.env` en cada clase:
```env
GEMINI_API_KEY=TU_API_KEY
MONGO_URI=mongodb://localhost:27017/
PORT=3000
```

Ejecutar una clase:
```bash
cd class_3
npm run dev
```
Disponible en: http://localhost:3000

## 5. API y Ejemplos
Endpoint principal:
```
POST /ask
Content-Type: application/json
```
Ejemplo (Clase 3):
```json
{
  "user_id": "000001",
  "question": "Quiero correr y luego hacer yoga, ¿qué outfit recomiendas?"
}
```
Respuesta esperada:
```json
{
  "respuesta": "Para correr usa tenis ligeros y ropa transpirable; para yoga después elige prendas flexibles..."
}
```

## 6. Diseño Técnico y Arquitectura
Componentes clave (Clase 3):
- `controllers/chat_controller.js`: Orquesta flujo (validación → filtros → historial → llamada Gemini → persistencia)
- `schemas/conversacion.js`: Modelo Mongoose (user_id, userAsk, botAnswer, createdAt)
- `utils/filterquestions.js`: Respuestas inmediatas a preguntas comunes (reduce costo y latencia)
- `config/db.js`: Conexión única a MongoDB
- Historial: Se consulta y limita a 5 para evitar crecimiento y mantener performance

Flujo simplificado:
1. Request usuario
2. Validación body
3. Filtro rápido (si match → responde sin IA)
4. Recupera historial reciente
5. Construye context/history
6. Llama a Gemini (modelo `gemini-2.5-flash`)
7. Persiste interacción
8. Devuelve respuesta JSON

## 7. Memoria Conversacional y Filtros
Memoria: Implementada como ventana deslizante (últimas 5 interacciones) para balancear contexto y costo.
Filtros: Palabras clave (clima, talla, gimnasio, correr, yoga) devuelven respuestas preconfiguradas.
Beneficios:
- Menor latencia y uso de tokens
- Respuestas consistentes a FAQs
- Personalidad estable (systemInstruction)

## 8. Buenas Prácticas Aplicadas
- Variables de entorno (no se versiona `.env`)
- Separación de responsabilidades
- Manejo de errores con status apropiados
- Reutilización de conexión a BD
- Limitación de historial (prevención de sobrecarga)
- Código legible y comentado

## 9. Roadmap (Clases Futuras Propuestas)
| Clase | Tema | Objetivo |
|-------|------|----------|
| 4 | Frontend Web | UI básica para interactuar con el bot en tiempo real |
| 5 | Autenticación | JWT / Sessions para usuarios reales |
| 6 | WebSockets | Chat streaming y typing indicators |
| 7 | Evaluación de Respuestas | Métricas de calidad / feedback loop |
| 8 | Deploy | Docker + Render / Railway / Vercel backend |
| 9 | Observabilidad | Logs estructurados + métricas + tracing |
| 10 | Multi-Modelo | Fallback a otros LLMs (ej. OpenAI / Cohere) |

## 10. Solución de Problemas (FAQ)
| Problema | Posible Causa | Solución |
|----------|---------------|----------|
| Error 500 en `/ask` | API Key inválida | Verifica `GEMINI_API_KEY` en `.env` |
| No conecta a MongoDB | URI incorrecta o servicio caído | Revisa `MONGO_URI` y estado de MongoDB |
| Respuesta vacía | Modelo sin output | Reintenta y verifica prompt o filtros |
| Cambios no reflejados | Caché / proceso previo | Reinicia con Ctrl+C y `npm run dev` |
| Filtros no aplican | Palabras no coinciden | Normaliza texto a minúsculas (ya implementado) |

## 11. Próximas Extensiones
- Test unitarios (Jest + supertest)
- Sanitización y rate limiting
- Frontend con React / Next.js
- Modo streaming de respuestas
- Panel administrador de historial
- Persistencia extendida (embeddings para memoria larga)

## 12. Créditos
Autor: Iván Martínez · CCOL

> Proyecto educativo para formación en desarrollo de soluciones impulsadas por IA. Uso académico y extensible.

---

¿Quieres proponer una mejora? Abre un issue o envía un pull request. 🙌

