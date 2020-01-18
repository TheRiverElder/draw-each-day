<template>
    <div class="storage">
        <p v-if="!storage.length">当前还没有任何卡片！</p>
        <transition-group tag="div" class="cards" name="cards">
            <Card v-for="card of storage" :key="card.uid" :card="card"/>
        </transition-group>
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
        overflow-x: auto;
    }

    .cards {
        box-sizing: border-box;

        display: flex;
        flex-direction: row;
        overflow-x: visible;
    }

    .cards > * {
        margin: 0 .5em;
        flex-shrink: 0;
    }

    .cards > *:last-child {
        margin-right: 10em;
    }

    .cards-enter-active, .cards-leave-active {
        transition: all 1s;
    }
    .cards-enter, .cards-leave-to {
        opacity: 0;
        transform: translateX(50%) scaleX(.8) scaleY(.8);
    }
</style>