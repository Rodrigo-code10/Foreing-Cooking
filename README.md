# Foreing-Cooking
Full-Stack Recipe Platform with AI Integration, Payments & VPS Deployment

Aplicación web full-stack diseñada para gestionar y explorar recetas de cocina internacional, integrando autenticación segura,
generación de recetas con Inteligencia Artificial y despliegue en entorno real de producción.

## Features Principales
- Autenticación con JWT
- Gestión de recetas (CRUD completo)
- Subida de imágenes con Cloudinary
- Generación de recetas con IA (Google Gemini)
- Simulación de pagos con Stripe
- Contenerización con Docker
- Deployment real en VPS con dominio personalizado

## Tecnologías principales

### Backend 
- Node.js: Entorno de ejecución para JavaScript del lado del servidor.
- Express.js: Framework para la construcción de la API REST.
- Mongoose: ODM para modelado y gestión de datos en MongoDB.

### Base de Datos
- MongoDB: Base de datos NoSQL orientada a "documentos".

### Autenticación y Seguridad
- jsonwebtoken (JWT): Autenticación basada en tokens.
- bcryptjs: Encriptación segura de contraseñas.
- cors: Configuración de políticas de acceso entre dominios.
- dotenv: Gestión de variables de entorno.

### Gestión de Archivos e Imágenes
- multer: Middleware para subida de archivos.
- cloudinary:  Almacenamiento y gestión de imágenes en la nube.
- multer-storage-cloudinary: Integración directa entre Multer y Cloudinary.


### Pagos 
- Stripe:  Integración de pasarela de pago (simulación).


### Desarrollo

nodemon: Reinicio automático del servidor en entorno de desarrollo.

### Inteligencia Artificial Integrada
El proyecto integra Google Gemini API para generar recetas dinámicamente a partir de un prompt enviado por el usuario.

- Modelo utilizado: gemini-2.5-flash (dependiendo de los intentos disponibles).
- Consumo mediante fetch desde el backend.
- API Key gestionada con variables de entorno.
- Respuesta procesada y enviada como JSON al frontend.


## Deployment en Producción
El proyecto fue desplegado temporalmente en un VPS Linux rentado en Hostinger, configurado manualmente mediante acceso SSH.

Durante el despliegue se configuró un dominio personalizado:
- fooreing-cooking.com.mx

### Proceso Técnico
El entorno fue preparado manualmente en un servidor Linux:
- Conexión remota mediante SSH.
- Instalación de Node.js en el servidor.
- Clonado del repositorio directamente en producción.
- Instalación de dependencias (npm install).
- Configuración de variables de entorno (.env).
- Ejecución del servidor backend.
- Configuración del dominio apuntando al VPS.
- Exposición del servicio mediante puerto configurado.


## UI Preview
### Página principal
Vista inicial de la plataforma donde los usuarios pueden explorar recetas destacadas, acceder a funcionalidades principales y navegar por la aplicación.

<img width="1625" height="968" alt="image" src="https://github.com/user-attachments/assets/857d334f-bbb8-495c-af73-2ba287b2a244" />

### Inicio de Sesión
Pantalla de autenticación que permite a los usuarios registrados acceder a su cuenta de forma segura mediante credenciales validadas.

<img width="1624" height="966" alt="image" src="https://github.com/user-attachments/assets/0a050c7e-b2f6-48d9-b02c-ebc957f427cb" />

### Registro de Cuenta
Pequeño formulario de creación de usuario que permite registrarse en la plataforma para acceder a funcionalidades exclusivas como publicar recetas.

<img width="900" height="532" alt="image" src="https://github.com/user-attachments/assets/a0366141-3e3d-42be-9eab-03ffa5e4e1b1" />

### Búsqueda Avanzada
Sistema de búsqueda que permite filtrar recetas por nombre o ingredientes específicos, facilitando la exploración personalizada.

<img width="1625" height="965" alt="image" src="https://github.com/user-attachments/assets/abbced8c-32c0-49aa-8f7e-1e620719750b" />

### Crear Receta
Panel exclusivo para usuarios autenticados donde pueden registrar nuevas recetas incluyendo ingredientes, instrucciones y detalles adicionales.

<img width="1627" height="961" alt="image" src="https://github.com/user-attachments/assets/70fb7743-209e-4519-afdf-3bf085c6cd86" />

### Perfil de Usuario
Sección personal donde el usuario puede visualizar su información, gestionar sus recetas publicadas y revisar su actividad dentro de la plataforma.

<img width="1628" height="963" alt="image" src="https://github.com/user-attachments/assets/6c379dc1-216a-4ee4-a881-12a8d280a861" />

### Vistas de Recetas
Sección personal donde el usuario puede visualizar su información, gestionar sus recetas publicadas y revisar su actividad dentro de la plataforma.

<img width="1623" height="955" alt="image" src="https://github.com/user-attachments/assets/5967d58b-c7fe-4fe4-acc1-a5f0ae385672" />

### Arquitectura

Frontend → API REST (Express) → MongoDB

Integraciones externas: Cloudinary, Stripe, Google Gemini API

### Estructura del proyecto

```text
Foreing-Cooking/
├── api/                # Lógica de la API REST
├── mongo/              # Scripts y configuración de MongoDB
├── web/                # Frontend
├── docker-compose.yml  # Orquestación de contenedores
├── package.json        # Dependencias
└── .gitignore
```
