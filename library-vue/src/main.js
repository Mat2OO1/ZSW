import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/main.css'
import BookForm from "@/components/BookForm.vue";
import BookTable from "@/components/BookTable.vue";
import AuthorForm from "@/components/AuthorForm.vue";
import AuthorTable from "@/components/AuthorTable.vue";
import AuthorUpdate from "@/components/AuthorUpdate.vue";
import BookUpdate from "@/components/BookUpdate.vue";
import Main from "@/components/Main.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Main,
        },
        {
            path: '/books',
            name: 'books',
            component: BookTable,
        },
        {
            path: '/book-form',
            component: BookForm,
        },
        {
            path: '/author-form',
            component: AuthorForm,
        },
        {
            path: '/authors',
            name: 'authors',
            component: AuthorTable,
        },
        {
            path: '/author-update/:id',
            name: 'authorUpdate',
            component: AuthorUpdate,
        },
        {
            path: '/book-update/:id',
            name: 'bookUpdate',
            component: BookUpdate,
        },
    ]
})

createApp(App).use(router).mount('#app')
