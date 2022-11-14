import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from './components/HomeComponent.vue';
import PeliculasComponent from './components/PeliculasComponent.vue';

const routes = [
    {
        path : "/",
        component : HomeComponent
    },
    {
        path : "/pelicula/:identificador/:option",
        component : PeliculasComponent
    }
];

const router = createRouter({
    history : createWebHistory(),
    routes : routes
});

export default router;