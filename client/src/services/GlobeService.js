const wonderURL = 'api/wonders/'
const quizURL = 'api/quiz/'

export default {
  getWonders(){
    return fetch(wonderURL)
    .then(res => res.json())
  },
  getQuiz(){
    return fetch(quizURL)
    .then(res => res.json())
  },
}
