<template>
  <button @click="$emit('toggle-edit-form')">
    {{ showeditbox ? "Close" : "Edit" }}
  </button>
  <span class="rightStuff"
    ><button @click="$emit('delete-qsn')" class="deleteButton">Delete</button>
    <button @click="$emit('copy-qsn')">Copy</button>
    <button @click="$emit('paste-qsn')">Paste</button></span
  >
</template>
<script>
export default {
  name: "Toolbar",
  props: {
    showeditbox: Boolean,
  },
  methods: {
    // async copyQsn() {
    //   if (navigator.clipboard) {
    //     await navigator.clipboard.readText();
    //   }
    // },
  },
  emits: ["toggle-edit-form", "delete-qsn", "copy-qsn", 'paste-qsn'],
};
</script>

<style scoped>
button {
    margin: 0.2rem;
}
.deleteButton {
  background: red;
}
.rightStuff {
    float: right;
}
</style>