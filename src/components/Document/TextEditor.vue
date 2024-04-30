<script setup>
  import Editor from '@tinymce/tinymce-vue'
  import {ref} from 'vue'
  const props = defineProps(['text'])
  let text = ref(props.text);
    console.log(text)
</script>

<template>
  <main id="sample">
    <Editor
      api-key="kxr688xmjga0t7u2u07qqugnnv9qpce8nhhc2lhwnkf81sq6"
      :init="{
        toolbar_mode: 'sliding',
        min_height: 900,
        plugins: 'anchor autoresize autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }"
      :initial-value="text"
    />
  </main>
</template>

<style scoped>
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