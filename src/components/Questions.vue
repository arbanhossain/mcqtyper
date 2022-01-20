<template>
    <div ref="qsns" v-for="(mcq,idx) in questions" :key="mcq.id">
        <MCQ @save-qsn="this.$emit('save-qsn')" @paste-qsn="this.$emit('paste-qsn', mcq.id)" @delete-qsn="this.$emit('delete-qsn', mcq.id)" :mcq="mcq" :number="idx+1" />
    </div>
    
</template>

<script>
import MCQ from './MCQ.vue';

export default {
    name: 'Questions',
    components: {
        MCQ,
    },
    props: {
        questions: Object,
    },
    emits: ['delete-qsn', 'save-qsn', 'paste-qsn'],
}
</script>