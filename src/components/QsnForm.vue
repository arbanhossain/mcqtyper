<template>
  <form id="qsnForm">
    <textarea
      form="qsnForm"
      cols="120"
      rows="7"
      placeholder="Type Question Statement"
      name="statement"
    ></textarea>
    <div v-for="i in numberOfChoices" :key="i">
      <textarea
        form="qsnForm"
        cols="30"
        rows="2"
        :placeholder="`Type Choice (${this.$globals.bulletNames[i - 1]})`"
        :name="i"
      ></textarea>
    </div>
    <div>
      <span v-for="i in numberOfChoices" :key="i" class="solnChoice">
        <input
          type="radio"
          name="formChoice"
          :id="`choice` + i.toString()"
          :value="this.$globals.bulletNames[i - 1]"
        />
        <label class="choiceLabel" :for="`choice` + i.toString()">{{
          this.$globals.bulletNames[i - 1]
        }}</label>
      </span>
    </div>
    <textarea
      form="qsnForm"
      name="solution"
      cols="120"
      rows="7"
      placeholder="Type Solution (if necessary)"
    ></textarea>
    <br>
    <button @click.prevent="submitQsn">Submit Question</button>
  </form>
</template>

<script>
export default {
  name: "QsnForm",
  props: {
    numberOfChoices: Number,
  },
  methods: {
    submitQsn() {
      //console.log("submitted");
      let form = new FormData(document.forms.qsnForm);
      let formObject = {};
      form.forEach((value, key) => (formObject[key] = value));
      let qsn = {};
      qsn["statement"] = formObject["statement"];
      qsn["answer"] = formObject["formChoice"];
      qsn["solution"] = formObject["solution"];
      qsn["choices"] = [];
      for (const [key, value] of Object.entries(formObject)) {
        if (!isNaN(parseInt(key))) qsn["choices"].push(value);
      }
      if (this.validateQsn(qsn) == false) {
        alert("Invalid Question");
        return;
      }
      this.$emit("submit-qsn", qsn);
      document.forms.qsnForm.reset();
      console.log(JSON.stringify(qsn));
    },
    validateQsn(qsn) {
      if (
        qsn.statement &&
        qsn.statement != "" &&
        qsn.answer &&
        qsn.answer != "" &&
        this.choiceValidator(qsn.choices)
      ) {
        console.log(qsn);
        return true;
      } else return false;
    },
    choiceValidator(arr) {
      if (
        arr.filter((elem) => {
          return typeof elem == "string" && elem != "";
        }).length == this.numberOfChoices
      )
        return true;
      else return false;
    },
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