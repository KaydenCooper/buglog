<template>
  <div class="home">
    <div class="row justify-content-center container-fluid">
      <div class="col-6">
        <button
          type="button"
          data-toggle="modal"
          data-target="#bug-modal"
          class="btn btn-primary btn-block m-2 shadow-lg"
        >Report A Bug!</button>
        <bugModal />
      </div>
      <div class="col-8 text-center">
        <h1>
          <u>Current Bugs</u>
        </h1>
        <div class="card d-flex flex-row justify-content-around shadow-lg p-2">
          <span>TITLE</span>
          <span>REPORTED BY</span>
          <span>STATUS</span>
          <span>DATE MODIFIED</span>
        </div>
        <div class="card shadow-lg overflow">
          <bug v-for="bug in bugs" :bugData="bug" :key="bug.id" />
        </div>
      </div>
    </div>
    <footer
      class="col-12 bg-primary fixed-bottom text-center text-white py-3"
    >Created By: Kayden Cooper</footer>
  </div>
</template>

<script>
import BugModal from "../components/BugModal";
import Bug from "../components/Bug";
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getBugs");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {},

  components: {
    Bug,
    BugModal,
  },
};
</script>
<style scoped>
.overflow {
  overflow: auto;
  height: 50vh;
}
</style>
