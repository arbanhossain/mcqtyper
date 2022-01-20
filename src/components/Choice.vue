<template>
    <p class="choice">
        <b>{{this.$globals.bulletNames[bullet]}} .</b> {{choice}}
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