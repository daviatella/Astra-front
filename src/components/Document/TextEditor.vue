<script setup>
  import Editor from '@tinymce/tinymce-vue'
  import {ref} from 'vue'
  const props = defineProps(['text'])
  let text = ref(props.text);
    console.log(text)
</script>

<template>
 
</template>

<style scoped>

</style>