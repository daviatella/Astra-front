<template>
  <IndentationRuler class="ruler" @applyIndentation="applyIndentation" />
  <div class="page" ref="page">
    <div style="height: 30px"></div>
    <div class="page-2">
    <v-textarea class="text-area" ref="textarea" flat scrollable variant="solo" auto-grow  no-resize v-model="text"  @input="handleInput"></v-textarea>
  </div>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor
  },
  props: ['content'],
  data() {
    return {
      text: ``,
      rulerSteps: 10, 
      currIndentation: 0
    };
  },
  mounted() {
    const textarea = this.$refs.textarea;
    this.$refs.page.style.height = textarea.scrollHeight >= 1150 ? 50 + textarea.scrollHeight + 'px' : 1200 + 'px'
    this.text = this.content.text

  },
  methods: {
    handleInput(event) {
      const textarea = this.$refs.textarea;
      //textarea.style.height = textarea.scrollHeight + 'px';
      this.$refs.page.style.height = textarea.scrollHeight >= 1150 ? 50 + textarea.scrollHeight + 'px' : 1200 + 'px'


    },
    newParagraph() {
      const textarea = this.$refs.textarea;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = this.text.substring(0, cursorPosition);
      const textAfterCursor = this.text.substring(cursorPosition);
      const linesBeforeCursor = textBeforeCursor.split('\n');
      const previousLineIndentation = "\t".repeat(this.currIndentation)

      this.text = `${textBeforeCursor}${previousLineIndentation}${textAfterCursor}`;
       textarea.selectionStart = textarea.selectionEnd = 540;
       console.log(cursorPosition+this.currIndentation)
    },
    applyIndentation(indentation) {
      let change = indentation - this.currIndentation;
      let paragraphs = this.text.split('\n');
      const indentedParagraphs = paragraphs.map(paragraph => {
        let indentationSpaces = "";
        if (indentation === 0) {
          paragraph = paragraph.trimStart(); // Remove all existing indentation
        } else if (change > 0 && paragraph.length > 0) {
          indentationSpaces = "\t".repeat(change);
        } else {
          indentationSpaces = ""; // Reset indentationSpaces for negative change
          for (let i = 0; i < -change; i++) {
            paragraph = paragraph.replace(/^\t/, ''); // Remove one tab from the start for each negative change
          }
        }

        return `${indentationSpaces}${paragraph}`;
      });

      // Join paragraphs back together with newlines
      this.text = indentedParagraphs.join('\n');
      this.currIndentation = indentation;
    },



  }
};
</script>

<style scoped>
.page {
  margin: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 1px;
  margin-bottom: 2rem;
  height: 1200px;
  /* or you can use height: 90vh; for 90% of viewport height */
  width: 900px;
}

.page-2 {
  margin: auto;
  border-radius: 1px;
  margin-bottom: 2rem;
  height: 1200px;
  /* or you can use height: 90vh; for 90% of viewport height */
  width: 800px;
}

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
</style>