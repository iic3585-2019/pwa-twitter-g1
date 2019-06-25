En este repo se encuentra el codigo de una PWA con una funcionalidad parecida a la de twitter. Esta muestra notificaciones de cuando un usuario ingresa un post y se puede añadir al inicio de los dispositivos móviles.

# Instalación

Para instalar las dependencias se debe tener instalado `node` y `yarn`. Una vez hecho esto basta con ejecutar el comando

```
yarn
```

para instalar las dependencias.

# Ejecutar el programa

Para ejecutarlo basta con correr el script 

```
yarn start
```

# Archivos importantes

### `src/app/db`

En este modulo se encuentra el codigo necesario para almacenar y notificar de nuevos posts a los demas usuarios.

### `src/app/index.js`

En este modulo se encuentra el vínculo entre los componentes html y el codigo que maneja nuestra base de datos.

### `src/app/service-worker.js`

En este modulo se encuentra el codigo del service worker que permite interactuar con el sistema de notificaciones del entorno en donde se ejecuta la aplicación. 
