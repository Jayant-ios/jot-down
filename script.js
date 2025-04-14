const posts = [
  { file: 'posts/first-post.md'}
  { file: 'posts/First Principle.md}
];

const container = document.getElementById('content');

async function loadPosts() {
  container.innerHTML = '';
  for (let post of posts) {
    const res = await fetch(post.file);
    const md = await res.text();
    const html = marked.parse(md);
    const article = document.createElement('article');
    article.innerHTML = `
      <h2>${post.title}</h2>
      <small>${post.date}</small>
      <div>${html}</div>
    `;
    container.appendChild(article);
  }
}
loadPosts();

document.getElementById('themeToggle').addEventListener('click', () => {
  const root = document.documentElement;
  const theme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
});
