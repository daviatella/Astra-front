import { defineStore } from "pinia";

export const useDocsStore = defineStore("docs", {
  state: () => ({ userDocs: '', test: 'test'}),
});
