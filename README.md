# Proyecto Banco Solar

## Configuración:
Este es un proyecto Full Stack que cuenta con cliente-servidor y una base de datos gestionada con postgreSQL.
El para ejecutar el proyecto primero se necesita importar las dependencias necesarias con:
```
npm install
```
Además cuenta con nodemon para ejecutar en el servidor local, por lo tanto se ejecuta con el comando:
```
npm run dev
```
Además se debe crear una base de datos con las tablas (de todas maneras deje un archivo .sql con las tablas). la base de datos y tablas se deben crear de la siguiente manera en pq:
```
CREATE DATABASE bancosolar;
CREATE TABLE usuarios
(id SERIAL PRIMARY KEY, nombre VARCHAR(50), balance FLOAT CHECK (balance >= 0));
CREATE TABLE transferencias
(id SERIAL PRIMARY KEY,
 emisor INT,
 receptor INT,
 monto FLOAT,
 fecha TIMESTAMP,
 FOREIGN KEY (emisor) REFERENCES usuarios(id),
 FOREIGN KEY (receptor) REFERENCES usuarios(id));
```

## Funcionalidad del Proyecto

Este proyecto esta pensando como una Banco en el cual se pueden registrar usuarios, los cuales se registran por el cliente introduciendo un nombre y un monto inicial.
Se pueden incluir la cantidad de clientes que sean necesarios.
Luego se pueden realizar transferencias entre los clientes, por ejemplo si usuario Oscar tiene inicialmente $200 y usuario Luis tiene inicialmente $0, el primer usuario 
puede transferir una cantidad de $100 al otro usuario, quedando ambos con $100. Estos cambios se ven reflejados en la base de datos.

## Posibles mejoras

En la mayoria de las ocasiones, cuando se realiza una acción desde el cliente (principalmente transferencias) esta solicitud se ejecuta inmediatamente en el servidor, pero
la pagina no se actualiza automaticamente con los nuevos resultados y constantemente es necesario refrescar (f5) para ver los resultados más actuales.

