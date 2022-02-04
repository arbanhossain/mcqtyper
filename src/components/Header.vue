<template>
  <div>
    <input type="text" name="title" v-model="questionTitle" @change="updateTitle" />
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    questionTitle: String,
  },
  methods: {
    updateTitle() {
      localStorage.setItem("qsn-title", this.questionTitle);
    },
  },
};
</script>

<style scoped>
    input {
        border: none;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-size: 3rem;
    }
    input:hover {
        border: 1px solid black;
    }
</style>