#Ejercicio práctica Módulo Node

#Inicializar el proyecto

Instalar dependencias:
```
npm install
```

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