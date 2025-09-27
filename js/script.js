 document.querySelectorAll('.nav-links a, .footer-links a, .hero-btns a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');
        navigateToPage(targetPage);
    });
});

function navigateToPage(pageId) {
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav-links a[data-page="${pageId}"]`).classList.add('active');
    window.scrollTo(0, 0);
    document.getElementById('search-results').style.display = 'none';
    removeHighlights();
}
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});
document.querySelectorAll('.rule-category h3').forEach(header => {
    header.addEventListener('click', function() {
        this.parentElement.classList.toggle('active');
    });
});

// Keresés funkció
function performSearch(term) {
    removeHighlights();
    if (term.trim() === '') {
        document.getElementById('search-results').style.display = 'none';
        return;
    }
    
    const currentPage = document.querySelector('.page-content.active');
    
    highlightSearchTerms(currentPage, term);
    
    document.getElementById('search-results').style.display = 'block';
    
    const firstHighlight = document.querySelector('.highlight');
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
function highlightSearchTerms(element, term) {
    const regex = new RegExp(term, 'gi');
    const childNodes = element.childNodes;
    
    for (let i = 0; i < childNodes.length; i++) {
        const node = childNodes[i];
        
        if (node.nodeType === 3) {
            const matches = node.nodeValue.match(regex);
            if (matches) {
                const span = document.createElement('span');
                span.innerHTML = node.nodeValue.replace(regex, match => `<span class="highlight">${match}</span>`);
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === 1 && node.childNodes) {
            if (!node.classList.contains('search-results-container') && !node.closest('header') && !node.closest('footer')) {
                highlightSearchTerms(node, term);
            }
        }
    }
    const highlights = element.querySelectorAll('.highlight');
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = `
        <h3>Keresési eredmények</h3>
        <p>${highlights.length} találat a következőre: "${term}"</p>
        <div class="search-results-list">
            <p>A találatok kiemelve lettek az oldalon.</p>
        </div>
    `;
}
function removeHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), parent);
        parent.normalize();
    });
}
document.getElementById('search-input').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        performSearch(this.value);
    }
});
document.querySelector('.search-icon').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input');
    performSearch(searchInput.value);
});
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.news-card, .rule-category, .section-header');
    
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});