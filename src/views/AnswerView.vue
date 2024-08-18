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

const typeWriterEffect = (text, element, speed, callback) => {
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

let randomNumber = Math.floor(Math.random() * (75 - 50 + 1)) + 50;

onMounted(async () => {
    try {
        const res = await DataService.getQuestion(props.id)
        question.value = res // Define a pergunta como o resultado
        await nextTick();
        setTimeout(() => {
            typeWriterEffect(question.value.question, userText, 60, () => {
                setTimeout(() => {
                    typeWriterEffect(question.value.description, chatGPTText, randomNumber);
                }, 500);
            });
        }, 1000);
    } catch (error) {
        console.log(error)
    }
})
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
            <p>{{ chatGPTText }}</p>
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
    .user, .chat-response {
        display: flex;
        flex-direction: column;
        gap: 1vh;
        padding: 0 15%;
    }
    .user div, .chat-response div {
        display: flex;
        gap: 2vw;
    }
    .user p, .chat-response p {
        margin-left: 3.5rem;
        font-size: 1rem;
        font-weight: 300;
    }
    .user h2, .chat-response h2 {
        font-size: 1.4rem;
    }
    img {
        width: 2rem;
    }
</style>
