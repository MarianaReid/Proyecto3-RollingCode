# Proyecto final – Backend – Comisión 17i
<p align="center"> <img src="server/logo.png" alt="logo-burgerhouse" height="200" width="200"/> </p>

## 👪 Integrantes: 
- [Veronica Menichetti](https://github.com/VMenichetti)
- [Andressa Arcocha](https://github.com/AndressaArcocha)
- [Esteban Orrego](https://github.com/eOrrego)
- [Mariana Reid](https://github.com/MarianaReid)
- [Enzo Lobo](https://github.com/elobo81)
- [Emmanuel Rizza](https://github.com/Emmanuelrizza)

## ⬇️ Instalación 
El Backend de esta página esta deployado en Vercel:
 Enlace:
```
https://proyecto3-rolling-code.vercel.app/api
```

Para correr en local nuestra api, deberemos llevar  a cabo los siguientes pasos:

1. Clonamos el repositorio
```
git clone https://github.com/MarianaReid/Proyecto3-RollingCode
```
2. Instalamos todas las dependencias
```
npm install
```
3. Ejecutamos la aplicacion web
```
npm run
```

## 🧪 Testeo

Para facilitar el envio de datos a la API se adjuntan modelos para productos, pedidos, login y registro

## 📗 Bibliotecas Externas

 - dotenv
 - cors 
 - mongoose
 - morgan
 - bcrypts

## 🍔 Rama de productos 

- Modelo: 

 ```json
{
  "name": "nombre del producto",
  "stock": true,
  "price": 100,
  "description": "detalle del producto",
  "categories": "categoria del producto",
  "image": "url de la imagen"
}
``` 

## ▶️ Rama de pedidos 

- Modelo: 

 ```json
{
    "products":"Nombre del producto",
    "price":100,
}
``` 

## 🙍 Login y registro 

 - Modelo Registro: 
 ```json
{
    "name":"Nombre de usuario",
    "email":"ejemplo@ejemplo.com",
    "password":"ejemplo"
    "image":"Imagen de perfil"
    "role":"rol de la cuenta"
    "state":"estado del perfil"
}
``` 

  - Modelo Login:

 ```json
{
    "email":"ejemplo@ejemplo.com",
    "password":"ejemplo"
}
``` 
