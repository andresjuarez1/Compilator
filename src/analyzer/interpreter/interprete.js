import {peg$parse} from "./translater.js";
import Swal from "sweetalert2";

export function translate(codigoFuente){
    const generateCod = peg$parse(codigoFuente.replace(/\s+/g, ' '))

    if (generateCod){
        Swal.fire({
            title: "Código correcto!",
            text: codigoFuente,
            icon: "success"
        });
        const capturedOutput = captureOutput(() => {
            eval(generateCod);
        });
        showResult(capturedOutput);
    }

    function captureOutput(callback) {
        let capturedOutput = '';
        const originalConsoleLog = console.log;
        console.log = function(message) {
            capturedOutput += message + '\n';
        };
        callback();
        console.log = originalConsoleLog;
        return capturedOutput;
    }
    function showResult(result) {
        const resultadoElemento = document.getElementById('salida');
        resultadoElemento.innerText = result;
    }
}   





