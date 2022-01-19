<template>
  <Questions @delete-qsn="deleteQsn" :questions="questions" />
  <AddQsn @show-form="toggleShowForm" :showForm="showForm" />
  <div v-show="showForm">
    <QsnForm @submit-qsn="submitQsn" :numberOfChoices="this.numberOfChoices" />
  </div>
  <div><button style="background: green" @click="saveQsn">Save</button></div>
</template>

<script>
import Questions from "./components/Questions.vue";
import AddQsn from "./components/AddQsn.vue";
import QsnForm from "./components/QsnForm.vue";

export default {
  name: "App",
  components: {
    Questions,
    AddQsn,
    QsnForm,
  },
  data() {
    return {
      questions: [
        {
          id: "1",
          statement: "WHat is thathh $a=44$",
          choices: ["eheheh", "ohohoh", "lalala", "didid"],
        },
        {
          id: "2",
          statement: "huh waht da hesll `sin 120`",
          choices: ["googoogog", "dododod", "yoyoyoyo", "gggg"],
        },
      ],
      currentId: 0,
      showForm: false,
      numberOfChoices: 4,
      msg: 'asdf',
    };
  },
  // watch: {
  //   questions (val){
  //     console.log(this.questions);
  //   }
  // },
  created() {
    if (localStorage.getItem("questions") === null) {
      localStorage.setItem("questions", JSON.stringify(this.questions));
    } else {
      this.questions = JSON.parse(localStorage.getItem("questions"));
    }
  },
  methods: {
    toggleShowForm() {
      this.showForm = !this.showForm;
    },
    submitQsn(qsn) {
      qsn["id"] = (++this.currentId).toString();
      this.questions = [...this.questions, qsn];
      this.updateLocalStorage();
    },
    deleteQsn(id) {
      this.questions = this.questions.filter((obj) => {
        return obj.id != id;
      });
      this.updateLocalStorage();
    },
    saveQsn() {
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem("questions", JSON.stringify(this.questions));
    },
    // handleChange() {
    //   console.log(this.questions);
    // }
  },
};
</script>

<style>
</style>
