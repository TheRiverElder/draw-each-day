<template>
    <div class="overlay">
        <div class="cancel" @click="$emit('exit-overlay')">
            <img :src="icons.cancel" />
        </div>
        <div class="content">
            <slot>overlay</slot>
        </div>
    </div>
</template>

<script>
    import iconCancel from "@/assets/icon/cancel.svg";

    export default {
        name: "Overlay",
        data() {
            return {
                icons: {
                    cancel: iconCancel,
                },
            }
        },
    }
</script>

<style scoped>
    .overlay {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 1em;
        margin: 0;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        align-items: center;

        background: #00000099;

        text-align: center;
    }

    .cancel {
        width: 3em;
        height: 3em;
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        border-radius: 1.5em;
        background: #FFFFFF;
        border: #42b983 solid .2em;
    }

    .cancel > img {
        width: 1.5em;
        height: 1.5em;
        padding: 0;
        margin: .5em;
    }

    .content {
        width: 100%;
        flex: 1;

        overflow-x: hidden;
        overflow-y: auto;
    }
</style>