<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  question: {
    type: Object,
    required: true,
  },
})
</script>

<template>
    <RouterLink class="link" :to="{ name: 'question-details', params: { id: question.id }}">
        <div class="question-container">
            <h2>{{ question.title }}</h2>
            <span>{{ question.question }}</span>
        </div>
    </RouterLink>
</template>

<style scoped>
    .link {
        text-decoration: none;
    }
    .question-container {
        display: flex;
        flex-direction: column;
        
        gap: 0.4vh;
        padding: 1rem;
        cursor: pointer;
       
        border: solid 1px #424242;
        border-radius: 20px;

        text-align: start;
        color: #FFF;
        text-decoration: none;
    }
    
    .question-container:hover {
        background-color: #2c2c2c;
    }
    
    .question-container h2 {
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .question-container span {
        font-size: 0.9rem;
        color: #919191;
        font-weight: 400;
    }

    @media only screen and (max-width: 480px) {
        .question-container {
            width: 60vw;
        }
    }
</style>