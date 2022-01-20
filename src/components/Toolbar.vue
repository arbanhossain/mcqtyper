<template>
  <button @click="$emit('toggle-edit-form')">
    {{ showeditbox ? "Close" : "Edit" }}
  </button>
  <button @click="$emit('delete-qsn')" class="deleteButton">Delete</button>
</template>
<script>
export default {
  name: "Toolbar",
  props: {
    showeditbox: Boolean,
  },
  emits: ['toggle-edit-form', 'delete-qsn'],
};
</script>

<style scoped>
.deleteButton {
  float: right;
  background: red;
}
</style>