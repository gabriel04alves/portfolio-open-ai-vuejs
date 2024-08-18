<script setup>
import { ref } from 'vue'
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
        <div class="questions-title">
            <h2>{{ question.title }}</h2>
            <span>{{ question.question }}</span>
        </div>
    </RouterLink>
</template>

<style scoped>
    .link {
        text-decoration: none;
    }
    .questions-title {
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
    
    .questions-title:hover {
        background-color: #2c2c2c;
    }
    
    .questions-title h2 {
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .questions-title span {
        font-size: 0.9rem;
        color: #919191;
        font-weight: 400;
    }
</style>