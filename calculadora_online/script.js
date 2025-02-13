// Pega o elemento do display pelo ID
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Adiciona um evento para cada botão


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            // Limpa o display
            display.value = '';
        } else if (value === '='){
            try{
                display.value = eval(display.value); //O eval basicamente calcula baseado nos caracteres que são inseridos entre os números
            }catch(error){
                display.value='Erro'
            }  
        }else{
            display.value += value;
        }
    });
});

