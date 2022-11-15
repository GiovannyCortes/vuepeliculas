<template>
  <div>
    <div v-if="pelicula">
        <div class="border rounded bg-light mx-auto p-2 d-inline-block" style="max-width: 80vw;">
            <img :src="pelicula.foto" class="mb-3" style="max-height: 40vh; max-width: 90%;"/>
            <h2 class="fw-bold text-dark">{{ pelicula.titulo }}</h2>
            <p class="text-dark">{{ pelicula.argumento }}</p>
            <a class="btn btn-danger" :href="pelicula.youTube">
                YouTube
            </a> &nbsp;
            <button class="btn btn-danger" @click="eliminarPelicula(pelicula.idPelicula)">
                Eliminar
            </button> <br/>
            <div class="my-2">
                <form method="post" v-on:submit.prevent="cambiarGenero(pelicula.idPelicula)"> 
                    <label class="text-dark">Género:</label> &nbsp;
                    <select v-model="generoSeleccionado">
                        <option v-for="gen in generos" :key="gen.idGenero" :value="gen.idGenero">
                            {{gen.nombre}}    
                        </option>
                    </select> &nbsp;
                    <button class="btn btn-success">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    </div>
    <div v-else>
        <img src="../assets/cargando.gif" style="max-width: 350px;"/>
    </div>
  </div>
</template>

<script>
    import ServicePeliculas from '../services/ServicePeliculas';
    import Swal from 'sweetalert2';

    const service = new ServicePeliculas();
    export default {
        name : "DetallePeliculas",
        props:  ["identificador", "idGen"],
        methods : {
            loadGeneros() {
                service.getGeneros("/api/generos").then((result) => {
                    this.generos = result;
                });
            },
            findpelicula() {
                service.getPelicula("/api/peliculas/", this.identificador).then((result) => {
                    this.pelicula = result;
                });
            },
            eliminarPelicula(idPelicula) {
                Swal.fire({
                title: '¿Desea eliminar esta película?',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Sí',
                denyButtonText: "",
                }).then((result) => {
                    if (result.isConfirmed) {
                        service.deletePelicula("/api/peliculas/", idPelicula);
                        this.$router.go();
                        Swal.fire('Película eliminada', '', 'success')
                    } else if (result.isDismissed) {
                        Swal.fire('Eliminación cancelada', '', 'info')
                    }
                })
            },
            cambiarGenero(idPelicula) {
                if (this.generoSeleccionado != this.pelicula.idGenero) {
                    Swal.fire({
                    title: '¿Desea cambiar el genero de esta película?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Sí',
                    denyButtonText: "",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            service.updatePelicula("/api/peliculas/updatepeliculagenero/", idPelicula, this.generoSeleccionado).then(() => {
                                this.$router.go();
                            });
                            Swal.fire('Película modificada', '', 'success')
                        } else if (result.isDismissed) {
                            this.generoSeleccionado = parseInt(this.idGen);
                            Swal.fire('Modificación cancelada', '', 'info')
                        }
                    })
                } else {
                    Swal.fire(
                        'Sin cambios',
                        'No se ha producido ningún cambio en el género de la pelicula seleccionada',
                        'info'
                    )
                }
            }
        },
        data() {
            return {
                pelicula : null,
                generos : [],
                generoSeleccionado : parseInt(this.idGen)
            }
        },
        mounted() {
            this.findpelicula();
            this.loadGeneros();
        }
    }
</script>

<style>

</style>