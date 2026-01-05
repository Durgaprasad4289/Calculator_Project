const display = document.getElementById("display");

/* ---------------- BASIC INPUT ---------------- */
function add2display(val) {
    display.value += val;
}

function clear_screen() {
    display.value = '';
}

function clear_last_element() {
    display.value = display.value.slice(0, -1);
}

function Change_sign() {
    if (!display.value) return;
    let n = Number(display.value);
    if (!isNaN(n)) display.value = -n;
}

/* ---------------- CORE ENGINE ---------------- */
function answer() {
    let exp = display.value;

    try {
        if (!exp) return;

        if (/[+\-*/.]$/.test(exp)) return;
        exp = exp.replace(/√\(/g, "Math.sqrt(");
        exp = exp.replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)");

        // log(x) → Math.log10(x)
        exp = exp.replace(/log\(/g, "Math.log10(");

        // sin, cos, tan (degree → radian)
        exp = exp.replace(/sin\(([^)]+)\)/g, "Math.sin(($1)*Math.PI/180)");
        exp = exp.replace(/cos\(([^)]+)\)/g, "Math.cos(($1)*Math.PI/180)");
        exp = exp.replace(/tan\(([^)]+)\)/g, "Math.tan(($1)*Math.PI/180)");

        /* ---------- SAFE EVALUATION ---------- */
        const result = Function(`
            "use strict";
            return (${exp});
        `)();

        if (!isFinite(result)) return;

        display.value = +result.toFixed(10);

    } catch {
        // behave like a real calculator → silent fail
        return;
    }
}
