<template>
  <form id="editForm">
    <textarea
      v-model="mcq.statement"
      form="editForm"
      cols="120"
      rows="7"
      placeholder="Type Question Statement"
      name="statement"
    ></textarea>
    <div v-for="(choice, i) in mcq.choices" :key="i">
      <textarea
        v-model="mcq.choices[i]"
        form="editForm"
        cols="30"
        rows="2"
        placeholder="Type Choice"
        :name="choice"
      ></textarea>
    </div>
    <div>
      <span v-for="(choice, i) in mcq.choices" :key="i" class="solnChoice">
        <input
          type="radio"
          name="editChoice"
          :id="`choice` + i.toString()"
          :value="this.$globals.bulletNames[i]"
          v-model="mcq.answer"
        />
        <label class="choiceLabel" :for="`choice` + i.toString()">{{
          this.$globals.bulletNames[i]
        }}</label>
      </span>
    </div>
    <textarea
      v-model="mcq.solution"
      form="editForm"
      name="solution"
      cols="120"
      rows="7"
      placeholder="Type Solution (if necessary)"
    ></textarea>
  </form>
</template>

<script>
export default {
  name: "EditForm",
  props: {
    mcq: Object,
  },
};
</script>

<style scoped>
    .solnChoice {
        padding-right: 1rem;
    }
    .choiceLabel {
        padding-left: 1rem;
        padding-right: 1rem;
    }
</style>