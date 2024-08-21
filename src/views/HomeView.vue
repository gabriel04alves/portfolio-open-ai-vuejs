<script setup>
import { ref, onMounted } from 'vue'
import WelcomeComponent from "../components/WelcomeComponent.vue";
import QuestionsCard from '@/components/QuestionsCard.vue'
import DataService from '@/services/DataService.js'

const questions = ref([])

onMounted(() => {
  DataService.getQuestions()
    .then((res) => {
      questions.value = res 
    })
    .catch((error) => {
      console.log(error);
    })
})
</script>

<template>
  <main>
    <WelcomeComponent/>
    <div class="content">
      
      <QuestionsCard 
        v-for="question in questions" 
        :key="question.id" 
        :question="question" 
        data-aos="zoom-in"
      />

    </div>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1vh;
    margin: 1vh 0 0 0;
    width: 50%;
  }
  @media only screen and (max-width: 480px) {
    .content {
      margin-bottom: 3.5vh;
    }      
  }
</style>
