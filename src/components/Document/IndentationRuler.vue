<!-- IndentationRuler.vue -->
<template>
        <v-slider v-model="indentation"  :min="0" :max="10" :step="1" thumb-label ></v-slider>
</template>
  
<script>
export default {
    data() {
        return {
            indentation: 0
        };
    },
    watch: {
        indentation(newValue) {
            this.applyIndentation(newValue);
        }
    },
    methods: {
        applyIndentation(value) {
            this.$emit('applyIndentation', value);
        }
    }
};
</script>
  
<style scoped>

.ruler {
    width: 25%;
}

</style>