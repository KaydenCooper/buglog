<template>
  <div class="noteModal">
    <div class="modal" id="note-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content bg-primary text-light">
          <div class="modal-header bg-light">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <h5>
                <u>Add Note</u>
              </h5>
              <input
                v-model="newNote.content"
                type="text"
                class="form-control text-wrap"
                placeholder="Enter Description...."
              />
            </div>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-outline-danger rounded" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-outline-success rounded"
              @click="addNote(bug.id)"
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "noteModal",
  data() {
    return {
      newNote: {},
    };
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
  },
  methods: {
    addNote(id) {
      this.$store.dispatch("addNote", {
        content: this.newNote.content,
        bug: id,
      });
      this.newNote = {};
      $("#bug-modal").modal("hide");
    },
  },
  components: {},
};
</script>


<style scoped>
</style>