const API_URL = 'https://jsonplaceholder.typicode.com/users';

const searchInput = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');
const errorDetails = document.getElementById('error-details');
const retryBtn = document.getElementById('retry-btn');
const cardTemplate = document.getElementById('user-card-template');

let allUsers = [];

// API Request using async/await and try/catch
async function fetchUsers() {
  updateUIState('loading');

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    allUsers = data;
    
    renderUsers(allUsers);
  } catch (error) {
    console.error('Fetch error:', error);
    errorDetails.textContent = error.message;
    updateUIState('error');
  }
}

function renderUsers(usersToRender) {
  resultsGrid.innerHTML = '';

  if (usersToRender.length === 0) {
    updateUIState('empty');
    return;
  }

  const fragment = document.createDocumentFragment();

  usersToRender.forEach(user => {
    const clone = cardTemplate.content.cloneNode(true);

    const initial = user.name.charAt(0).toUpperCase();
    clone.querySelector('.user-avatar').textContent = initial;
    clone.querySelector('.user-name').textContent = user.name;
    clone.querySelector('.user-email').textContent = user.email;
    clone.querySelector('.user-company').textContent = user.company.name;

    fragment.appendChild(clone);
  });

  resultsGrid.appendChild(fragment);
  updateUIState('results');
}

function updateUIState(state) {
  loadingState.classList.add('hidden');
  errorState.classList.add('hidden');
  emptyState.classList.add('hidden');
  resultsGrid.classList.add('hidden');

  switch (state) {
    case 'loading':
      loadingState.classList.remove('hidden');
      break;
    case 'error':
      errorState.classList.remove('hidden');
      break;
    case 'empty':
      emptyState.classList.remove('hidden');
      break;
    case 'results':
      resultsGrid.classList.remove('hidden');
      break;
  }
}

// Debounce limits how frequently a function fires.
// Ensures the filter logic only runs 500ms AFTER the user stops typing.
function debounce(func, delay) {
  let timeoutId;
  
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(query)
  );
  renderUsers(filteredUsers);
}

const debouncedSearch = debounce(handleSearch, 500);
searchInput.addEventListener('input', debouncedSearch);

retryBtn.addEventListener('click', fetchUsers);

// Initial API call
fetchUsers();
