
# PingTracer - Utilidad de Red (Versión Web)

Esta es una aplicación web simple que te permite ejecutar `ping` y `traceroute` a una dirección IP desde tu navegador, con la ayuda de un pequeño servidor local.

## Arquitectura

- **Frontend**: Una página `index.html` con CSS (`style.css`) y JavaScript (`app.js`). Esta es la interfaz que ves y con la que interactúas en tu navegador.
- **Backend**: Un servidor `server.js` construido con Node.js y Express. El navegador le pide a este servidor que ejecute los comandos de forma segura, ya que el navegador por sí solo no puede hacerlo.

## Requisitos

- **Node.js** y **npm** instalados. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).

## Cómo Ejecutar la Aplicación

Sigue estos pasos en tu terminal, dentro de la carpeta del proyecto.

### 1. Instalar Dependencias

Primero, el servidor necesita instalar las librerías que hemos definido en `package.json` (express y cors).

```bash
npm install
```

### 2. Iniciar el Servidor Backend

Ahora, inicia el servidor. Se quedará corriendo en tu terminal, esperando peticiones del frontend.

```bash
node server.js
```
Verás un mensaje que dice `Servidor backend escuchando en http://localhost:3000`.

### 3. Abrir la Aplicación en el Navegador

Con el servidor corriendo, simplemente **abre el archivo `index.html` directamente en tu navegador web** (puedes hacer doble clic en él desde tu explorador de archivos).

¡Y listo! La página web se conectará automáticamente con tu servidor local para ejecutar los comandos.

## Resumen de la Conversación y Diagrama de Flujo

---

### Resumen de la Solución Final

Hemos reemplazado la aplicación nativa de SwiftUI por una solución web completa. Esto incluye un frontend (`index.html`, `style.css`, `app.js`) y un backend de Node.js (`server.js`, `package.json`) que es necesario para ejecutar los comandos de red de forma segura. También se ha actualizado el `README.md` con instrucciones detalladas sobre cómo instalar las dependencias de Node.js, iniciar el servidor y abrir la aplicación.

### Diagrama de Flujo del Funcionamiento de la Aplicación

```
+----------------------------------------------------------------------------------------------------------------+
|                                         DIAGRAMA DE FLUJO DE LA APLICACIÓN                                       |
+----------------------------------------------------------------------------------------------------------------+
|         USUARIO                  |            NAVEGADOR (Frontend)            |          SERVIDOR (Backend)         |
|----------------------------------|--------------------------------------------|-------------------------------------|
| 1. Abre `index.html`             |                                            |                                     |
|                                  | 2. Carga la página, muestra la interfaz.   |                                     |
|                                  |    (app.js empieza a escuchar eventos)     |                                     |
|----------------------------------|--------------------------------------------|-------------------------------------|
| 3. Escribe una dirección IP.     |                                            |                                     |
|                                  | 4. EN CADA TECLA: Valida el texto con      |                                     |
|                                  |    expresión regular.                      |                                     |
|                                  |                                            |                                     |
|                                  | 5. Actualiza el indicador visual           |                                     |
|                                  |    (punto verde/rojo) y activa/desactiva   |                                     |
|                                  |    los botones.                            |                                     |
|----------------------------------|--------------------------------------------|-------------------------------------|
| 6. Hace clic en "Ping" o         |                                            |                                     |
|    "Traceroute".                 |                                            |                                     |
|                                  | 7. Muestra "Ejecutando..." en la           |                                     |
|                                  |    pantalla de resultados.                 |                                     |
|                                  |                                            |                                     |
|                                  | 8. Envía una petición `fetch` (POST) a     |                                     |
|                                  |    `http://localhost:3000/api/run`         |                                     |
|                                  |    con un JSON: { command, ip }.           |                                     |
|                                  |                                          \ | /                                   |
|                                  |                                           V                                    |
|----------------------------------|--------------------------------------------|-------------------------------------|
|                                  |                                            | 9. Recibe la petición en `/api/run`.  |
|                                  |                                            |                                     |
|                                  |                                            | 10. **VALIDA LA PETICIÓN**:         |
|                                  |                                            |     - ¿El comando es "ping" o       |
|                                  |                                            |       "traceroute"?                 |
|                                  |                                            |     - ¿La IP es válida?             |
|                                  |                                            |                                     |
|                                  |                                            | 11. Construye el comando de shell   |
|                                  |                                            |     (ej: `ping -c 5 8.8.8.8`).      |
|                                  |                                            |                                     |
|                                  |                                            | 12. Usa `child_process.exec()` para |
|                                  |                                            |     ejecutar el comando en el       |
|                                  |                                            |     sistema operativo.              |
|                                  |                                            |                                     |
|                                  |                                            | 13. Espera a que el comando termine |
|                                  |                                            |     y captura la salida o el error. |
|                                  |                                            |                                     |
|                                  |                                            | 14. Envía la salida del comando     |
|                                  |                                            |     como respuesta a la petición.   |
|                                  |                                           / | \                                  |
|                                  |                                          V                                     |
|----------------------------------|--------------------------------------------|-------------------------------------|
|                                  | 15. Recibe la respuesta del servidor.      |                                     |
|                                  |                                            |                                     |
|                                  | 16. Muestra el texto de la respuesta       |                                     |
|                                  |     en la pantalla de resultados.          |                                     |
|----------------------------------|--------------------------------------------|-------------------------------------|
| 17. Lee el resultado del         |                                            |                                     |
|     comando en la pantalla.      |                                            |                                     |
+----------------------------------------------------------------------------------------------------------------+
