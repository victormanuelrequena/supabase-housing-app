# 📄 Documentación del Proyecto

## 🌟 Introducción

Esta aplicación web fue desarrollada con **Next.js** y **Supabase**, permitiendo a los usuarios registrarse, iniciar sesión y gestionar información relacionada con sus viviendas. El diseño moderno y responsivo se implementó utilizando **Tailwind CSS**, mientras que las animaciones se realizaron con **Framer Motion** para una experiencia de usuario dinámica.

A continuación, se presenta la estructura, funcionalidades y configuración del proyecto.

---

## 🗂️ Estructura del Proyecto

El proyecto se estructuró en carpetas y archivos clave para garantizar claridad y modularidad:

- **app/**
  - `registro/`: Página para el registro de nuevos usuarios.
  - `login/`: Página para el inicio de sesión.
  - `datos/`: Página para la gestión y visualización de datos de vivienda.
- **utils/**
  - `supabase.ts`: Configuración de la conexión con Supabase.
  - `storage.ts`: Funciones desarrolladas para manejar el almacenamiento local.
- **globals.css**: Estilos globales de la aplicación.
- **tailwind.config.ts**: Configuración personalizada de Tailwind CSS.
- **layout.tsx**: Plantilla de diseño general de la aplicación.

---

## 🚀 Funcionalidades

### 1️⃣ **Registro de Usuarios**

**📋 Descripción:**  
Se implementó un sistema que permite a los usuarios registrarse proporcionando su correo electrónico, nombre de usuario y contraseña.

**⚙️ Detalles Técnicos:**

- Se diseñó un formulario en `app/registro/page.tsx` para capturar los datos del usuario.
- La función `handleRegistro` interactúa con la API de Supabase para registrar nuevos usuarios.
- Los datos de vivienda se almacenan automáticamente en Supabase o localmente en caso de error.

---

### 2️⃣ **Inicio de Sesión**

**📋 Descripción:**  
Se desarrolló una funcionalidad que permite a los usuarios iniciar sesión de manera segura utilizando su correo y contraseña.

**⚙️ Detalles Técnicos:**

- Se creó un formulario en `app/login/page.tsx` para la autenticación de usuarios.
- La función `handleLogin` valida las credenciales del usuario con la API de Supabase.
- Una vez autenticados, los usuarios son redirigidos automáticamente a la página de gestión de datos.

---

### 3️⃣ **Gestión de Datos de Vivienda**

**📋 Descripción:**  
Se implementó una interfaz para que los usuarios puedan visualizar y gestionar información relacionada con sus viviendas.

**⚙️ Detalles Técnicos:**

- La página `app/datos/page.tsx` muestra una tabla con los datos de vivienda del usuario.
- Se utilizó `useEffect` para verificar sesiones activas y cargar datos desde Supabase o el almacenamiento local.
- La funcionalidad de cierre de sesión redirige al usuario a la página de inicio de sesión.

---

### 4️⃣ **Estilo y Animaciones**

**📋 Descripción:**  
Se logró un diseño atractivo y responsivo, acompañado de animaciones suaves para mejorar la experiencia del usuario.

**⚙️ Detalles Técnicos:**

- **Tailwind CSS** se utilizó para aplicar un diseño limpio, responsivo y fácil de mantener.
- **Framer Motion** se empleó para animar transiciones de páginas y elementos interactivos.

---

## ⚙️ Configuración de Supabase

El proyecto se configuró para integrarse correctamente con Supabase. Los pasos realizados fueron los siguientes:

1. **Creación del Proyecto en Supabase**:  
   Se generó un nuevo proyecto en Supabase desde su panel de control.
2. **Configuración de la Autenticación**:  
   Se habilitó la autenticación por correo electrónico y se desactivó la confirmación por correo para agilizar el inicio de sesión.
3. **Configuración de la Base de Datos**:  
   Se crearon las tablas necesarias para almacenar usuarios y datos de vivienda.
4. **Obtención de Credenciales**:  
   Se copió la URL del proyecto y la clave de API para integrarlas en la configuración del proyecto.

---

## 📌 Conclusión

Esta aplicación web fue diseñada e implementada integrando **Next.js**, **Supabase** y **Tailwind CSS**, ofreciendo una solución eficiente para la gestión de datos de vivienda. Las funcionalidades completadas, como el registro, inicio de sesión y administración de datos, garantizan una experiencia de usuario fluida e intuitiva.

Esta documentación brinda una visión clara de la implementación y estructura del proyecto, lo que facilita su mantenimiento y escalabilidad en el futuro.

---

**💻 Desarrollado con pasión y tecnología moderna.**
