<template>
    <v-card class="modal rounded-lg">
        <div class="text bg-banner bg-orange-lighten-4" style="display: flex;">
            <v-spacer></v-spacer>
            <v-card-title class="ml-8">Node Color</v-card-title>
            <v-spacer></v-spacer>
        </div>
        <v-card-text class="w-100">

            <v-color-picker mode="hex" v-model="color" />

        </v-card-text>

        <div class="text bg-banner bg-orange-lighten-4 mt-3">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="closeModal(true)" variant="outlined"> Select </v-btn>
                <v-btn @click="closeModal(false)" variant="outlined">Cancel</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </div>
    </v-card>


</template>

<script>

export default {
    props: ['node'],

    data() {
       let color = this.node.data.color
        return {
            color
        };
    },
    methods: {
        closeModal(select) {
            if (!select) {
                this.color = false
            }
            this.$emit("closeModal", this.color, this.node)
        },
    },
};
</script>

<style scoped>
.modal {
    width: fit-content;
    height: fit-content;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    margin: auto;
}
</style>