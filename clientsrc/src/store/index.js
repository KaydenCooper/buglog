import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"
import NoteModule from "./NoteModule"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: {},
    activeBug: {},
    notes: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    setActiveBug(state, activeBug) {
      state.activeBug = activeBug
    },
    setActiveNote(state, notes) {
      state.notes = notes
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({ commit, dispatch }) {
      try {
        let res = await api.get("bugs")
        commit("setBugs", res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async getBug({ commit, dispatch }, bugId) {
      try {
        let res = await api.get("bugs/" + bugId)
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async addBug({ commit, dispatch }, bugData) {
      try {
        let res = await api.post("bugs", bugData)

        dispatch("getBugs")
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBug({ commit, dispatch }, bugId) {
      try {
        let res = await api.delete("bugs/" + bugId)
        dispatch("getBugs")
      } catch (error) {
        console.error(error)
      }
    },
    async editBug({ commit, dispatch }, editBugData) {
      try {
        let res = await api.put("bugs/" + editBugData.id, editBugData.description)
        commit("setActiveBug", {})
        dispatch("getBug", editBugData.id)

      } catch (error) {
        console.error(error);
      }
    }
  },
  modules: {
    NoteModule
  }
});
