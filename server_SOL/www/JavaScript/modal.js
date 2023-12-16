

const updateModalBtns = () => {
    var spans = document.getElementsByClassName("close");
    var btns = document.getElementsByClassName("myBtn");
    var modals = document.getElementsByClassName('modal');

    // Open modal when the user clicks a button
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function(index) {
            return function() {
                modals[index].style.display = "block";
            };
        }(i);
    }
    
    // Close modal when the user clicks a span

    for (var i = 0; i < spans.length; i++) {
        spans[i].onclick = function(index) {
            return function() {
                modals[index].style.display = "none";
            };
        }(i);
    }

    // Close modal if the user clicks anywhere outside of it
    window.onclick = function(event) {
        for (var i = 0; i < modals.length; i++) {
            if (event.target === modals[i]) {
                modals[i].style.display = "none";
            }
        }
    };
}

updateModalBtns()



