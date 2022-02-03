# Front-end Sistema de Catastro Multipropósito

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

## Servidor de Producción

### Requerimientos

#### Requerimientos de hardware

- **4** GB de RAM **mínimo**
- **12** GB de disco duro **mínimo**

#### Requerimientos de software

- git **2.20.1**
- nodejs **> 10.15.0** 
- angular **10**
- nginx **1.14.2**

### Configuración

#### Clonar el repositorio

Se debe clonar el repositorio **st-site-web** almacenado en el github de la Agencia.

```sh
git clone https://github.com/AgenciaImplementacion/st-site-web.git
```

#### Acceder al repositorio

Es importante ubicarse en la rama master ya que es la versión de producción.

```bash
cd st-site-web && git checkout master
```

#### Generar compilación

Primero instalamos las dependencias del proyecto con nodejs y luego creamos la compilación de él con Angular.

```bash
npm install
ng build --prod
```
Tener en cuenta que debes tener los environmets configurados dentro del frontend

### Configuración Nginx

Este servidor sirve para el despliegue del frontend por la IP especifica del servidor:
- Habilitamos el servidor Nginx
    ```bash 
    sudo systemctl enable nginx
    ```
- Creamos el directorio donde se almacenara la compilación del Frontend con los siguientes permisos
    ```bash 
    sudo mkdir -p /var/www/st/html
    sudo chown -R $USER:$USER /var/www/st/html
    sudo chmod -R 755 /var/www/st
    ```
- Creamos un enlace simbolico del directorio en los sitios habilitados de nginx
    ```bash 
    sudo ln -s /etc/nginx/sites-available/st /etc/nginx/sites-enabled/
    ```
- Ingresamos al archivo de configuraciones de Nginx en la ruta /etc/nginx/nginx.conf
  - descomentareamos la variable 
    ```sh 
    server_names_hash_bucket_size 64;
    ```
- Creamos el archivo de los sitios habilitados para nuestro servidor:
  - Reemplazamos las variables $PUERTO_SERVIDOR Y $IP_SERVIDOR, por la del servidor a configurar. 
    ```sh
        server {
        listen $PUERTO_SERVIDOR;
        listen [::]: $PUERTO_SERVIDOR;

        root /var/www/st/html/dist/st-site-web;
        index index.html index.htm index.nginx-debian.html;

        server_name $IP_SERVEVIDOR;

        location / {
                try_files $uri $uri/ /index.html;
        }
    }
    ```
 - Comprobamos la sintaxis de los archivos configurados y Reiniciamos el servidor nginx
    ```bash 
    sudo nginx -t
    sudo systemctl restart nginx
    ```


#### Desplegar Frontend

Se debe copear el directorio "dist" generado en el proyecto st-site-web en la carpeta de sitios activos de Nginx

```bash
cp -R dist /var/www/st/html/
```


