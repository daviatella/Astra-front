<template>
  <IndentationRuler class="ruler" @applyIndentation="applyIndentation" />
  <div class="page" ref="page">
    <div style="height: 30px"></div>
    <v-textarea class="text-area" ref="textarea" flat scrollable="false" variant="solo" auto-grow="true"  no-resize="true" v-model="text"  @input="handleInput"></v-textarea>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis sit amet ipsum et blandit. Fusce convallis laoreet euismod. Nullam gravida risus at interdum egestas. Vivamus rutrum dui mi, quis finibus justo aliquet et. Nulla at dolor placerat, laoreet urna eget, consequat purus. Sed hendrerit nec justo a suscipit. Praesent condimentum magna est, eget vestibulum libero mattis id. Sed blandit vitae risus non auctor. Duis feugiat nunc sem, sit amet viverra ligula facilisis at. Vivamus ac orci felis. Aliquam erat volutpat.

Vivamus bibendum fringilla purus eu semper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sit amet est id augue condimentum ornare. Mauris scelerisque purus non lectus varius gravida et sed leo. Quisque placerat leo sed mauris sodales faucibus. Praesent vestibulum vel orci vel semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam lorem erat, molestie eget dictum nec, porta in purus. Integer ornare orci dictum iaculis molestie. Integer et tristique nisl. Cras in sem nisi. Vestibulum sit amet suscipit urna, ut interdum tortor. Cras ultricies orci in libero tristique malesuada.

Sed sit amet augue et massa lacinia efficitur. Morbi condimentum, nibh hendrerit luctus mattis, purus nunc feugiat ex, eu vehicula metus dui id purus. Pellentesque fermentum nunc sit amet turpis ultricies, eu rhoncus arcu consequat. Sed non nisi ut libero vehicula maximus. Nunc sagittis mauris ac leo varius, ac lacinia eros placerat. Aliquam nisi leo, condimentum ac luctus eu, ornare ut metus. In laoreet diam eu eros rutrum, eget dictum nibh luctus. Fusce risus lacus, accumsan quis enim nec, scelerisque vulputate lectus. Morbi finibus velit at mi ultricies sagittis.
`,
      rulerSteps: 10, 
      currIndentation: 0
    };
  },
  mounted() {
    const textarea = this.$refs.textarea;
      this.$refs.page.style.height = textarea.scrollHeight >= 1150 ? 50 + textarea.scrollHeight + 'px' : 1200 + 'px'

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
  width: 990px;
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
  width: 900px;
  margin: auto;
  margin-left: 3rem;
  height: 100%;
  resize: none;
  border: none;
  overflow: hidden;
  font-size: 16px;
  outline: none;
}
</style>