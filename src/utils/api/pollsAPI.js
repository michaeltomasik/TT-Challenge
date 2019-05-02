
import url from '../../constants/url';

export const saveAnswer = (selectedChoice) => new Promise((resolve, reject) =>
  fetch(`${url.questionsUrl}${selectedChoice.url}`, { method: 'POST' })
    .then(res => res.json())
    .then(data => resolve({ success: true }))
    .catch(() => reject({ error: true })));


export const getQuestion = (id = 1) => new Promise((resolve, reject) =>
  fetch(`${url.questionsUrl}/questions/${id}`)
    .then(res => res.json())
    .then(data => resolve({ success: true, data }))
    .catch(() => reject({ data: {} })));


export const getQuestionsPage = (currentPage = 1) => new Promise((resolve, reject) =>
  fetch(`${url.questionsUrl}/questions?page=${currentPage}`)
    .then(res => res.json())
    .then(data => resolve({ success: true, data }))
    .catch(() => reject({ data: {} })));
