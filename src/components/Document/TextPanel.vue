<template>
  <v-btn @click="console.log(test)"></v-btn>
  <main id="sample">
    <Editor api-key="kxr688xmjga0t7u2u07qqugnnv9qpce8nhhc2lhwnkf81sq6" :init="{
      toolbar_mode: 'sliding',
      min_height: 900,
      plugins: 'anchor autoresize autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat'
    }"  :initial-value="props.content.content.text" @selection-change="testF">
    </Editor>
    />
  </main>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useDocsStore } from '@/store.js'
import { defineProps } from 'vue'

const props = defineProps({
  content: Object
})

const store = useDocsStore()
let text = props.content.content.text
let test = 0

function testF(t, e){
  props.content.content.text = e.getContent()
  console.log(store.userDocs.filter(el=>el._id==props.content._id)[0])
  console.log(props.content.content.text)
}

</script>

<style scoped>
.ruler {
  margin: auto;
  margin-top: 2rem;
}

.indicator {
  position: absolute;
  top: 0;
  height: 10px;
  border-left: 1px solid #000;
}

.text-area {
  width: 100%;
}

@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
    height: 100%;
    margin-bottom: 2rem;
  }
}
</style>
