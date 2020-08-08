<template>
  <div class="bugDetails container-fluid justify-content-center row">
    <div class="col-12 p-4 text-center">
      <h5 class="text-center">
        <u>TITLE:</u>
        <h2>{{bug.title}}</h2>
      </h5>
      <h3 class="mb-4">
        Status:
        <span v-if="bug.closed == false" class="text-success">Open</span>
        <span v-else class="text-danger strikethrough">Closed</span>
      </h3>
      <p class="mb-1">Created By:</p>
      <h5>{{profile.name}}</h5>
    </div>
    <div class="col-6 card text-center pt-3 shadow-lg px-0">
      <h2>{{bug.description}}</h2>
      <button
        type="button"
        class="btn btn-outline-danger btn-block rounded"
        @click="deleteBug(bug.id)"
      >Resolve Bug Issue</button>
    </div>
    <div class="card shadow-lg mt-4 col-10">
      <button
        type="button"
        data-toggle="modal"
        data-target="#note-modal"
        class="btn btn-primary mt-3 m-2 shadow-lg"
      >Add A Note</button>
      <noteModal />
      <div class="p-2" v-for="note in notes" :key="note.id">
        <button
          type="button"
          class="btn btn-outline-danger py-0 px-1"
          @click="deleteNote(notes[id])"
        >X</button>
        : {{note.content}}
      </div>
    </div>
  </div>
</template>


<script>
import NoteModal from "../components/NoteModal";
export default {
  name: "bugDetails",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getBug", this.$route.params.id);
    this.$store.dispatch("getNote", this.$route.params.id);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    profile() {
      return this.$store.state.profile;
    },
    notes() {
      return this.$store.state.notes;
    },
  },
  methods: {
    deleteBug(id) {
      this.$store.dispatch("deleteBug", id);
    },
    deleteNote(id) {
      debugger;
      this.$store.dispatch("deleteNote", id);
    },
  },
  components: {
    NoteModal,
  },
};
</script>


<style scoped>
</style>