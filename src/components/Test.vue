<template>
    <div class="buttons-bar">
      <div class="button-container">
        <v-btn icon="mdi-plus" class="circle-button" @mouseenter="expandRectangle(1)" @mouseleave="retractRectangle(1)"> + </v-btn>
        <div class="rectangle" :style="{ width: rectangleWidth[0] + 'rem', backgroundColor: expanded[0] ? '#EDE7F6' : 'white', color: expanded[0] ? 'black' : 'white'}" @mouseenter="expandRectangle(1)" @mouseleave="retractRectangle(1)">
          <p v-if="expanded[0]" class="buttonText">Create Doc</p>
        </div>
      </div>
      <div class="button-container" :style="{ marginLeft: expanded[0] ? totalExpandedWidth + 'rem' : '1rem' }">
        <v-btn icon="mdi-plus" class="circle-button" style="background-color: #E86000;" @mouseenter="expandRectangle(2)" @mouseleave="retractRectangle(2)"> + </v-btn>
        <div class="rectangle" :style="{ width: rectangleWidth[1] + 2 + 'rem', backgroundColor: expanded[1] ? '#EDE7F6' : 'white', color: expanded[1] ? 'black' : 'white'}" @mouseenter="expandRectangle(2)" @mouseleave="retractRectangle(2)">
          <p v-if="expanded[1]" class="buttonText">Create Mindmap</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rectangleWidth: [0, 0],
        expanded: [false, false],
        totalExpandedWidth: 0 // Total width of expanded rectangles
      };
    },
    methods: {
      expandRectangle(buttonIndex) {
        this.expanded[buttonIndex - 1] = true;
        this.rectangleWidth[buttonIndex - 1] = 12;
        this.calculateTotalExpandedWidth();
      },
      retractRectangle(buttonIndex) {
        this.expanded[buttonIndex - 1] = false;
        this.rectangleWidth[buttonIndex - 1] = 0;
        this.calculateTotalExpandedWidth();
      },
      calculateTotalExpandedWidth() {
        this.totalExpandedWidth = this.expanded.reduce((acc, val, index) => {
          return acc + (val ? this.rectangleWidth[index] : 0);
        }, 0);
      }
    }
  };
  </script>
  
  <style scoped>
  .buttons-bar {
    margin-left: 2rem;
  }
  .button-container {
    display: inline-block;
    margin-left: 3rem;
    transition: margin-left 0.3s;
  }
  
  .buttonText {
    margin-top: 0.7rem;
    margin-left: 1rem;
    font-size: 1.1rem;
    font-family: Space Grotesk, sans-serif;
    text-align: center;
    transition: color 0.3s;
  }
  
  .circle-button {
    height: auto;
    max-width: 10rem;
    padding: 10px 20px;
    background-color: #7b4184;
    color: white;
    z-index: 2;
  }
  
  .rectangle {
    border-radius: 25px;
    height: 3rem;
    transition: width 0.3s, background-color 0.3s, color 0.5s;
    margin-left: -2.5rem;
    display: inline-block;
    position: absolute;
    z-index: 1;
  }
  </style>
  