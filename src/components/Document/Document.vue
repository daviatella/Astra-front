<template>
    <IndentationRuler class="ruler" @applyIndentation="applyIndentation" />
    <div class="margin">
        <textarea class="text-area" ref="textarea" v-model="text" @input="handleInput"></textarea>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: "",
            rulerSteps: 10, // Number of steps in the ruler
            indentWidth: 20,// Width of each indentation step
            currIndentation: 0
        };
    },
    methods: {
        applyIndentation(indentation) {
    let change = indentation - this.currIndentation;
    let paragraphs = this.text.split('\n');
    const indentedParagraphs = paragraphs.map(paragraph => {
        let indentationSpaces = "";
        if (indentation === 0) {
            paragraph = paragraph.trimStart(); // Remove all existing indentation
        } else if (change > 0) {
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
}

    }
};
</script>

<style scoped>
.margin {
    margin: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 1px;
    margin-top: 2rem;
    height: 100rem;
    width: 50%;
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
    width: 90%;
    margin:auto;

    margin-top: 2rem;
    margin-left:3rem;
    height: calc(100% - 20px);
    resize: none;
    border: none;
    padding: 10px;
    font-size: 16px;
    outline: none;
}
</style>
