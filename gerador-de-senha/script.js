// Elementos do DOM
const generateBtn = document.getElementById("generate-btn")
const passwordOutput = document.getElementById("password-output")
const copyBtn = document.getElementById("copy-btn")
const lengthSlider = document.getElementById("length-slider")
const lengthValue = document.getElementById("length-value")
const toast = document.getElementById("toast")
const loadingIcon = document.querySelector(".loading-icon")
const btnIcon = document.querySelector(".btn-icon")
const refreshBtn = document.getElementById("refresh-btn")
const clearBtn = document.getElementById("clear-btn")
const infoBtn = document.getElementById("info-btn")
const modal = document.getElementById("info-modal")
const closeModal = document.querySelector(".close-modal")
const strengthBar = document.querySelector(".strength-bar")
const strengthText = document.querySelector(".strength-text")

const options = {
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols"),
}

// Atualizar valor do slider
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value
})

// Verificar força da senha
function checkPasswordStrength(password) {
  let strength = 0
  const checks = {
    length: password.length >= 12,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
  }

  strength = Object.values(checks).filter(Boolean).length

  const strengthColors = ["#ef4444", "#f59e0b", "#22c55e"]
  const strengthTexts = ["Fraca", "Média", "Forte"]
  const index = Math.min(Math.floor(strength / 2), 2)

  strengthBar.style.width = `${(strength / 5) * 100}%`
  strengthBar.style.backgroundColor = strengthColors[index]
  strengthText.textContent = `Força: ${strengthTexts[index]}`
}

// Verificar se pelo menos uma opção está selecionada
function isAnyOptionSelected() {
  return Object.values(options).some((option) => option.checked)
}

// Atualizar estado do botão gerar
function updateGenerateButtonState() {
  generateBtn.disabled = !isAnyOptionSelected()
}

// Adicionar listeners para as opções
Object.values(options).forEach((option) => {
  option.addEventListener("change", updateGenerateButtonState)
})

// Gerar senha
function generatePassword() {
  const length = Number.parseInt(lengthSlider.value) /*le o comprimento do slider */
  let chars = ""
  /*monta uma lista de caracteres disponiveis*/  
  if (options.uppercase.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if (options.lowercase.checked) chars += "abcdefghijklmnopqrstuvwxyz"
  if (options.numbers.checked) chars += "0123456789"
  if (options.symbols.checked) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"

  let password = ""
  /*gera a senha com base no comprimento do slider de forma a escolher os caracteres aleatoriamente*/
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    password += chars[randomIndex]
  }

  return password
}

// Mostrar toast
function showToast() {
  toast.classList.add("show")
  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Copiar senha
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(passwordOutput.value)
    showToast()
  } catch (err) {
    console.error("Falha ao copiar:", err)
  }
}

// Gerar nova senha
function generateNewPassword() {
  loadingIcon.classList.remove("hidden")
  btnIcon.classList.add("hidden")
  generateBtn.disabled = true

  setTimeout(() => {
    const password = generatePassword()
    passwordOutput.value = password
    copyBtn.disabled = false
    checkPasswordStrength(password)

    loadingIcon.classList.add("hidden")
    btnIcon.classList.remove("hidden")
    generateBtn.disabled = false
  }, 500)
}

// Limpar senha
function clearPassword() {
  passwordOutput.value = ""
  copyBtn.disabled = true
  strengthBar.style.width = "0"
  strengthText.textContent = "Força da senha"
}

// Event listeners
generateBtn.addEventListener("click", generateNewPassword)
copyBtn.addEventListener("click", copyToClipboard)
refreshBtn.addEventListener("click", generateNewPassword)
clearBtn.addEventListener("click", clearPassword)

// Modal
infoBtn.addEventListener("click", () => {
  modal.classList.add("show")
})

closeModal.addEventListener("click", () => {
  modal.classList.remove("show")
})

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show")
  }
})

// Inicialização
updateGenerateButtonState()

