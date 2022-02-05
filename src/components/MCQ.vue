<template>
  <div @mouseenter="showtool = true" @mouseleave="showtool = false" class="mcq" :class="{ borders :this.$globals.borders }">
    <div v-show="showtool || showeditbox" class="mcqtools">
      <Toolbar
        @toggle-edit-form="toggleEditForm"
        @delete-qsn="deleteQsn(mcq.id)"
        @copy-qsn="copyQsn(mcq.id)"
        @paste-qsn="this.$emit('paste-qsn', mcq.id)"
        :showeditbox="showeditbox"
      />
      id = {{ mcq.id }}
    </div>

    <div v-show="showeditbox">
      <EditForm :mcq="mcq" />
    </div>

    <div v-show="!showeditbox">
      <h4 class="statement">{{ number }}. {{ mcq.statement }}</h4>
      <div class="choices" v-for="(choice, idx) in mcq.choices" :key="choice">
        <Choice :choice="choice" :bullet="idx" />
      </div>
      <h6>Answer: {{ mcq.answer }}</h6>
      <div v-if="mcq.solution && mcq.solution != ''" class="solution">
        <h6>Solution:</h6>
        {{ mcq.solution }}
      </div>
    </div>
  </div>
</template>

<script>
import QsnStatement from "./QsnStatement.vue";
import Choice from "./Choice.vue";
import EditForm from "./EditForm.vue";
import Toolbar from "./Toolbar.vue";

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
    sanitizeForImage(){
      let return_value = window.HandleImageSetting(this.$globals.imgDelimiter, this.$globals.imgPattern, this.mcq.statement);

    },
    toggleEditForm() {
      //console.log(this.$globals);
      this.showeditbox = !this.showeditbox;
      window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      this.$emit("save-qsn");
    },
    deleteQsn(id) {
      this.$emit("delete-qsn", id);
    },
    async copyQsn(id) {
      await navigator.clipboard.writeText(JSON.stringify(this.mcq));
      window.FlashMessage.success('Copied!', {theme: 'dark', timeout: 2000});
    },
  },
  emits: ["toggle-edit-form", "delete-qsn", "save-qsn", "copy-qsn", 'paste-qsn'],
};
</script>

<style scoped>
.mcq {
  margin: 20px;
  padding: 10px;
}

.borders {
  border: solid rgb(173, 173, 173) 1px;
  border-radius: 10px;
}

img {
  width: 50%;
}
</style>