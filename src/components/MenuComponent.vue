<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">CRUD</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Géneros
                        </a>
                        <ul class="dropdown-menu">
                            <li class="nav-item" v-for="genero of generos" :key="genero">
                                <router-link :to="'/pelicula/' + genero.idGenero + '/1'" class="dropdown-item nav-link mx-1">
                                    {{genero.nombre}}
                                </router-link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Nacionalidad
                        </a>
                        <ul class="dropdown-menu">
                            <li class="nav-item" v-for="ndad of nacionalidades" :key="ndad">
                                <router-link :to="'/pelicula/' + ndad.idNacionalidad + '/2'" class="dropdown-item nav-link mx-1">
                                    {{ndad.nombre}}
                                    <img :src="ndad.bandera"/>
                                </router-link>
                            </li>
                        </ul>
                    </li>

                    <form class="d-flex" role="search" @submit.prevent="buscarPelicula()">
                        <input class="form-control me-2" v-model="titulo" type="search" placeholder="Título" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import ServicePeliculas from '../services/ServicePeliculas';
    const service = new ServicePeliculas();
    export default {
        name : "MenuComponent",
        methods : {
            loadGeneros() {
                service.getGeneros("/api/generos").then((result) => {
                    this.generos = result;
                });
            },
            loadNacionalidades() {
                service.getNacionalidades("/api/nacionalidades").then((result) => {
                    this.nacionalidades = result;
                });
            },
            buscarPelicula() {
                var title = this.titulo;
                this.titulo = "";
                this.$router.push("/pelicula/" + title + "/3");
            }
        },
        data() {
            return {
                generos : null,
                nacionalidades : null,
                titulo : "",
                peliculas : []
            }
        },
        mounted() {
            this.loadGeneros();
            this.loadNacionalidades();
        }
    }
</script>

<style>

</style>