const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc [i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }

    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Venter på, at dokumentet er klar

    var regionSelect = document.getElementById('region');

    regionSelect.addEventListener('change', function () {

        var selectedValue = this.value;

        var selectedSection = document.getElementById(selectedValue);
        if (selectedSection) {
            var selectedSectionTop = selectedSection.offsetTop;
            window.scrollTo({
                top: selectedSectionTop,
                behavior: 'smooth'
            });
        }
    });
});
