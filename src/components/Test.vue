<template>
    <div class="container">
        <v-btn icon="mdi-plus" class="circle-button" @mouseenter="expandRectangle" @mouseleave="retractRectangle()"> + </v-btn>
        <div class="rectangle" :style="{ width: rectangleWidth + 'rem', backgroundColor: expanded ? '#EDE7F6' : 'white'}" @mouseenter="expandRectangle" @mouseleave="retractRectangle"> <p>Create Doc</p>  </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rectangleWidth: 0,
        expanded: false
      };
    },
    methods: {
      expandRectangle() {
        this.expanded = true;
        this.rectangleWidth = this.expanded ? 12 : 0;
      },
      retractRectangle() {
        this.expanded = false;
        this.rectangleWidth = this.expanded ? 12 : 0;
      }
    }
  };
  </script>
  
  <style scoped>
  
  .container {
    position: relative; /* Ensure z-index works */
  }
  
  .circle-button {
    height: auto;
  max-width: 10rem;
  padding: 10px 20px;
  background-color: #7B4184;
  color: white;
  z-index: 2; /* Higher z-index for the image */
  }

  .container {
    margin-left: 8rem;
  }
  
  .rectangle {
    background-color: #007bff;
    border-radius: 25px;
    height: 3rem;
    transition: width 0.3s, background-color 0.3s;
    margin-left: -2.5rem;
    display: inline-block;
    position: absolute; /* Ensure positioning */
    z-index: 1; /* Lower z-index for the rectangle */
  }
  </style>
  