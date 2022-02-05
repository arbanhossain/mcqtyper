<template>
  <input type="file" id="file-input" style="display: none" @change="loadQsn" />
  <div>
    <button style="background: green" @click="openQsn">Open</button>
  </div>
  <div ref="question" class="question">
    <Header :questionTitle="questionTitle" />
    <Questions
      @save-qsn="saveQsn"
      @paste-qsn="pasteQsn"
      @delete-qsn="deleteQsn"
      :questions="questions"
    />
  </div>
  <AddQsn @show-form="toggleShowForm" :showForm="showForm" />
  <div v-show="showForm">
    <QsnForm @submit-qsn="submitQsn" :numberOfChoices="this.numberOfChoices" />
  </div>
  <div>
    <button style="background: green" @click="saveQsnAsFile">Save</button>
  </div>
  <!-- <div>
    <button style="background: cyan" @click="showImage">Show Image</button>
  </div> -->
  <!-- <div>
    <button style="background: cyan" @click="exportPDF">Export to PDF</button>
  </div> -->
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
  created() {
    if (localStorage.getItem("questions") === null) {
      localStorage.setItem("questions", JSON.stringify(this.questions));
    } else {
      this.questions = JSON.parse(localStorage.getItem("questions"));
    }
    if (localStorage.getItem("qsn-title") === null) {
      localStorage.setItem("qsn-title", this.questionTitle);
    } else {
      this.questionTitle = localStorage.getItem("qsn-title");
    }
    this.currentId = this.updateID();
  },
  mounted() {
    try {
      this.updateImageSetting();
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
    clog() {
      console.log(this.questions);
    },
    toggleShowForm() {
      this.showForm = !this.showForm;
    },
    submitQsn(qsn) {
      qsn["id"] = this.updateID();
      this.questions = [...this.questions, qsn];
      this.updateImageSetting()
      this.updateLocalStorage();
    },
    deleteQsn(id) {
      this.questions = this.questions.filter((obj) => {
        return obj.id != id;
      });
      this.updateLocalStorage();

      window.FlashMessage.error("Deleted Question!", { timeout: 2000 });
    },
    openQsn() {
      alert("Make sure to save your question first");
      document.getElementById("file-input").click();
    },
    loadQsn() {
      let input = document.getElementById("file-input");
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.readAsText(input.files[0]);
        reader.onload = () => {
          let str = input.files[0].name;
          this.questionTitle = str.substring(0, str.length - 4);
          this.questions = JSON.parse(reader.result);
          this.updateLocalStorage();
        };
      }
    },
    changeData(res) {
      console.log(JSON.parse(res));
    },
    saveQsn() {
      this.updateLocalStorage();
      this.updateImageSetting();
    },
    saveQsnAsFile() {
      let filename = prompt("Enter File Name:", this.questionTitle);
      if (filename) {
        filename += ".qsn";
      } else {
        return;
      }
      let text = JSON.stringify(this.questions);
      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);

      window.FlashMessage.success("Save Successful", { timeout: 2000 });
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

      window.FlashMessage.info("Pasted!", { timeout: 2000 });
    },
    exportPDF() {
      console.log("printed");
    },
    updateImageSetting() {
      window.HandleImageSetting(
        this.$globals.imgDelimiter,
        this.$globals.imgPattern,
        this.$globals.imgReplaceClasses
      );
    },
    showImage(){
      this.updateImageSetting();
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
