import { defineStore } from "pinia";
import { ref } from "vue";

export const useDocsStore = defineStore("docs", {
  state: () => ({
    userDocs: ref([]),
    selectedDoc: "",
    user: "daviatella",
    searchQuery: ref(""),
    userInfo: "",
    userProjs: []
  }),
  actions: {
    loadDataFromStorage() {
      try {
        const storedData = localStorage.getItem("docsStore");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          this.userDocs = parsedData.userDocs;
          this.selectedDoc = parsedData.selectedDoc;
          this.userInfo = parsedData.userInfo;
          this.userProjs = parsedData.userProjs;
        }
      } catch(err){
        console.log(err)
      }
     
    },
    saveDataToStorage() {
      const dataToStore = {
        userDocs: this.userDocs,
        selectedDoc: this.selectedDoc,
        userInfo: this.userInfo,
        userProjs: this.userProjs
      };
      localStorage.setItem("docsStore", JSON.stringify(dataToStore));
    },
 
  },
  beforeMount() {
    this.loadDataFromStorage();
  },
  afterMount() {
    this.$watch(
      () => ({
        userDocs: this.userDocs,
        selectedDoc: this.selectedDoc,
        userInfo: this.userInfo,
        userProjs: this.userProjs
      }),
      () => {
        this.saveDataToStorage();
      }
    );
  }
});
