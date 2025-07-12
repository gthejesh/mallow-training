function postfix(s) {
    let operators = [], result = [];
    const precedence = {
        '+': 1,
        '-': 2,
        '*': 3,
        '/': 4,
        '%': 5
    }
    let num = '';
    for (let i = 0; i < s.length; i++) {
        // console.log("result " + result + " operators " + operators);
        if (s[i] >= '0' && s[i] <= '9' || s[i] == '.') {
            num += s[i];
        }
        else if ("+-*/%".includes(s[i])) {
            if (num) {
                result.push(num);
                num = '';
            }
            if (i > 0 && "+-*/%".includes(s[i - 1]) && s[i] == '-' || i == 0 && s[i] == '-') {
                num = '-';
                continue;
            }
            while (operators.length && precedence[operators[operators.length - 1]] > precedence[s[i]]) result.push(operators.pop());
            operators.push(s[i]);
        }
    }
    if (num) result.push(num);
    while (operators.length) result.push(operators.pop());
    return result;
}

function evaluate(s) {
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (!isNaN(s[i])) {
            stack.push(+s[i]);
        }
        else {
            let b = stack.pop(), a = stack.pop();
            switch (s[i]) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
                case '%':
                    stack.push(a % b);
                    break;
                default:
            }
        }
    }
    return stack.pop();
}

let clearOnType = true;
const btns = document.querySelectorAll(".buttons button");
let out = document.querySelector(".output-display textarea");
btns.forEach(btn => {
    let txt = btn.textContent;
    btn.addEventListener('click', function () {
        if(clearOnType) {
            if (txt >= '0' && txt <= '9') out.value = '';
            clearOnType = false;
        }
        let outVal = out.value, outLen = outVal.length;
        if (txt === 'C') {
            out.value = outVal.slice(0, -1);
        }
        else if (txt === '=') {
            out.value = outVal.replaceAll('×', '*');

            let postfixValue = postfix(out.value);
            console.log(postfixValue);

            out.value = evaluate(postfixValue);
            clearOnType = true;
        }
        else if (txt == '+/-') {
            let i = outLen - 1;
            let num = '';
            while (outVal[i] >= '0' && outVal[i] <= '9') {
                num = '' + outVal[i] + num;
                i--;
            }
            if (i > 0 && "+-×/%".includes(outVal[i - 1]) && outVal[i] == '-') {
                out.value = outVal.slice(0, i) + num;
            }
            else if(i == 0 && outVal[i] == '-') {
                out.value = outVal.slice(1);
            }
            else if ("+-×/%".includes(outVal[i])) {
                out.value = outVal.slice(0, i + 1) + '-' + num;
            }
            else if (outLen == 0) {
                out.value = outVal + '-';
            }
            else if(i<0) {
                out.value = '-' + outVal;
            }

            console.log(num);

        }
        else if (("+×/%").includes(txt)) {

            if (outLen > 1 && "+-×/%".includes(outVal[outLen - 1])) {
                out.value = outVal.slice(0, -1) + txt;
            }
            else if (outLen > 0)
                out.value += txt;
        }
        else if (txt == '-' && outVal[outLen - 1] == '-') {
            if (outLen > 1 && !("+-×/%".includes(outVal[outLen - 2])))
                out.value += txt;
        }
        else {
            out.value += txt;
        }


    });

    if (txt === 'C') {
        let holdTimer;

        const startPress = (e) => {
            holdTimer = setTimeout(() => {
                out.value = "";
            }, 500);
        };

        const cancelTimer = () => {
            clearTimeout(holdTimer);
        };

        btn.addEventListener('mousedown', startPress);
        btn.addEventListener('mouseup', cancelTimer);
        btn.addEventListener('mouseleave', cancelTimer);
        btn.addEventListener('touchstart', startPress);
        btn.addEventListener('touchend', cancelTimer);
        btn.addEventListener('touchcancel', cancelTimer);
    }
});