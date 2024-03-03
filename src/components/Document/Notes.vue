<template>
 <v-container class=" margin">
  <textarea class="text-area" ref="textarea" v-model="text" @input="handleInput"></textarea>

  </v-container>
  </template>
  
  <script>

  export default {
    data: () => ({
  
    }),
  };
  </script>
  
  <style scoped>
  .astra-title {
    margin: 1rem;
    text-align: center;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  
  .text-area {
    width: 90%;
    margin:auto;
    margin-top: 2rem;
    margin-left:1rem;
    height: calc(100% - 20px);
    resize: none;
    border: none;
    padding: 10px;
    font-size: 16px;
    outline: none;
}
  .margin {
  margin: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  margin-top: 2rem;
  height: 100rem;
  width: 50%;
  background-color: #faf0e6;
}

  </style>
  