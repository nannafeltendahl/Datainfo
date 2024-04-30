// $(document).ready(function () {
//     $(".toggle-nav").click(function () {
//         $(".desktop-nav").slideToggle();
//
//     });
//
// }); jQuery-code for burger navigation mobile. Out commend, but to show I know have to use both.

document.addEventListener('DOMContentLoaded', function () {

    var toggleNav = document.querySelector('.toggle-nav');
    var desktopNav = document.querySelector('.desktop-nav');

    toggleNav.addEventListener('click', function () {

        if (desktopNav.style.display === 'none' || desktopNav.style.display === '') {

            desktopNav.style.display = 'block'; // Vis .desktop-nav
        } else {
            desktopNav.style.display = 'none'; // Skjul .desktop-nav
        }
    });
});

//jQuery-code for dropdown navigation. Out commend, but to show I know have to use both.
// $(document).ready(function () {
//     $('#region').change(function () {
//         var selectedValue = $(this).val();
//
//         // Scroll to the selected section
//         $('html, body').animate({
//             scrollTop: $('#' + selectedValue).offset().top
//         }, 1000);
//     });
// });

// ------------------------------ logging ------------------------
function log(message) {
    if (console && console.log) {
        console.log(message)
    }
}