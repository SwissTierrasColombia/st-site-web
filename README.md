# Frotend sistema de transición

Este proyecto se generó con [Angular CLI] (https://github.com/angular/angular-cli) versión 8.3.15.

## Configuración variables de entorno

dentro del directorio `/src/environments` crear los archivos de variables de entorno de desarrollo y producción

```bash
# Variables de desarrollo
touch environment.ts
# Variables de producción
touch environment.prod.ts
```
Tomar de referencia los [templates](https://github.com/AgenciaImplementacion/st-site-web/blob/master/src/environments/) de variables de entorno.

## Servidor de desarrollo

Ejecute `ng serve` para un servidor de desarrollo. Navegue a `http://localhost:4200/`. La aplicación se volverá a cargar automáticamente si cambia alguno de los archivos de origen.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Ejecución de pruebas unitarias

Ejecute `ng test` para ejecutar las pruebas unitarias a través de [Karma] (https://karma-runner.github.io).

## Ejecución de pruebas de extremo a extremo

Ejecute `ng e2e` para ejecutar las pruebas de extremo a extremo a través de [Protractor] (http://www.protractortest.org/).

## Ayuda adicional

Para obtener más ayuda sobre la CLI Angular, use `ng help` o visite el [Angular CLI README] (https://github.com/angular/angular-cli/blob/master/README.md).
