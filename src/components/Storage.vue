<template>
    <div class="storage">
        <p v-if="!storage.length">当前还没有任何卡片！</p>
        <Card v-for="card of storage" :key="card.uid" :card="card"/>
    </div>
</template>

<script>
    import Card from "@/components/Card";

    export default {
        name: "Storage",
        components: {
            Card,
        },
        props: ['storage'],
    }
</script>

<style scoped>

    .storage {
        width: 100%;
        padding: 1em;
        box-sizing: border-box;


        display: flex;
        flex-direction: row;
        overflow-x: scroll;
    }

    .storage > * {
        margin-left: .5em;
        margin-right: .5em;
        flex-shrink: 0;
    }

    .storage-enter-active, .storage-leave-active {
        transition: all 1s;
    }
    .storage-enter, .storage-leave-to {
        opacity: 0;
        transform: translateX(80%) scaleX(.5) scaleY(.5);
    }
</style>