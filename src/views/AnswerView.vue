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

let randomNumber = Math.floor(Math.random() * (75 - 40 + 1)) + 50;

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
            <div data-aos="zoom-in-left">
                <h2>Você</h2>
                <img src="../assets/images/user.svg" alt="User image">
            </div>
            <p>{{ userText }}</p>
        </div>
        <div class="chat-response">
            <div data-aos="zoom-in-right">
                <img src="../assets/images/logo-openai.svg" alt="OpenAI logo">
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

/* Estilos para a classe user */
.user {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    padding: 0 15%;
    align-self: end;
}

.user div {
    display: flex;
    justify-content: end;
    gap: 0.8vw;
    align-items: center;
}

.user p {
    margin-right: 2vw;
    font-size: 1rem;
    font-weight: 300;
    background-color: #2f2f2f;
    padding: 1rem;
    border-radius: 15px;
}

.user h2 {
    font-size: 1.3rem;
}

/* Estilos para a classe chat-response */
.chat-response {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    padding: 0 15%;
}

.chat-response div {
    display: flex;
    gap: 0.8vw;
    align-items: center;
}

.chat-response p {
    margin-left: 2vw;
    font-size: 1rem;
    font-weight: 300;
}

.chat-response h2 {
    font-size: 1.3rem;
}

/* Estilo comum para imagens */
img {
    width: 2rem;
}

/* Estilos para o cursor */
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

@media only screen and (max-width: 480px) {     
    .user p, .chat-response p {
        margin: 0rem;
    }
}
</style>