<template>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
    </v-overlay>
    <v-card class="modal rounded-lg">
        <div class="text bg-banner" :class="{'bg-purple': this.type=='doc','bg-orange': this.type=='board'}">
            <v-card-title>Create Tag</v-card-title>
        </div>
        <v-card-text class="w-100">
            <v-text-field label="Title" v-model="title" class="w-75 m-auto" variant="solo"></v-text-field>
            <v-divider class="mt-n2"></v-divider>
            <v-card-title class="text mt-n5"> Tags </v-card-title>
        </v-card-text>
        <div class="text bg-banner" :class="{'bg-purple': this.type=='doc','bg-orange': this.type=='board'}">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="createTag">Create</v-btn>
                <v-btn @click="closeModal">Cancel</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </div>
    </v-card>

</template>

<script>
import { useDocsStore } from '@/store.js'

export default {
    props: [
        'type',
        'doc'
    ],
    data() {
        return {
            title: '',
            store: useDocsStore(),
            isLoading: false
        }
    },
    methods: {
        createTag(tag){
            console.log(tag)
        },
        closeModal() {
            this.$emit("closeModal")
        }

    }
};
</script>

<style scoped>
.text {
    font-family: Space Grotesk, sans-serif;
    text-align: center;
    justify-content: center;
}



.bg-banner {
    width: 100%;
}

.modal {
    width: 600px;
    height: 300px;
    margin-bottom: 15rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
}

</style>