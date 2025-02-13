const clock = document.getElementById('clock');

const dataAlvo = new Date("2025-12-31 23:59:59")

function atualizarRelogio(){
    const agora = new Date();
    const diferenca = dataAlvo - agora;
    const segundos = Math.floor((diferenca / 1000) % 60);
    const minutos = Math.floor((diferenca / 1000 / 60) % 60);
    const horas = Math.floor((diferenca / 1000 / 60 / 60) % 24);
    const dias = Math.floor(diferenca / 1000 / 60 / 60 / 24);
    
    clock.innerText = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

atualizarRelogio();

setInterval(atualizarRelogio, 1000);






