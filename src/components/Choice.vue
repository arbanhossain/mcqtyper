<template>
    <p class="choice">
        {{this.$globals.bulletNames[bullet]}} . {{choice}}
    </p>
</template>

<script>
export default {
    name: 'Choice',
    props: {
        choice: String,
        bullet: Number,
    },
}
</script>