const btns = document.querySelectorAll(".buttons button");
let out = document.querySelector(".output-display textarea");
btns.forEach(btn => {
    btn.addEventListener('click', function() {
        if(btn.textContent === 'C'){
            out.value = out.value.slice(0, -1);
        } 
        else if (btn.textContent === '=') {
            out.value = out.value.replaceAll('×', '*');
            out.value = eval(out.value);
        }
        else{
            out.value += btn.textContent;
        }
        
    });

    if(btn.textContent === 'C') {
        let holdTimer;

        const startPress = (e) => {
            holdTimer = setTimeout(() => {
                out.value = "";
            }, 500);
        };

        const cancelTimer = () => {
            clearTimeout(holdTimer);
        };

        btn.addEventListener('mousedown',startPress);
        btn.addEventListener('mouseup',cancelTimer);
        btn.addEventListener('mouseleave',cancelTimer);
        btn.addEventListener('touchstart', startPress);
        btn.addEventListener('touchend', cancelTimer);
        btn.addEventListener('touchcancel', cancelTimer);
    }
});