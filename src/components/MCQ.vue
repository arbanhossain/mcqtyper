<template>
  <div @mouseenter="showtool = true" @mouseleave="showtool = false" class="mcq">

    <div v-show="showtool || showeditbox" class="mcqtools">
      <button @click="toggleEditForm">{{ showeditbox ? "Close" : "Edit" }}</button>
      <button @click="deleteQsn(mcq.id)" class="deleteButton">Delete</button>
    </div>

    <div v-show="showeditbox">
        <form id="editForm">
        <textarea v-model="mcq.statement" form="editForm" cols="120" rows="10" placeholder="Type Question Statement" name="statement"></textarea>
        <div v-for="(choice,i) in mcq.choices" :key="i">
            <textarea v-model="mcq.choices[i]" form="editForm" cols="30" rows="2" placeholder="Type Choice" :name="choice"></textarea>
        </div>
    </form>
    </div>

    <div v-show="!showeditbox">
      <h4>{{ number }}. {{ mcq.statement }}</h4>
      <div class="choices" v-for="choice in mcq.choices" :key="choice">
        <Choice :choice="choice" />
      </div>
    </div>
  </div>
</template>

<script>
import QsnStatement from "./QsnStatement.vue";
import Choice from "./Choice.vue";

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
  },
  props: {
    mcq: Object,
    number: Number,
  },
  methods: {
    toggleEditForm() {
      this.showeditbox = !this.showeditbox;
    },
    deleteQsn(id){
        this.$emit('delete-qsn', id);
    }
  },
};
</script>

<style scoped>
.mcq {
  margin: 20px;
  padding: 10px;
  border: solid black 1px;
}

.deleteButton {
    float: right;
    background: red;
}
</style>