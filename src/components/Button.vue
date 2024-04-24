<template>
    <div class="button-container" :style="{ marginLeft: totalExpandedWidth + 'rem' }">
      <v-btn icon :class="circleClass" @click="handleClick">
        +
      </v-btn>
      <div class="rectangle-link" @click="handleClick" @mouseenter="expandRectangle" @mouseleave="retractRectangle">
        <div class="rectangle" :class="rectangleClass" :style="{ width: rectangleWidth + 'rem', color: textColor }">
          <p v-if="expanded" class="buttonText">{{ buttonText }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      color: String,
      func: Function,
      text: String
    },
    data() {
      return {
        rectangleWidth: 0,
        expanded: false,
        totalExpandedWidth: 0
      };
    },
    computed: {
      circleClass() {
        return ['circle-button', `bg-${this.color}`];
      },
      rectangleClass() {
        return {
          'bg-yellow-lighten-4': this.expanded,
          'bg-white': !this.expanded
        };
      },
      textColor() {
        return this.expanded ? 'black' : 'white';
      },
      buttonText() {
        return this.expanded ? this.text : '';
      }
    },
    methods: {
      expandRectangle() {
        this.expanded = true;
        this.rectangleWidth = 12;
        this.calculateTotalExpandedWidth();
      },
      retractRectangle() {
        this.expanded = false;
        this.rectangleWidth = 0;
        this.calculateTotalExpandedWidth();
      },
      calculateTotalExpandedWidth() {
        this.totalExpandedWidth = this.expanded ? this.rectangleWidth : 0;
      },
      handleClick() {
        if (this.func) {
          this.func();
        }
      }
    }
  };
  </script>
  
  <style scoped>
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
    overflow: hidden;
    font-size: 1rem;
    justify-content: center;
    color: white;
    z-index: 2;
  }
  
  .rectangle-link {
    position: relative;
    display: inline-block;
    z-index: 1;
  }
  
  .rectangle {
    border-radius: 25px;
    height: 3rem;
    transition: width 0.3s, background-color 0.3s, color 0.5s;
    margin-left: -2.5rem;
    position: absolute;
    top: 0;
    left: 100%;
    overflow: hidden;
    cursor: pointer;
    z-index: 1;
  }
  </style>
  