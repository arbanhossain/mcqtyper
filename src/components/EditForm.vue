<template>
    <form id="editForm">
        <textarea
          v-model="mcq.statement"
          form="editForm"
          cols="120"
          rows="10"
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
      </form>
</template>

<script>
export default {
    name: "EditForm",
    props: {
        mcq: Object,
    }
}
</script>