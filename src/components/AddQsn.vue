<template>
    <button @click="$emit('show-form')">{{ showForm ? 'Close Form' : 'New Question' }}</button>
</template>

<script>
export default {
    name: 'AddQsn',
    props: {
        showForm: Boolean,
    },
    methods: {

    },
    //emits: ["show-form"]
}
</script>