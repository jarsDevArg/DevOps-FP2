# Proyecto Docker - Práctica Formativa Obligatoria N° 2

Este repositorio contiene los archivos de Docker utilizados como parte de la Práctica Formativa Obligatoria N° 2.

## Parte 1

### Contenido del Repositorio

* **`index.php`**: Este archivo contiene la estructura html y la conección a la base de datos.
* **`docker-compose.yml`**: Este archivo define y gestiona los servicios de Docker para la aplicación web (`web`) y la base de datos (`db`). Utiliza Docker Compose para orquestar ambos contenedores.
* **`docker/web/Dockerfile`**: Este archivo contiene las instrucciones para construir la imagen Docker del servicio web (PHP con Apache).

### Configuración de Docker

#### `docker-compose.yml`

El archivo `docker-compose.yml` configura los siguientes servicios:

* **`web`**:
    * **`build: ./docker/web`**: Indica que la imagen para este servicio se construirá utilizando el `Dockerfile` ubicado en el directorio `./docker/web`.
    * **`volumes:`**:
        * `- ./:/var/www/html/`: Monta el directorio local del proyecto dentro del directorio `/var/www/html/` del contenedor web. Esto permite que los cambios en el código local se reflejen dentro del contenedor.
    * **`ports:`**:
        * `- "80:80"`: Mapea el puerto 80 del contenedor al puerto 80 de la máquina host, permitiendo acceder a la aplicación web a través de `http://localhost`.
* **`db`**:
    * **`image: mysql`**: Utiliza la imagen oficial de MySQL desde Docker Hub.
    * **`volumes:`**:
        * `db:/var/lib/mysql/`: Crea un volumen nombrado `db` para persistir los datos de la base de datos.
    * **`environment:`**: Define las variables de entorno para configurar la base de datos MySQL:
        ...
    * **`ports:`**:
        * `- "3306:3306"`: Mapea el puerto 3306 del contenedor MySQL al puerto 3306 de la máquina host, permitiendo la conexión desde herramientas como MySQL Workbench.
* **`volumes:`**:
    * `db`: Define el volumen nombrado `db` para la persistencia de datos de MySQL.

#### `docker/web/Dockerfile`

El `Dockerfile` para el servicio `web` (PHP con Apache) incluye la siguiente configuración:

```dockerfile
FROM php:apache

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
````
### Comandos de Docker Utilizados

  * **Descarga de Imágenes Base:**
    * **`docker pull php:apache`**: Este comando se ejecutó para descargar la imagen base del entorno PHP con servidor web Apache para servir la aplicación.
    * **`docker pull mysql`**: Este comando se ejecutó para descargar la imagen base del servidor de base de datos MySQL desde Docker Hub.

  * **Orquestación con Docker Compose:**
    * **`docker-compose up -d`**: Una vez definidos los servicios (`web` y `db`) en el archivo `docker-compose.yml`, este comando se utilizó para crear y levantar los contenedores. Docker Compose automáticamente crea las redes necesarias y arranca los contenedores interconectados según la configuración.
    * **`docker-compose build web`**: Este comando se ejecutó para construir una nueva imagen para el servicio `web`.

 * **Publicación de imagen web en DockerHub:**
    * **`docker tag pf2-web:latest jarsdev/pf2-web:latest`**: Agregar nombre de usuario de Docker Hub a las tags.
    * **`docker-compose build web`**: Después de realizar modificaciones en el `Dockerfile` del servicio `web` (por ejemplo, para instalar la extensión `mysqli` de PHP), este comando se ejecutó para construir una nueva imagen para el servicio `web` basada en las instrucciones del `Dockerfile`. Los cambios en el `Dockerfile` solo se aplican a los contenedores después de reconstruir la imagen.
    * **`docker login`**: Inicio de seción en Docker Hub.
    * **`docker push jarsdev/pf2-web:latest`**: Publicar la imagen en Docker Hub.

* **Enlace a Docker Hub:**
   * https://hub.docker.com/r/jarsdev/pf2-web
     
## Parte 2

### Contenido del Repositorio

* **`docker-compose.yml`**: Este archivo define y gestiona el servicio de Docker para la aplicación web.
* **`index.html`**: Este archivo contiene la estructura html.
* **`css/main.css`**: Este archivo define los estilos.
* **`js/main.js`**: Este archivo se conecta con una API y popula el html con los datos obtenidos.

### Configuración de Docker

#### `docker-compose.yml`

El archivo `docker-compose.yml` configura el servicio web:

* **`web`**:
    * **`image: httpd:latest`**: Indica que la imagen para este servicio se construirá utilizando el `Dockerfile` ubicado en el directorio `./docker/web`.
    * **`ports:`**:
        * `- "80:80"`: Mapea el puerto 80 del contenedor al puerto 80 de la máquina host, permitiendo acceder a la aplicación web a través de `http://localhost`.
    * **`volumes:`**:
        * `- ./:/usr/local/apache2/htdocs/`: Monta el directorio local del proyecto dentro del directorio `/usr/local/apache2/htdocs/` del contenedor web. Esto permite que los cambios en el código local se reflejen dentro del contenedor.

### Comandos de Docker Utilizados

  * **Descarga de Imágenes Base:**
    * **`docker pull httpd:latest`**: Este comando se ejecutó para descargar la imagen base del entorno PHP con servidor web Apache para servir la aplicación.
    
  * **Orquestación con Docker Compose:**
    * **`docker-compose up -d`**: Una vez definido el servicio web en el archivo `docker-compose.yml`, este comando se utilizó para crear y levantar el contenedor. 
