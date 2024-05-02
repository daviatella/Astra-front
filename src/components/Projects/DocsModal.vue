<template>
    <v-card class="modal rounded-lg">
        <div class="text bg-banner bg-yellow-lighten-4" style="display: flex;">
            <v-spacer></v-spacer>
            <v-card-title class="ml-8">Select {{ typeName }}</v-card-title>
            <v-spacer></v-spacer>
        </div>
        <v-card-text class="w-100">

            <v-container class="mb-5">
                <v-row>
                    <v-col v-for="(card, index) in docs" @click="select(index, card)" :key="index" cols="20" sm="1" md="1" lg="2">
                        <NexusCard :card="card" @click="select(index, card)" :selected="this.selectedArray[index]"
                            :travel="false" @open-modal="openModal" />
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <div class="text bg-banner bg-yellow-lighten-4 mt-3">
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

import { useDocsStore } from '@/store';

export default {
    props: ['type'],

    data() {
        let store = useDocsStore()
        let docs = []
        let typeName = ''
        if (this.type == `board` || this.type == `nexus`) {
            typeName = this.type == 'board' ? 'Boards' : 'Nexus'
            docs = store.userDocs.filter(el => el.type == this.type)
        } else {
            docs = store.userDocs
            typeName = 'Document'
        }
        console.log(docs)
        let selectedArray = new Array(docs.length).fill(false)
        return {
            store,
            typeName,
            docs,
            chosenDocs: [],
            selectedArray
        };
    },
    mounted() {
        console.log('opened')

    },
    methods: {
        closeModal(select) {
            if (!select) {
                this.chosenDocs = []
            }
            this.$emit("closeModal", this.chosenDocs)
        },
        select(i, card) {
            this.selectedArray[i] = !this.selectedArray[i]
            if (this.selectedArray[i]) {
                this.chosenDocs.push(card)
            } else {
                this.chosenDocs.splice(this.chosenDocs.findIndex(el => el._id == card._id), 1)
            }
            console.log(this.selectedArray[i])
        },
    },
};
</script>

<style scoped>
.modal {
    width: 1200px;
    height: fit-content;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    margin: auto;
}
</style>