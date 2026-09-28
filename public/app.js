let selectedPages = [];
let user = null;
let accessToken = null;

// Page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
});

// Check if user is authenticated
async function checkAuth() {
    try {
        const response = await fetch('/api/auth/user');
        if (response.ok) {
            const data = await response.json();
            user = data.user;
            accessToken = data.accessToken;
            loadPages();
        } else {
            window.location.href = '/api/auth/login';
        }
    } catch (error) {
        console.error('Auth check error:', error);
        window.location.href = '/api/auth/login';
    }
}

// Load user's pages
async function loadPages() {
    try {
        const response = await fetch('/api/pages');
        const data = await response.json();

        if (data.pages && data.pages.length > 0) {
            displayPages(data.pages);
        } else {
            document.getElementById('pagesContainer').innerHTML = '<p class="text-danger">কোনো Page পাওয়া যায়নি</p>';
        }
    } catch (error) {
        console.error('Error loading pages:', error);
        document.getElementById('pagesContainer').innerHTML = '<p class="text-danger">Pages লোড করতে ত্রুটি হয়েছে</p>';
    }
}

// Display pages with checkboxes
function displayPages(pages) {
    const html = pages.map(page => `
        <div class="form-check mb-2">
            <input class="form-check-input page-checkbox" type="checkbox" value="${page.id}" id="page_${page.id}" data-name="${page.name}">
            <label class="form-check-label" for="page_${page.id}">
                ${page.name}
            </label>
        </div>
    `).join('');

    document.getElementById('pagesContainer').innerHTML = html;

    // Add event listeners to checkboxes
    document.querySelectorAll('.page-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedPages);
    });
}

// Update selected pages
function updateSelectedPages() {
    selectedPages = Array.from(document.querySelectorAll('.page-checkbox:checked')).map(cb => ({
        id: cb.value,
        name: cb.dataset.name
    }));

    const postSelected = selectedPages.map(p => p.name).join(', ') || 'কোনো Page নির্বাচন করা হয়নি';
    document.getElementById('selectedPagesPost').textContent = postSelected;
    document.getElementById('selectedPagesStory').textContent = postSelected;
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('postForm').addEventListener('submit', handlePostSubmit);
    document.getElementById('storyForm').addEventListener('submit', handleStorySubmit);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}

// Handle post submission
async function handlePostSubmit(e) {
    e.preventDefault();

    if (selectedPages.length === 0) {
        alert('দয়া করে কমপক্ষে একটি Page নির্বাচন করুন');
        return;
    }

    const caption = document.getElementById('postCaption').value;
    const mediaFile = document.getElementById('postMedia').files[0];

    if (!mediaFile) {
        alert('দয়া করে একটি ছবি বা ভিডিও নির্বাচন করুন');
        return;
    }

    await submitPost('post', selectedPages, caption, mediaFile);
}

// Handle story submission
async function handleStorySubmit(e) {
    e.preventDefault();

    if (selectedPages.length === 0) {
        alert('দয়া করে কমপক্ষে একটি Page নির্বাচন করুন');
        return;
    }

    const caption = document.getElementById('storyCaption').value;
    const mediaFile = document.getElementById('storyMedia').files[0];

    if (!mediaFile) {
        alert('দয়া করে একটি ছবি বা ভিডিও নির্বাচন করুন');
        return;
    }

    await submitPost('story', selectedPages, caption, mediaFile);
}

// Submit post/story
async function submitPost(type, pages, caption, mediaFile) {
    try {
        const formData = new FormData();
        formData.append('pageIds', JSON.stringify(pages.map(p => p.id)));
        formData.append('caption', caption);
        formData.append('media', mediaFile);
        formData.append('type', mediaFile.type.startsWith('video') ? 'video' : 'photo');

        const endpoint = type === 'post' ? '/api/posts/create' : '/api/posts/story';

        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            displayResults(type, data.results);
            if (type === 'post') {
                document.getElementById('postForm').reset();
            } else {
                document.getElementById('storyForm').reset();
            }
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('একটি ত্রুটি ঘটেছে: ' + error.message);
    }
}

// Display results
function displayResults(type, results) {
    const resultsDiv = type === 'post' ? document.getElementById('postResults') : document.getElementById('storyResults');
    const resultsList = type === 'post' ? document.getElementById('postResultsList') : document.getElementById('storyResultsList');

    const html = results.map(result => `
        <div class="alert ${result.status === 'success' ? 'alert-success' : 'alert-danger'} mb-2">
            <strong>${findPageName(result.pageId)}:</strong>
            ${result.status === 'success' ? '✅ সফল' : '❌ ব্যর্থ'}
            ${result.error ? `<br><small>${result.error}</small>` : ''}
        </div>
    `).join('');

    resultsList.innerHTML = html;
    resultsDiv.style.display = 'block';
}

// Find page name by ID
function findPageName(pageId) {
    const page = selectedPages.find(p => p.id === pageId);
    return page ? page.name : pageId;
}

// Handle logout
async function handleLogout() {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/api/auth/login';
    } catch (error) {
        console.error('Logout error:', error);
    }
            }
