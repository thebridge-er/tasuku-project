# 🎮 TASUKU - Gestión de Tareas del Hogar

**TASUKU** es una aplicación Frontend construida íntegramente con **JavaScript Vanilla** y principios de **Programación Orientada a Objetos (POO)**. Su objetivo principal es aplicar buenas prácticas de **Arquitectura Limpia (MVC)** para crear una aplicación robusta, escalable y fácil de mantener, enfocada en la gestión de tareas domésticas en espacios compartidos.

La aplicación permite a los usuarios crear o unirse a un **espacio compartido** (hogar o lugar de trabajo) y distribuir automáticamente tareas del hogar entre los miembros, incorporando un sistema de **gamificación** para incentivar la colaboración.

---

## ✨ Funcionalidades

- **Gestión de usuarios:** Registro, login y administración de perfiles.
- **Espacios compartidos:** Crear hogares o entornos colaborativos donde se distribuyen tareas.
- **Sistema de tareas automatizado:** Asignación semanal de tareas predefinidas, considerando niveles de dificultad (fácil, media, difícil) para equilibrar la carga.
- **Intercambio de tareas:** Posibilidad de que los usuarios intercambien tareas entre ellos.
- **Gamificación y puntos:** Los usuarios obtienen puntos según la rapidez en la realización de tareas y pueden enviar tareas al "limbo".
- **Sistema de penalizaciones y colaboración:** Las tareas no completadas afectan a todo el grupo, fomentando cooperación.
- **Diseño mobile-first:** Interfaz intuitiva inspirada en **Animal Crossing**, con colores y elementos amigables.

---

## 🏗️ Arquitectura del Proyecto

El código sigue **principios de separación de responsabilidades**, garantizando que el núcleo de datos no conozca la interfaz, y la interfaz no gestione directamente el almacenamiento. Todo se coordina mediante un controlador central.

### 1️⃣ Modelos y Colecciones (El Core / Datos)
Clases puras que manejan los datos en memoria:

- **User** y **Task**: Representan las entidades individuales.
- **GenericCollection**: Clase base que gestiona colecciones de elementos usando Map.
- **TaskCollection**: Extiende la base y añade lógica de negocio específica (asignación automática y nivel de dificultad).

### 2️⃣ Infraestructura (Los Managers)
Clases estáticas que comunican la aplicación con el entorno externo:

- **StorageManager:** Maneja persistencia en localStorage o bases de datos locales.
- **DOMManager:** Traduce objetos en elementos HTML y los renderiza en pantalla.
- **NotificationManager:** Gestiona alertas y recordatorios de tareas para los usuarios.

### 3️⃣ Controlador Principal
- **App:** Inicializa datos, escucha eventos de la interfaz y coordina las colecciones con los managers.

---

## 📱 Instalación y Uso

1. Clona este repositorio:

```bash
git clone git@github.com:TuUsuario/Tasuku.git
