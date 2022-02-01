<template>
  <Header :questionTitle="questionTitle" />
  <Questions
    @save-qsn="saveQsn"
    @paste-qsn="pasteQsn"
    @delete-qsn="deleteQsn"
    :questions="questions"
  />
  <AddQsn @show-form="toggleShowForm" :showForm="showForm" />
  <div v-show="showForm">
    <QsnForm @submit-qsn="submitQsn" :numberOfChoices="this.numberOfChoices" />
  </div>
  <div><button style="background: green" @click="saveQsn">Save</button></div>
</template>

<script>
import Header from "./components/Header.vue";
import Questions from "./components/Questions.vue";
import AddQsn from "./components/AddQsn.vue";
import QsnForm from "./components/QsnForm.vue";

export default {
  name: "App",
  components: {
    Header,
    Questions,
    AddQsn,
    QsnForm,
  },
  data() {
    return {
      questions: [],
      currentId: "",
      showForm: false,
      numberOfChoices: 4,
      questionTitle: "",
    };
  },
  // watch: {
  //   questions (val){
  //     window.MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  //   }
  // },
  created() {
    if (localStorage.getItem("questions") === null) {
      localStorage.setItem("questions", JSON.stringify(this.questions));
    } else {
      this.questions = JSON.parse(localStorage.getItem("questions"));
    }
    this.currentId = this.updateID();
  },
  mounted() {
    try {
      window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    } catch (error) {
      console.log(error);
    }
  },
  updated() {
    window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  },
  methods: {
    updateID() {
      let id = "";
      do {
        id = Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 8);
      } while (
        this.questions.filter((obj) => {
          return obj.id == id;
        }).length != 0
      );
      console.log(id);
      return id;
    },
    toggleShowForm() {
      this.showForm = !this.showForm;
    },
    submitQsn(qsn) {
      qsn["id"] = this.updateID();
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
      console.log(JSON.stringify(this.questions));
    },
    async pasteQsn(id) {
      let qsn = JSON.parse(await navigator.clipboard.readText());
      qsn.id = this.updateID();
      let idx = [...this.questions].findIndex((obj) => {
        return obj.id == id;
      });
      let newqsn = this.questions;
      newqsn.splice(idx, 0, qsn);
      this.questions = newqsn;
      //console.log(this.questions);
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
