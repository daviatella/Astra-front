<template>
  <v-card @click="travel ? goToDocument(card._id, card.type) : ''" class="rounded-lg doc-card"
    :class="{ 'selected': selected }">
    <header class="card-header ch-title text-truncate">
      <div style="width:75%" class="m-auto">
        <p class="text-truncate ml-n2">{{ card.title }}</p>
      </div>
      <v-menu v-if="travel">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" style="margin-top: -2px;margin-right: -2px;" size="small" :flat="true"
            variant="plain" v-bind="props" />
        </template>
        <v-list>
          <v-list-item @click="openModal('update', card)">
            <v-list-item-title>Update Nexus</v-list-item-title>
          </v-list-item>
          <v-list-item @click="openModal('delete', card)">
            <v-list-item-title>Delete Nexus</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </header>
    <div class="content">
      <v-img :src="getImagePath(card.type)" class="content-image"></v-img>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">{{ getWordCount(card.content, card.type) }}</p>
    </footer>
  </v-card>
</template>

<script>
export default {
  props: {
    card: Object,
    travel: Boolean,
    selected: Boolean
  },
  methods: {
    goToDocument(id, type) {
      if (type === 'doc') {
        this.$router.push('/document/' + id)
      } else {
        this.$router.push('/board/' + id)
      }
    },
    openModal(type, card) {
      this.$emit('open-modal', type, card);
    },
    getImagePath(type) {
      const baseUrl = new URL('../../', import.meta.url).href;
      return new URL(`src/assets/${type}-icon.png`, baseUrl).href;
    },
    getWordCount(content, type) {
      if (type === 'doc') {
        if (content.text) {
          let num = content.text.trim().split(/\s+/).length;
          return num + (num > 1 ? ' words' : ' word');
        } else {
          return '0 words';
        }
      } else {
        if (content.mindmap.elements) {
          let num = content.mindmap.elements.filter(el => el.dimensions).length;
          return num + (num > 1 ? ' nodes' : ' node');
        } else {
          return '0 node';
        }
      }
    }
  }
};
</script>

<style>
.content-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.ch-title {
  font-weight: bold;
  height: 40px;
  align-items: center;
}

.selected {
  color: white;
  background-color: gray;
}

.content {
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}

p {
  font-family: Space Grotesk, sans-serif;
  display: block
}


.card-header .v-btn {
  position: absolute;
  justify-content: center;
  top: 0.2rem;
  right: 0.01rem;
}


.doc-card {
  max-width: 11rem;
  margin: auto;
}
</style>