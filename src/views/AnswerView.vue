<script setup>
import { ref, onMounted, nextTick } from 'vue'
import DataService from '@/services/DataService.js'

const props = defineProps({
    id: {
        required: true,
    },
})

const question = ref(null)
const userText = ref('')
const chatGPTText = ref('')

const typeWriterEffectUser = (text, element, speed, callback) => {
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            element.value += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

const typeWriterEffectChatGPT = (text, element, speed, callback) => {
    let index = 0;
    const cursor = '<span class="cursor">𒊹</span>';
    element.value = ''; 

    const interval = setInterval(() => {
        if (index < text.length) {
            chatGPTText.value = text.substring(0, index + 1) + cursor;
            index++;
        } else {
            clearInterval(interval);
            chatGPTText.value = text; 
            if (callback) callback();
        }
    }, speed);
}

let randomNumber = Math.floor(Math.random() * (75 - 50 + 1)) + 50;

onMounted(async () => {
    try {
        const res = await DataService.getQuestion(props.id);
        question.value = res; 
        await nextTick();
        setTimeout(() => {
            typeWriterEffectUser(question.value.question, userText, 60, () => {
                setTimeout(() => {
                    typeWriterEffectChatGPT(question.value.description, chatGPTText, randomNumber); 
                }, 500);
            });
        }, 1000);
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="content" v-if="question">
        <div class="user">
            <div>
                <img src="../assets/images/user.svg" alt="">
                <h2>Você</h2>
            </div>
            <p>{{ userText }}</p>
        </div>
        <div class="chat-response">
            <div>
                <img src="../assets/images/open-ai-logo-circle.svg" alt="">
                <h2>ChatGPT</h2>
            </div>
            <p v-html="chatGPTText"></p>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    margin-top: 10vh;
    gap: 3.5vh;
    text-align: left;
}

.user,
.chat-response {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    padding: 0 15%;
}

.user div,
.chat-response div {
    display: flex;
    gap: 2vw;
}

.user p,
.chat-response p {
    margin-left: 3.5rem;
    font-size: 1rem;
    font-weight: 300;
}

.user h2,
.chat-response h2 {
    font-size: 1.4rem;
}

img {
    width: 2rem;
}

.cursor {
    display: inline-block;
    animation: blink 0.8s steps(2, start) infinite;
    margin-left: 4px;
}

@keyframes blink {
    to {
        visibility: hidden;
    }
}
</style>