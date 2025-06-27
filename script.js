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
        btn.addEventListener('mousedown', () => {
            holdTimer = setTimeout(() => {
                out.textContent = "";
            }, 500);
        });

        btn.addEventListener('mouseup', () => {
            clearTimeout(holdTimer);
        });

        btn.addEventListener('mouseleave', () => {
            clearTimeout(holdTimer);
        })
    }
});