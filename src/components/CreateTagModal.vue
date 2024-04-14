<template>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular color="purple" size="64" indeterminate></v-progress-circular>
    </v-overlay>
    <v-card v-if="this.type == 'doc' || this.type == 'board'" class="modal rounded-lg">
        <div class="text bg-banner" :class="{'bg-purple': this.type=='doc','bg-orange': this.type=='board'}">
            <v-card-title>Create {{ this.type == 'doc' ? 'Nexus' : 'Board' }}</v-card-title>
        </div>
        <v-card-text class="w-100">
            <v-text-field label="Title" v-model="title" class="w-75 m-auto" variant="solo"></v-text-field>
            <v-divider class="mt-n2"></v-divider>
            <v-card-title class="text mt-n5"> Tags </v-card-title>
        </v-card-text>
        <div class="text bg-banner" :class="{'bg-purple': this.type=='doc','bg-orange': this.type=='board'}">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="createDoc">Create</v-btn>
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
        async createDoc() {
            this.isLoading = true;
            let newDoc = {
                "title": this.title,
                "type": this.type,
                "owner": this.store.user,
                "content": {
                    "text": "",
                    "notes": "",
                    "mindmap": {
                        "elements": []
                    }
                }
            }
            try {
                const response = await fetch('http://localhost:4000/api/docs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newDoc)
                })
                if (!response.ok) {
                    console.log(response)
                    throw new Error(response);
                } else {
                    const responseData = await response.json();
                    console.log(responseData)
                    newDoc._id = responseData.data.id;
                    newDoc._rev = responseData.data.rev;
                    this.store.userDocs.push(newDoc)
                    this.$router.push("/" + (this.type == 'doc' ? 'document' : 'board') + '/' + responseData.data.id)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async updateTitle() {
            console.log(this.doc)
            this.isLoading = true;
            let b = {
                title: this.title
            }
            try {
                const response = await fetch('http://localhost:4000/api/docs/' + this.doc._id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(b)
                })
                if (!response.ok) {
                    console.log(response)
                    throw new Error(response);
                } else {
                    const responseData = await response.json();
                    console.log(responseData)

                    let selectedDoc = this.store.userDocs.filter(doc => doc._id == responseData.data.id)[0]
                    selectedDoc.title = this.title
                    selectedDoc._rev = responseData.data.rev
                    this.isLoading = false;
                    this.closeModal()
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async deleteDoc() {
            console.log(this.doc)
            this.isLoading = true;
            let queryParams = {
                rev: this.doc._rev
            }
            const queryString = new URLSearchParams(queryParams).toString();
            try {
                const response = await fetch('http://localhost:4000/api/docs/' + this.doc._id + '?' + queryString, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (!response.ok) {
                    console.log(response)
                    throw new Error(response);
                } else {
                    const responseData = await response.json();
                    console.log(responseData)
                    console.log("first - " + this.store.userDocs.length)
                    this.store.userDocs = this.store.userDocs.filter(doc => doc._id !== this.doc._id)
                    console.log("second - " + this.store.userDocs.length)

                    this.isLoading = false;
                    this.closeModal()
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        closeModal() {
            this.$emit("closeModal")
        }

    }
};
</script>

<style>
.text {
    font-family: Space Grotesk, sans-serif;
    text-align: center;
    justify-content: center;
}



.bg-banner {
    width: 100%;
}

.modal {
    width: 1000px;
    height: 500px;
    margin-bottom: 15rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
}

.small-modal {
    width: 500px;
    height: 250px;
    margin-bottom: 15rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    color: black;
    text-align: center;
    justify-content: center;

}
</style>