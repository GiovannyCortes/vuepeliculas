<template>
  <div>
    <div v-if="peliculas">
        <h2 class="text-bg-primary py-2 font-monospace" v-if="this.$route.params.option == 1">
            Películas por Género: {{ this.filtro.nombre }}
        </h2>
        <h2 class="text-bg-primary py-2 font-monospace" v-if="this.$route.params.option == 2">
            Películas por Nacionalidad: {{ this.filtro.nombre }}
        </h2>
        <h2 class="text-bg-primary py-2 font-monospace" v-if="this.$route.params.option == 3">
            Películas: '{{this.$route.params.identificador}}'
        </h2>
        <table class="table table-dark border-info mx-auto w-75 align-middle" style="max-width: 1000px;">
            <thead>
                <tr>
                    <th>Películas</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pelicula of peliculas" :key="pelicula">
                    <td>
                        <img class="pointeable" v-if="pelicula.idPelicula != this.seleccionado" @click="seleccionarImagen(pelicula.idPelicula)" :src="pelicula.foto" style="max-width: 200px;">
                        <DetallePeliculas v-if="pelicula.idPelicula == this.seleccionado" :identificador="pelicula.idPelicula" :idGen="pelicula.idGenero" class="my-2"/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <img v-else src="../assets/cargando.gif">
  </div>
</template>

<script>
    import ServicePeliculas from '../services/ServicePeliculas';
    import DetallePeliculas from './DetallePeliculas.vue';

    const service = new ServicePeliculas();
    export default {
        name : "PeliculasComponent",
        components : {
            DetallePeliculas
        },
        methods : {
            loadPeliculas() {
                var request = "/api/peliculas/";
                    request += (this.$route.params.option == 1)? ("/peliculasgenero/") : ("/peliculasnacionalidad/");
                var identificador = this.$route.params.identificador;
                service.getPeliculasFiltradas(request, identificador).then(result => {
                    this.peliculas = result;
                });
            },
            loadPeliculasFiltradas() {
                service.getPeliculasTitulo("/api/peliculas/peliculastitulo/", this.$route.params.identificador).then((result) => {
                    this.peliculas = result;
                });
            },
            loadFiltro() {
                var request = (this.$route.params.option == 1)? "/api/generos/" : "/api/nacionalidades/";
                service.getFiltro(request, this.$route.params.identificador).then((result) => {
                    this.filtro = result;
                });
            },
            seleccionarImagen(idValor) {
                this.seleccionado = idValor;
            }
        },
        watch : {
            "$route.params.option"(nextVal, oldVal) {
                if (nextVal != oldVal) {
                    this.seleccionado = -1;
                    if (this.$route.params.option != 3) {
                        this.loadPeliculas();
                        this.loadFiltro();
                    } else {
                        this.loadPeliculasFiltradas();
                    }
                }
            },
            "$route.params.identificador"(nextVal, oldVal) {
                if (nextVal != oldVal) {
                    this.seleccionado = -1;
                    if (this.$route.params.option != 3) {
                        this.loadPeliculas();
                        this.loadFiltro();
                    } else {
                        this.loadPeliculasFiltradas();
                    }
                }
            }
        },
        data() {
            return {
                peliculas : null,
                seleccionado : -1,
                filtro : ""
            }
        },
        mounted() {
            if (this.$route.params.option != 3) {
                this.loadPeliculas();
                this.loadFiltro();
            } else {
                this.loadPeliculasFiltradas();
            }
        }
    }
</script>

<style>
    .pointeable:hover {
        cursor: pointer;
    }
</style>