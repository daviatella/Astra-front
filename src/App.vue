<template>
  <v-app>
    <v-main>
      <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular color="purple" size="64" indeterminate />
      </v-overlay>
      <RouterView v-if="!isLoading" />
    </v-main>
  </v-app>
</template>

<script>
import { useDocsStore } from './store';
import { baseCall } from './base.api'

export default {
  data() {
    return {
      isLoading: true,
      store: useDocsStore()
    };
  },
  async mounted() {
    let b = {
      user: this.store.user
    }
    if (!this.store.userDocs.length > 0) {
      try {
        await this.getUserInfo("daviatella", "123").then(async () => {
          let responseData = await baseCall('docs-by-owner', b)
          this.store.userDocs = responseData.data.filter(el => el.type != 'project')
          this.store.userProjs = responseData.data.filter(el => el.type == 'project')
          console.log(this.store.userProjs)
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    this.isLoading = false;

  },
  methods: {
    async getUserInfo(email, pw) {
      let b = {
        email: email,
        password: pw
      }
      if (!this.store.userInfo) {
        try {
          const responseData = await baseCall('users/login', b)
          this.store.userInfo = responseData.data
          this.isLoading = false;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        this.isLoading = false;
      }
    }
  },
};

</script>
