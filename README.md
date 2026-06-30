# 🛒 Tienda Vive - Sistema Full Stack de Inventario

Este es el proyecto de desarrollo de software **Tienda Vive**, una aplicación web full stack diseñada para la gestión integral de usuarios, categorías y productos de inventario.

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React.js** (Desarrollado con Vite)
- **CSS3** nativo (Diseño responsivo y componentes modulares en cuadrícula)
- **JavaScript Moderno (ES6+)**

### Backend
- **Java 17**
- **Spring Boot 3**
- **Spring Data JPA** (Persistencia y mapeo relacional)
- **Controladores REST** (Mapeo de endpoints HTTP)

### Base de Datos
- **MySQL** (Relacional)

---

## 🚀 Instrucciones para Ejecución Local

### 1. Base de Datos
1. Abre tu gestor de MySQL (Workbench, phpMyAdmin, etc.).
2. Crea una base de datos limpia con el nombre: `tienda_vive`.
3. Importa el archivo de base de datos incluido en la raíz: `tiendavive_backup.sql`.
4. Asegúrate de configurar tus credenciales de base de datos (`username` y `password`) en el archivo `src/main/resources/application.properties` del proyecto backend (`demo`).

### 2. Configuración y Arranque del Backend (Spring Boot)
1. Abre la carpeta del backend (`demo`) en tu IDE preferido (STS4, IntelliJ o VS Code).
2. Deja que Maven descargue las dependencias necesarias indicadas en el archivo `pom.xml`.
3. Ejecuta la aplicación como **Spring Boot App**. El servidor se levantará de forma predeterminada en el puerto `8080`.

### 3. Configuración y Arranque del Frontend (React)
1. Desde la terminal, ingresa a la carpeta del frontend:
   ```bash
   cd mi_front