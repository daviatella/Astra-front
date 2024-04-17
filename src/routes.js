import { createMemoryHistory, createRouter } from 'vue-router'

import DocsView from './components/DocsView.vue'
import Nexus from './components/Document/Nexus.vue'
import Flow from './components/Flow/Flow.vue'
import Tags from './components/TagsPage'

const routes = [
  { path: '/', component: DocsView },
  { path: '/document/:id', component: Nexus, props: true},
  { path: '/board/:id', component: Flow, props: true},
  { path: '/tags/', component: Tags, props: true}

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router