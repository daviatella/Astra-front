import { createMemoryHistory, createRouter } from 'vue-router'

import DocsView from './components/DocsView.vue'
import Document from './components/Document/Document.vue'

const routes = [
  { path: '/', component: DocsView },
  { path: '/document/:id', component: Document, props: true}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router