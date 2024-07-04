const botaoCriptografia = document.getElementById('botaoCriptografia');
const botaoDescriptografia = document.getElementById('botaoDescriptografia');
const textoDeEntrada = document.getElementById('textoDeEntrada');
const saidaDeTexto = document.getElementById('saidaDeTexto');
const botaoCopiar = document.getElementById('botaoCopiar');
const preResultado = document.getElementsByClassName("pre-resultado");
const segredoCriptografado = {
    "e" : "enter",
    "i" : "imes",
    "a" : "ai",
    "o" : "ober",
    "u" : "ufat"
}

textoDeEntrada.addEventListener("input", validarTexto);
botaoCriptografia.onclick = criptografar; 
botaoDescriptografia.onclick = descriptografar;
botaoCopiar.onclick = resultadoDaCopia;

function criptografar(){
    if (textoDeEntrada.value !== ""){
        const text = textoDeEntrada.value;
        let criptografia = text;
        for (const key in segredoCriptografado) {
            const regex = new RegExp(key, "g");
            criptografia = criptografia.replace(regex, segredoCriptografado[key]);
        }
        escreverResultado(criptografia);
    }
}

function descriptografar(){
    if (textoDeEntrada.value !== ""){
        const text = textoDeEntrada.value;
        let criptografia = text;
        for (const key in segredoCriptografado) {
            const regex = new RegExp(segredoCriptografado[key], "g");
            criptografia = criptografia.replace(regex, key);
        }
        escreverResultado(criptografia);
    }
}

function escreverResultado(text){
    saidaDeTexto.value = text;
    mostrarOuEsconderTexto("none", "block");
}

function resultadoDaCopia(){
    saidaDeTexto.select();
    if (!navigator.clipboard) {
        document.textContent("copy")
        return 
    }
    navigator.clipboard.writeText(saidaDeTexto.value);
}

function validarTexto() {
    if (textoDeEntrada.value === "") {
      mostrarOuEsconderTexto("block", "none");
      return;
    }

    const regex = /[W]|[áéíóúÁÉÍÓÚñÑ¿¡«»“”‘’'"´`+*()\-–—/\\=|#@^\[\]{}%$§&~;:<>!?]|[A-Z]/g;
    const textoLimpo = textoDeEntrada.value.replace(regex, "");
    textoDeEntrada.value = textoLimpo;
}

function mostrarOuEsconderTexto(style1, style2){
    for (let i = 0; i < preResultado.length; i++) {
      preResultado[i].style.display = style1;
    }
    saidaDeTexto.style.display = style2;
    botaoCopiar.style.display = style2;
}