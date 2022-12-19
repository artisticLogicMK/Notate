import { createRouter, createWebHashHistory } from 'vue-router'
import AppIntro from '../components/AppIntro.vue'
import NoteBoard from '../components/NoteBoard.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: AppIntro
    },
    {
        path: '/noteboard/:id',
        name: 'notes',
        component: NoteBoard
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
  
export default router