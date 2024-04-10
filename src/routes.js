import { createMemoryHistory, createRouter } from 'vue-router'

import DocsView from './components/DocsView.vue'
import Document from './components/Document/Document.vue'
import Flow from './components/Flow/Flow.vue'

const routes = [
  { path: '/', component: DocsView },
  { path: '/document/:id', component: Document, props: true},
  { path: '/board/:id', component: Flow, props: true}

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router