import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.lspr.dev/api/devweb/', 
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getQuestions() {
    return apiClient.get('/')
      .then(response => response.data.questions) 
  },
  
  getQuestion(id) {
    return apiClient.get('/')
      .then(response => {
        const questions = response.data.questions
        return questions.find(question => question.id === id) 
      })
  }
}
