def binario_para_decimal(binario):
    try:
       
        decimal = int(binario, 2)
        return decimal
    except ValueError:
        return "Entrada inválida! Certifique-se de digitar apenas 0 e 1."

# Entrada do usuário
binario = input("Digite um número binário: ")
resultado = binario_para_decimal(binario)

print(f"O número binário {binario} em decimal é: {resultado}")
