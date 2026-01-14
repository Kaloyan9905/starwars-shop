document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initProductFilter();
    initProductModal();
});

/* Mobile Menu */
function initMobileMenu() {
    var menuToggle = document.querySelector('.menu-toggle');
    var navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

/* Product Filter */
function initProductFilter() {
    var filterButtons = document.querySelectorAll('.filter-btn');
    var products = document.querySelectorAll('.product-card');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Filter products
            var category = button.dataset.category;
            products.forEach(function(product) {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
}

/* Product Modal */
function initProductModal() {
    var productCards = document.querySelectorAll('.product-card');
    var modal = document.querySelector('.product-modal');
    var modalClose = document.querySelector('.modal-close');

    if (!modal) return;

    // Open modal on product click
    productCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var imgSrc = card.querySelector('.product-image img').src;
            var category = card.querySelector('.product-category').textContent;
            var name = card.querySelector('.product-name').textContent;
            var description = card.dataset.description || 'Няма налично описание.';

            // Populate modal
            modal.querySelector('.modal-image').innerHTML = '<img src="' + imgSrc + '" alt="' + name + '">';
            modal.querySelector('.modal-category').textContent = category;
            modal.querySelector('.modal-name').textContent = name;
            modal.querySelector('.modal-description').textContent = description;

            // Show modal
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on click outside modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}
