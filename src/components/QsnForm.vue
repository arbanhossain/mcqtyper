<template>
  <form id="qsnForm">
    <textarea
      form="qsnForm"
      cols="120"
      rows="10"
      placeholder="Type Question Statement"
      name="statement"
    ></textarea>
    <div v-for="i in numberOfChoices" :key="i">
      <textarea
        form="qsnForm"
        cols="30"
        rows="2"
        placeholder="Type Choice"
        :name="i"
      ></textarea>
    </div>
    <button @click.prevent="submitQsn">Submit Question</button>
  </form>
</template>

<script>
export default {
    name: 'QsnForm',
    props: {
        numberOfChoices: Number, 
    },
    methods: {
        submitQsn() {
            //console.log("submitted");
            let form = new FormData(document.forms.qsnForm);
            let formObject = {};
            form.forEach((value, key) => formObject[key] = value);
            let qsn = {};
            qsn["statement"] = formObject["statement"];
            qsn["choices"] = [];
            for(const [key, value] of Object.entries(formObject)) { if(!isNaN(parseInt(key))) qsn["choices"].push(value) };
            if(this.validateQsn(qsn) == false){ alert("Invalid Question"); return;}
            this.$emit('submit-qsn', qsn);
            document.forms.qsnForm.reset();
            console.log(JSON.stringify(qsn));
        },
        validateQsn(qsn){
            if(qsn.statement && qsn.statement!='' && this.choiceValidator(qsn.choices)) {
                console.log(qsn);
                return true;
            }
            else return false;
        },
        choiceValidator(arr){
            if(arr.filter( (elem) => {return (typeof(elem) == "string" && elem != '')} ).length == this.numberOfChoices) return true;
            else return false;
        }
    }
}
</script>