# Notas App
=====================================

## Descripción
---------------

Notas App es una aplicación web diseñada para gestionar notas de manera eficiente y segura. Permite a los usuarios crear, editar y eliminar notas, así como compartir ellas con otros usuarios.

## Stack Tecnológico
---------------------

* **Backend**: Node.js con Express.js
* **Base de datos**: MongoDB
* **Autenticación**: JWT (JSON Web Tokens)
* **Frontend**: React.js (opcional)

## Instalación
--------------

1. Clonar el repositorio: `git clone https://github.com/usuario/notas-app.git`
2. Instalar dependencias: `npm install`
3. Iniciar servidor: `npm start`

## Docker
---------

### Construir imagen

1. Construir imagen: `docker build -t notas-app .`
2. Iniciar contenedor: `docker run -p 3000:3000 notas-app`

### Utilizar imagen de Docker Hub

1. Iniciar contenedor: `docker run -p 3000:3000 usuario/notas-app`

## Endpoints
------------

### Notas

* **GET /notas**: Obtener todas las notas del usuario
* **POST /notas**: Crear una nueva nota
* **GET /notas/:id**: Obtener una nota por ID
* **PUT /notas/:id**: Editar una nota
* **DELETE /notas/:id**: Eliminar una nota

### Usuarios

* **POST /usuarios**: Crear un nuevo usuario
* **POST /usuarios/login**: Iniciar sesión
* **GET /usuarios**: Obtener información del usuario actual

## Seguridad
------------

* **Autenticación**: Se utiliza JWT para autenticar a los usuarios
* **Autorización**: Se verifica el token de autenticación en cada solicitud
* **Encriptación**: Se utiliza HTTPS para encriptar las comunicaciones entre el cliente y el servidor
* **Validación de datos**: Se validan los datos de entrada para prevenir ataques de inyección SQL y XSS

## Contribuir
------------

1. Clonar el repositorio
2. Crear una rama para la nueva funcionalidad
3. Implementar la funcionalidad
4. Realizar pruebas unitarias y de integración
5. Crear un pull request para revisar y mergear los cambios

## Licencia
---------

Este proyecto está licenciado bajo la licencia MIT.