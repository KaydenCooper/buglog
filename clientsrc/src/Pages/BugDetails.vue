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
    <div class="col-6 card p-2 border-primary text-center pt-3 shadow-lg px-0">
      <i
        type="button"
        v-if="bug.creatorEmail == $auth.user.email && bug.closed==false"
        data-toggle="modal"
        data-target="#edit-modal"
        class="fa fa-pencil text-right px-4"
      ></i>
      <editModal :editBugData="bug" />
      <h2>{{bug.description}}</h2>
      <button
        type="button"
        class="btn btn-outline-danger btn-block rounded mt-3"
        @click="deleteBug(bug.id)"
      >Resolve Bug Issue</button>
    </div>
    <div class="card border-primary shadow-lg my-4 p-3 col-10">
      <button
        v-if="bug.closed==true"
        disabled
        type="button"
        data-toggle="modal"
        data-target="#note-modal"
        class="btn btn-outline-primary mt-3 m-2 shadow-lg"
      >Add A Note</button>
      <button
        v-else
        type="button"
        data-toggle="modal"
        data-target="#note-modal"
        class="btn btn-outline-primary mt-3 m-2 shadow-lg"
      >Add A Note</button>
      <noteModal />
      <div class="p-2 overflow" v-for="note in notes" :key="note.id">
        <hr />
        <button
          type="button"
          class="btn btn-outline-danger py-0 px-1"
          @click="deleteNote(note.id)"
        >X</button>
        : {{note.content}}
      </div>
    </div>
  </div>
</template>


<script>
import NoteModal from "../components/NoteModal";
import EditModal from "../components/EditModal";
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
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Successfully Deleted!", {
            icon: "success",
          });
          this.$store.dispatch("deleteBug", id);
        } else {
          swal("Phew Close One!");
        }
      });
    },
    deleteNote(id) {
      swal({
        title: "Are you sure?",

        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store.dispatch("deleteNote", id);
          swal("Successfully Deleted!", {
            icon: "success",
          });
        } else {
          swal("Phew Close One!");
        }
      });
    },
  },
  components: {
    NoteModal,
    EditModal,
  },
};
</script>


<style scoped>
.overflow {
  overflow: auto;
}
</style>