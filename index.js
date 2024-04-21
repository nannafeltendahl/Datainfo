$(document).ready(function () {
    $(".toggle-nav").click(function (){
        $(".desktop-nav").slideToggle();

    });

});
$(document).ready(function(){
    $('#region').change(function(){
        var selectedValue = $(this).val();

        // Scroll to the selected section
        $('html, body').animate({
            scrollTop: $('#' + selectedValue).offset().top
        }, 1000);
    });
});


