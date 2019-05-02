
import url from '../../constants/url';

export const saveAnswer = (selectedChoice) => new Promise((resolve, reject) =>
  fetch(`${url.questionsUrl}${selectedChoice.url}`, { method: 'POST' })
    .then(res => res.json())
    .then(data => resolve({ success: true }))
    .catch(() => reject({ error: true })));
