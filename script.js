const display = document.getElementById('display'); //maka ilay (input id="display") avy any amin'ny html

let calculTermine = false; //fanambarana ny "variable"
//io "variable" io dia mitahiry 'true' raha avy nanao kajy ka napiseho valiny ny efijery
// noho izany dia manampy atsika io ra ho tohizana ilay kajy ra hanomboka kajy vaovao 
// ra 'false' dia tohizany fa raha 'false' dia manomboka vaovao izy

function press(num) {
    //raha efa nanome valiny ny efijery "calculTermine == True"
    if (calculTermine && !isNaN(num) || (calculTermine && num === '.')) { // raha isa na teboka no notsindrin'ny "utilisateurs"
        display.value = num; // soloiny ilay isa vaovao (ilay notsindrin'ilay "utilisateur") ilay valiny
        calculTermine = false; // manomboka ny kajy vaovao
    } else {
        display.value += num; // raha tsy izany, dia tohizana ao arina fotsiny
        calculTermine = false; // raha iray amreo operatera (+, -, etc.) no voatsindry dia manohy kajy vaovao
    }
}

// foncton natokana ho an'ireo "caractères scientifiques" toy ny sin, cos, tan, sqrt,...
function pushOp(op) {
    if (calculTermine) {  
        display.value = op;
        calculTermine = false;
    } else {
        display.value += op;
    }
}

//ito no "fonction" mapifandray ilay bokotra 'ESC' mamafa avy hatrany ny "caractères" rehetra eo amin'ny efijery
function clearDisplay() {
    display.value = '';
    calculTermine = false;
}

//ito no "fonction" mapifandray ilay bokotra 'DEL' mamafa ilay farany amin'ny "caractères"
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expr = display.value;
        // raha misy marika fanaovana kajy mifanaraka dia avokany ny "erreur"
        // (ohatra: ++, --, -+, +-, *-, /+, sns. afa-tsy ny minus alohan'ny isa na fiasa)
        if (/[\+\-\*\/]{2,}/.test(expr)) {
            display.value = "Erreur";
            calculTermine = true;
            return;
        }
        // Ampifanarahina amin'ny teny fantatry ny JavaScript ny mari-tsoratra hita eo amin'ny efijery
        let expression = expr
            .replace(/√/g, 'Math.sqrt(')  // Ovaina ho Math.sqrt( ny √
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(');

        let openCount = (expression.match(/\(/g) || []).length;
        let closeCount = (expression.match(/\)/g) || []).length;
        for (let i = 0; i < (openCount - closeCount); i++) {
            expression += ')';
        }

        let result = eval(expression);
        
        if (isNaN(result) || !isFinite(result)) {
            display.value = "Erreur"; //namoaka "erreur"
            calculTermine = true; // raisiny ho toy ny efa vita ny kajy raha mapiseho "erreur" ny efijery mba ahafahana manoratra zavtra vaovao.
        } else {
            display.value = result;
            calculTermine = true; //vita ny kajy ka nanome valiny
        }
    } catch (error) {
        display.value = 'Syntaxe Error';
        calculTermine = true; // everina ho toy ny vita iany koa raha mamoaka "syntaxe error"
    }
}