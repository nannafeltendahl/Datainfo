document.addEventListener('DOMContentLoaded', function () {

    let toggleNav = document.querySelector('.toggle-nav');
    let desktopNav = document.querySelector('.desktop-nav');

    toggleNav.addEventListener('click', function () {

        if (desktopNav.style.display === 'none' || desktopNav.style.display === '') {

            desktopNav.style.display = 'block'; // Vis .desktop-nav
        } else {
            desktopNav.style.display = 'none'; // Skjul .desktop-nav
        }
    });
});

// ------------------------------ logging ------------------------
function log(message) {
    if (console && console.log) {
        console.log(message)
    }
}