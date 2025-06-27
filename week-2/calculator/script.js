const btns = document.querySelectorAll(".buttons button");
let out = document.querySelector(".output-display h6");
btns.forEach(btn => {
    btn.addEventListener('click', function() {
        if(btn.textContent === 'C'){
            out.textContent = out.textContent.slice(0, -1);
        } 
        else if (btn.textContent === '=') {
            out.textContent = out.textContent.replaceAll('×', '*');
            out.textContent = eval(out.textContent);
        }
        else{
            out.textContent += btn.textContent;
        }
        
    });

    if(btn.textContent === 'C') {
        let holdTimer;

        const startPress = (e) => {
            holdTimer = setTimeout(() => {
                out.textContent = "";
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