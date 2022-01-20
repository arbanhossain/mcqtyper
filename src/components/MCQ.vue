<template>
  <div @mouseenter="showtool = true" @mouseleave="showtool = false" class="mcq">
    <div v-show="showtool || showeditbox" class="mcqtools">
      <Toolbar @toggle-edit-form="toggleEditForm" @delete-qsn="deleteQsn(mcq.id)" :showeditbox="showeditbox" />
      id = {{mcq.id}}
    </div>

    <div v-show="showeditbox">
      <EditForm :mcq="mcq" />
    </div>

    <div v-show="!showeditbox">
      <h4>{{ number }}. {{ mcq.statement }}</h4>
      <div class="choices" v-for="(choice, idx) in mcq.choices" :key="choice">
        <Choice :choice="choice" :bullet="idx" />
      </div>
    </div>
  </div>
</template>

<script>
import QsnStatement from "./QsnStatement.vue";
import Choice from "./Choice.vue";
import EditForm from './EditForm.vue';
import Toolbar from './Toolbar.vue';

export default {
  name: "MCQ",
  data() {
    return {
      showtool: false,
      showeditbox: false,
    };
  },
  components: {
    QsnStatement,
    Choice,
    EditForm,
    Toolbar,
  },
  props: {
    mcq: Object,
    number: Number,
  },
  methods: {
    toggleEditForm() {
      console.log(this.$globals);
      this.showeditbox = !this.showeditbox;
      window.MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
      this.$emit('save-qsn');
    },
    deleteQsn(id) {
      this.$emit("delete-qsn", id);
    },
  },
  emits: ['toggle-edit-form', 'delete-qsn', 'save-qsn'],
};
</script>

<style scoped>
.mcq {
  margin: 20px;
  padding: 10px;
  border: solid black 1px;
}
</style>