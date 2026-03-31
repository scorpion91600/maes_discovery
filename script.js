document.addEventListener('DOMContentLoaded', function () {
        const navbarToggle = document.getElementById('navbarToggle');
        const navbarMenu = document.getElementById('navbarMenu');

        if (navbarToggle && navbarMenu) {
            navbarToggle.addEventListener('click', function () {
                navbarToggle.classList.toggle('is-active');
                navbarMenu.classList.toggle('is-active');

                const isExpanded = navbarMenu.classList.contains('is-active');
                navbarToggle.setAttribute('aria-expanded', isExpanded);
            });
        }
    });