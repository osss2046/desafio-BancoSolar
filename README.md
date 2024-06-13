# Proyecto Banco Solar

# Configuración:
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
CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50), balance FLOAT CHECK (balance >= 0));
CREATE TABLE transferencias (id SERIAL PRIMARY KEY, emisor INT, receptor INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));
```
