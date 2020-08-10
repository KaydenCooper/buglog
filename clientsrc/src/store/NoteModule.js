import { api } from "./AxiosService"
import router from "../router"


export default {
    actions: {

        async addNote({ commit, dispatch }, noteData) {
            try {

                let res = await api.post("notes", noteData)
                dispatch("getNote", noteData.bug)
            } catch (error) {
                console.error(error);
            }
        },
        async getNote({ commit }, id) {
            try {

                let res = await api.get("bugs/" + id + "/notes/")
                commit("setActiveNote", res.data)
            } catch (error) {
                console.error(error);
            }
        },
        async deleteNote({ dispatch }, data) {
            try {

                let res = await api.delete("notes/" + data.id)
                dispatch("getNote", data.bug
                )
            } catch (error) {
                console.error(error);
            }
        }


    }
}