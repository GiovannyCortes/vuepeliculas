import axios from "axios";
import Global from "../Global";

export default class ServicePeliculas {

    getGeneros(request) {
        return new Promise(function(resolve) {
            var url = Global.urlPeliculas + request;
            var miArray = []; // Obtendré un array de objetos
            axios.get(url).then(response => {
                miArray = response.data; // Asigno a mi array, los datos recibidos
                resolve(miArray); // Devuelvo el array de datos 
            });
        });
    }

    getNacionalidades(request) {
        return new Promise(function(resolve) {
            var url = Global.urlPeliculas + request;
            var miArray = []; // Obtendré un array de objetos
            axios.get(url).then(response => {
                miArray = response.data; // Asigno a mi array, los datos recibidos
                resolve(miArray); // Devuelvo el array de datos 
            });
        });
    }

    getPeliculasFiltradas(request, identificador) {
        return new Promise(function(resolve) {
            var url = Global.urlPeliculas + request + identificador;
            var miArray = []; 
            axios.get(url).then(response => {
                miArray = response.data; 
                resolve(miArray); 
            });
        });
    }

    getPeliculasTitulo(request, titulo) {
        return new Promise(function(resolve) {
            var url = Global.urlPeliculas + request + titulo;
            var miArray = []; 
            axios.get(url).then(response => {
                miArray = response.data; 
                resolve(miArray); 
            });
        });
    }

    getPelicula(request, identificador) {
        return new Promise(function(resolve) {
            var url = Global.urlPeliculas + request + identificador;
            var miObjeto = {}; // Obtendré un único objeto
            axios.get(url).then(response => {
                miObjeto = response.data; // Asigno a mi objeto, los datos recibidos
                resolve(miObjeto); // Devuelvo el objeto 
            });
        });
    }

    getFiltro(request, identificador) {
        return new Promise(function(resolve) {
            var url = Global.urlPeliculas + request + identificador;
            var miObjeto = {}; 
            axios.get(url).then(response => {
                miObjeto = response.data; 
                resolve(miObjeto); 
            });
        });
    }

    deletePelicula(request, identificador) {
        return new Promise(function(resolve) {
            var url = Global.urlPeliculas + request + identificador;
            axios.delete(url).then(response => {
                resolve(response); 
            });
        });
    }

    updatePelicula(request, idPelicula, idGenero) {
        return new Promise(function(resolve) {
            var url = Global.urlPeliculas + request + idPelicula + "/" + idGenero;
            axios.put(url).then(response => {
                resolve(response); 
            });
        });
    }

}