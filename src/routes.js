import { createWebHistory, createRouter } from 'vue-router'

import DocsView from './components/DocsView.vue'
import Nexus from './components/Document/Nexus.vue'
import Flow from './components/Flow/Flow.vue'
import Tags from './components/Tags/TagsPage'
import ProjectsPage from './components/Projects/ProjectsPage'

const routes = [
  { path: '/', component: DocsView },
  { path: '/document/:id', component: Nexus, props: true},
  { path: '/board/:id', component: Flow, props: true},
  { path: '/tags/', component: Tags, props: true},
  { path: '/projects/', component: ProjectsPage, props: true}


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router