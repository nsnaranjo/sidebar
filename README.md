# SPAD CLOUD DASHBOARD

## Tecnologías Implementadas

[Angular CLI](https://github.com/angular/angular-cli) versión 17.3.8.

[Node.js](https://nodejs.org/en/download/package-manager) versión 20.13.1

[Native Federation for Angular](https://www.npmjs.com/package/@angular-architects/native-federation/v/17.1.8) versión 17.1.8

[Keycloak Angular](https://www.npmjs.com/package/keycloak-angular/v/15.3.0) versión 15.2.1

[Keycloak.js](https://www.npmjs.com/package/keycloak-angular/v/15.3.0) versión 24.0.3

## Inicialización del Proyecto

Creación del `workspace`.

```shell
  ng new SPAD-DASHBOARD --create-application=false
```

Creación de la aplicación dentro del `workspace`.

```shell
  cd SPAD-DASHBOARD
```

```shell
  ng generate application dashboard --routing --style=scss
```

Configurar el puerto de ejecución en la propiedad `serve` en el archivo `angular.json`

```json
  "serve": {
    "options": {
      "port": 4203
    }
  }
```

## Instalación de Keycloak

Instalar la depencia de Keycloak para angular en las versiones compatibles para el proyecto utilizar el siguiente comando.

```shell
  npm install keycloak-angular@^15.2.1 keycloak-js@^24.0.3
```

## Instalación y Configuración de Native Federation

Dentro del `workspace SPAD-DASHBOARD` instalar la siguiente dependencia.

```shell
  npm install @angular-architects/native-federation@17.1.8 -D
```

Configurar la aplicación `dashboard` como aplicación `shell` para la arquitectura de microfronends.

```shell
  ng g @angular-architects/native-federation:init --project dashboard --port 4203 --type dynamic-host
```

## Ejecutar la Aplicación

Ingresar a la carpeta donde se encuentra el proyecto.

```shell
  cd SPAD-DASHBOARD
```

Instalar dependencias.

```shell
  npm install
```

Ejecutar el siguiente comando para iniciar el servidor de desarrollo de Angular.

```shell
  ng serve
```

La aplicación se iniciará en la ruta `http://localhost:4203`.
