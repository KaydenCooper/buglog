<template>
  <div class="bug">
    <router-link class="text-dark" :to="{name:'bugDetails', params: {id:bugData.id}}">
      <div class="card d-flex flex-row justify-content-around p-2">
        <span>{{bugData.title}}</span>
        <span>{{bugData.creatorEmail}}</span>
        <span v-if="bugData.closed == false" class="text-success">Open</span>
        <span v-else class="text-danger strikethrough">Closed</span>
        <span>{{bugData.updatedAt}}</span>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "bug",
  props: ["bugData"],
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>