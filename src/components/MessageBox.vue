<template>
    <div class="message-box">
        <transition-group name="messages" tag="ul" class="message-list">
            <li v-for="message of messages" :key="message.timestamp">{{ message.content }}</li>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: "MessageBox",
        props: ['messages'],
    }
</script>

<style scoped>


    .message-box {
        width: 100%;
        padding: 1em;
        box-sizing: border-box;
        text-align: left;
        color: #999999;

        overflow-y: auto;
    }

    .message-list {
        width: 100%;
        padding: 0;
        margin: 0 0 0 1em;
        box-sizing: border-box;

        display: flex;
        flex-direction: column-reverse;

        list-style: none;
    }

    .message-list > li {
        width: 100%;
        margin: .3em 0;

        text-align: left;
    }

    .message-list > li:last-child {
        color: #333333;
        list-style: disc;
    }
</style>

<style scoped>
    .messages-enter-active, .messages-leave-active {
        transition: all 1s;
    }
    .messages-enter, .messages-leave-to {
        opacity: 0;
        transform: translateY(-50%) translateX(-20%) scaleX(0.8) scaleY(0.8);
    }
</style>