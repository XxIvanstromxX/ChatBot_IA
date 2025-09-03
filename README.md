# 🤖 Creación de Chatbots con Gemini

Un curso completo para aprender a desarrollar chatbots inteligentes utilizando Google Gemini AI, desde los conceptos básicos hasta implementaciones avanzadas con persistencia de datos y respuestas contextuales.

## 📋 Información del Curso

- **Curso**: Creación de Chatbots con Gemini
- **Autor**: Iván Martínez
- **Institución**: CCOL
- **Fecha**: Septiembre 2025
- **Tecnologías**: Node.js, Express, MongoDB, Google Gemini AI

## 🎯 Objetivos del Curso

Este curso está diseñado para enseñar el desarrollo progresivo de chatbots inteligentes, cubriendo desde implementaciones básicas hasta sistemas avanzados con memoria conversacional y filtros de respuestas.

## 📚 Estructura del Curso

### Clase 1: Fundamentos y Primera Implementación
**Ubicación**: `class_1/`

Introducción a los chatbots y primera implementación usando la API REST de Gemini.

**Características implementadas**:
- ✅ Servidor Express básico
- ✅ Integración con Gemini API via HTTP
- ✅ Endpoint `/ask` para consultas
- ✅ Manejo de errores básico
- ✅ Variables de entorno

**Archivos principales**:
- `chatbot.js` - Implementación con Axios y API REST
- `chatbot2.js` - Ejemplo directo con SDK de Google
- `package.json` - Dependencias y scripts

**Dependencias**:
```json
{
  "@google/genai": "^1.15.0",
  "axios": "1.11.0",
  "dotenv": "17.2.1",
  "express": "5.1.0"
}
```

### Clase 2: Arquitectura Avanzada y Persistencia
**Ubicación**: `class_2/`

Evolución hacia una arquitectura más robusta con base de datos y organización modular.

**Características implementadas**:
- ✅ Arquitectura MVC (Model-View-Controller)
- ✅ Conexión a MongoDB
- ✅ Persistencia del historial de conversaciones
- ✅ Esquemas de datos con Mongoose
- ✅ Controladores separados
- ✅ Configuración modular de base de datos

**Estructura del proyecto**:
```
class_2/
├── chatbot.js          # Servidor principal
├── config/
│   └── db.js          # Configuración de MongoDB
├── controllers/
│   └── chat_controller.js  # Lógica del chatbot
└── schemas/
    └── conversacion.js     # Modelo de datos
```

**Nuevas dependencias**:
- `mongoose`: "8.18.0" - ODM para MongoDB

### Clase 3: Sistema Inteligente con Memoria y Filtros
**Ubicación**: `class_3/`

Implementación completa con contexto conversacional, respuestas predefinidas y personalización avanzada.

**Características implementadas**:
- ✅ **Memoria conversacional**: El bot recuerda conversaciones anteriores
- ✅ **Respuestas predefinidas**: Filtros para preguntas comunes
- ✅ **Sistema de utilidades**: Funciones helper modulares
- ✅ **Contexto especializado**: Bot especializado en ropa deportiva
- ✅ **Historial limitado**: Mantiene las últimas 5 conversaciones
- ✅ **Instrucciones del sistema**: Personalidad y comportamiento definido

**Nuevas funcionalidades**:
- Sistema de filtros de preguntas (`utils/filterquestions.js`)
- Historial conversacional con límite
- Bot con personalidad específica (Jean - asesor de ropa deportiva)
- Respuestas contextuales inteligentes

**Estructura completa**:
```
class_3/
├── chatbot.js              # Servidor principal
├── config/
│   └── db.js              # Configuración de MongoDB
├── controllers/
│   └── chat_controller.js  # Lógica avanzada del chatbot
├── schemas/
│   └── conversacion.js     # Modelo de datos
└── utils/
    └── filterquestions.js  # Filtros de respuestas predefinidas
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB (local o Atlas)
- Cuenta de Google AI Studio para API Key de Gemini

### Configuración del entorno

1. **Clona el repositorio**:
```bash
git clone https://github.com/XxIvanstromxX/ChatBot_IA.git
cd ChatBot_IA
```

2. **Configura las variables de entorno**:
Crea un archivo `.env` en cada directorio de clase:
```env
GEMINI_API_KEY=tu_api_key_de_gemini
MONGO_URI=mongodb://localhost:27017/
PORT=3000
```

3. **Instala las dependencias** (para cada clase):
```bash
cd class_1 && npm install
cd ../class_2 && npm install
cd ../class_3 && npm install
```

### Ejecución

Para ejecutar cualquier clase:
```bash
cd class_X
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📡 API Endpoints

### POST /ask
Envía una pregunta al chatbot y recibe una respuesta.

**Request Body**:
```json
{
  "question": "¿Qué ropa me recomiendas para hacer ejercicio?",
  "user_id": "123456"  // Requerido desde la clase 2
}
```

**Response**:
```json
{
  "respuesta": "Para ejercicio te recomiendo..."
}
```

## 🧠 Evolución del Aprendizaje

### Progresión de Complejidad

1. **Clase 1**: Comunicación básica con IA
   - Peticiones HTTP directas
   - Respuestas sin contexto
   - Arquitectura monolítica

2. **Clase 2**: Persistencia y organización
   - Guardado de conversaciones
   - Arquitectura modular
   - Conexión a base de datos

3. **Clase 3**: Inteligencia contextual
   - Memoria conversacional
   - Respuestas especializadas
   - Sistema de filtros inteligente

### Conceptos Técnicos Cubiertos

- **APIs RESTful** con Express.js
- **Integración con IA** usando Google Gemini
- **Bases de datos NoSQL** con MongoDB
- **Arquitectura MVC** en Node.js
- **Manejo de variables de entorno**
- **Gestión de errores** y validaciones
- **Modularización** de código
- **Persistencia de datos** con Mongoose
- **Contexto conversacional** en chatbots
- **Sistemas de filtros** y respuestas predefinidas

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | Latest | Runtime de JavaScript |
| Express | 5.1.0 | Framework web |
| MongoDB | Latest | Base de datos NoSQL |
| Mongoose | 8.18.0 | ODM para MongoDB |
| Google Gemini | 2.5-flash | Modelo de IA |
| @google/genai | ^1.16.0 | SDK oficial de Google |
| Axios | 1.11.0 | Cliente HTTP |
| dotenv | 17.2.1 | Variables de entorno |

## 📁 Estructura de Archivos

```
ChatBot_IA/
├── README.md
├── .gitignore
├── class_1/               # Fundamentos
│   ├── chatbot.js
│   ├── chatbot2.js
│   ├── package.json
│   └── .http
├── class_2/               # Arquitectura y BD
│   ├── chatbot.js
│   ├── package.json
│   ├── .http
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── chat_controller.js
│   └── schemas/
│       └── conversacion.js
└── class_3/               # Sistema completo
    ├── chatbot.js
    ├── package.json
    ├── .http
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── chat_controller.js
    ├── schemas/
    │   └── conversacion.js
    └── utils/
        └── filterquestions.js
```

## 🎓 Aprendizajes Clave

### Para Estudiantes

1. **Progresión gradual**: Cada clase construye sobre la anterior
2. **Buenas prácticas**: Organización de código y manejo de errores
3. **Tecnologías modernas**: Stack completo de desarrollo backend
4. **IA práctica**: Implementación real con Gemini AI
5. **Persistencia**: Manejo de bases de datos NoSQL

### Para Instructores

- Curso modular y escalable
- Ejemplos prácticos en cada etapa
- Conceptos teóricos aplicados
- Ejercicios incrementales
- Base sólida para expansión

## 🔄 Próximos Pasos Sugeridos

- **Frontend**: Interfaz web para el chatbot
- **Autenticación**: Sistema de usuarios
- **Deploy**: Implementación en la nube
- **Testing**: Pruebas unitarias y de integración
- **WebSockets**: Comunicación en tiempo real
- **Múltiples modelos**: Integración con otros LLMs

## 📞 Contacto

**Autor**: Iván Martínez  
**Institución**: CCOL  
**Repositorio**: [ChatBot_IA](https://github.com/XxIvanstromxX/ChatBot_IA)

---

> Este curso forma parte del programa de capacitación en tecnologías emergentes de CCOL, enfocado en el desarrollo de aplicaciones con inteligencia artificial.
