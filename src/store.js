import { defineStore } from "pinia";
import { ref } from "vue";

export const useDocsStore = defineStore("docs", {
  state: () => ({
    userDocs: [],
    selectedDoc: "",
    user: "daviatella",
    searchQuery: ref(""),
    userInfo: "",
    userProjs: []
  }),
});
