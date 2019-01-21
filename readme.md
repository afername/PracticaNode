#Ejercicio práctica Módulo Node

##Inicializar el proyecto

Instalar dependencias:
```
npm install
```


Verifica la cadena de conexión a la base de datos en lib/connectMongoose.js

Puedes utilizar el script de inicialización de la base de datos con:

```shell
npm run install_db
```

## Arranque
Ejecutar la app - Entorno de desarrollo, puerto por defecto (3000):
```
npm start
```
Arranque con variables de entorno (ejemplo arranque en entorno producción):
```
NODE_ENV=production npm start
```
Arranque con variables de entorno (ejemplo arranque con log debug activado)
```
DEBUG=nodepop:* npm start
```
Arranque con variables de entorno (ejemplo arranque con log debug activado, puerto 30001 y entorno producción)
```
DEBUG=nodepop:* npm start
```

Opcionalmente se puede incluir el modo de arranque en el comando start de npm, especificando en el package.json:
```
npm install --save-dev cross-env
...
"scripts": {
"start": "cross-env DEBUG=nombreApp:* PORT=3002 node ./bin/
www"
},
...
```

## Rutas del API

* http://localhost:3000/apiv1/anuncios

Retorna una lista de anuncios

## Otra información

### Para arrancar un servidor de mongodb desde consola:

```shell
./bin/mongod --dbpath ./data/db --directoryperdb
```