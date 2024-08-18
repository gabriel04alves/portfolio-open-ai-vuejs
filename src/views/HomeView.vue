<script setup>
import { ref,onMounted  } from 'vue'
import WelcomeComponent from "../components/WelcomeComponent.vue";
import QuestionsCard from '@/components/QuestionsCard.vue'
import DataService from '@/services/DataService.js'

const questions = ref([])

onMounted(() => {
  DataService.getQuestions()
    .then((res) => {
      questions.value = res.data
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
      <QuestionsCard v-for="question in questions" :key="question.id" :question="question" />
    </div>
  </main>
</template>

<style scoped>
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1vh;
    margin: 1vh 0 0 0;
  }
</style>  