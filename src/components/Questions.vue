<template>
    <div ref="qsns" v-for="(mcq,idx) in questions" :key="mcq.id">
        <MCQ @delete-qsn="this.$emit('delete-qsn', mcq.id)" :mcq="mcq" :number="idx+1" />
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
    emits: ['delete-qsn'],
}
</script>