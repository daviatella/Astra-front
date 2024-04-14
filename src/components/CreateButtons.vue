<template>
    <div class="buttons-bar">
      <div class="button-container">
        <v-btn icon="mdi-plus" @click="createDocument" class="circle-button" @mouseenter="expandRectangle(1)" @mouseleave="retractRectangle(1)">
          + 
        </v-btn>
        <a class="rectangle-link" @click="createDocument" @mouseenter="expandRectangle(1)" @mouseleave="retractRectangle(1)">
          <div class="rectangle"
               :style="{ width: rectangleWidth[0] + 'rem', backgroundColor: expanded[0] ? '#EDE7F6' : 'white', color: expanded[0] ? 'black' : 'white' }">
            <p v-if="expanded[0]" class="buttonText">Create Doc</p>
          </div>
        </a>
      </div>
      <div class="button-container" :style="{ marginLeft: expanded[0] ? totalExpandedWidth + 'rem' : '1rem' }">
        <v-btn icon="mdi-plus" @click="createBoard" class="circle-button" style="background-color: #E86000;" @mouseenter="expandRectangle(2)" @mouseleave="retractRectangle(2)"> + </v-btn>
        <a  class="rectangle-link" @click="createBoard" @mouseenter="expandRectangle(2)" @mouseleave="retractRectangle(2)">
          <div class="rectangle"
               :style="{ width: rectangleWidth[1] + 2 + 'rem', backgroundColor: expanded[1] ? '#FADECB' : 'white', color: expanded[1] ? 'black' : 'white' }">
            <p v-if="expanded[1]" class="buttonText">Create Board</p>
          </div>
        </a>
      </div>
    </div>
  </template>
  
  <script>  
  export default {
    data() {
      return {
        rectangleWidth: [0, 0],
        expanded: [false, false],
        totalExpandedWidth: 0
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
      },
      createDocument() {
        this.$emit('createDoc');
      },
      createBoard() {
        this.$emit('createBoard');
      }
    }
  };
  </script>
  
  <style scoped>
  .buttons-bar {
    margin-left: 650px;
    margin-top: 1rem;
    width: fit-content;
  }
  
  .button-container {
    display: inline-block;
    transition: margin-left 0.3s;
  }
  
  .buttonText {
    margin-top: 0.7rem;
    margin-left: 1rem;
    font-size: 1.1rem;
    font-family: Space Grotesk, sans-serif;
    text-align: center;
  }
  
  .circle-button {
    max-width: 10rem;
    padding: 10px 20px;
    background-color: #7b4184;
    overflow: hidden;
    font-size: 1rem;
    justify-content: center;
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
    overflow: hidden;
    cursor: pointer;
    z-index: 1;
  }
  </style>
  