document.addEventListener('DOMContentLoaded', function() {
    // Get the filter dropdown
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const productsContainer = document.getElementById('products-container');
    const productCards = document.querySelectorAll('.product-card');
    
    // Add event listener for category filter
    categoryFilter.addEventListener('change', filterProducts);
    
    // Add event listener for search
    searchBtn.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterProducts();
        }
    });
    
    // Function to filter products
    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        // Loop through all product cards
        productCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDesc = card.querySelector('.description').textContent.toLowerCase();
            
            // Check if the card matches the selected category and search term
            const matchesCategory = selectedCategory === 'all' || categories.includes(selectedCategory);
            const matchesSearch = searchTerm === '' || 
                                 productName.includes(searchTerm) || 
                                 productDesc.includes(searchTerm);
            
            // Show or hide the card based on filters
            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Check if no products are visible
        checkNoResults();
    }
    
    // Function to check if no products are visible
    function checkNoResults() {
        let visibleProducts = 0;
        productCards.forEach(card => {
            if (card.style.display !== 'none') {
                visibleProducts++;
            }
        });
        
        // If no products are visible, show a message
        let noResultsMsg = document.getElementById('no-results-message');
        if (visibleProducts === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-message';
                noResultsMsg.className = 'no-results';
                noResultsMsg.textContent = 'No products match your search criteria.';
                productsContainer.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    // Initialize URL parameters (for direct links to categories)
    function initFromUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            categoryFilter.value = category;
            filterProducts();
        }
    }
    
    // Call initialization function
    initFromUrlParams();
});