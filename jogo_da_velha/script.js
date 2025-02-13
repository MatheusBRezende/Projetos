class JogoDaVelha {
    constructor() {
      this.inicializarElementos()
      this.inicializarEstado()
      this.inicializarEventos()
    }
  
    inicializarElementos() {
      this.tabuleiro = document.querySelector('.tabuleiro')
      this.celulas = Array.from(document.querySelectorAll('.celula'))
      this.placarX = document.querySelector('.placar-x')
      this.placarO = document.querySelector('.placar-o')
      this.jogadorAtualEl = document.querySelector('.jogador-atual strong')
      this.btnReiniciar = document.querySelector('.btn-reiniciar')
      this.btnResetarPlacar = document.querySelector('.btn-resetar')
    }
  
    inicializarEstado() {
      this.tabuleiro = ['', '', '', '', '', '', '', '', '']
      this.jogadorAtual = 'X'
      this.jogoAtivo = true
      this.pontuacao = { X: 0, O: 0 }
      this.combinacoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ]
    }
  
    inicializarEventos() {
      this.celulas.forEach(celula => {
        celula.addEventListener('click', (e) => this.handleClick(e))
      })
      this.btnReiniciar.addEventListener('click', () => this.reiniciarJogo())
      this.btnResetarPlacar.addEventListener('click', () => this.resetarPlacar())
    }
  
    handleClick(event) {
      const celula = event.target
      const index = celula.dataset.index
  
      if (this.tabuleiro[index] || !this.jogoAtivo) return
  
      this.realizarJogada(celula, index)
      this.checarFimDeJogo()
    }
  
    realizarJogada(celula, index) {
      this.tabuleiro[index] = this.jogadorAtual
      celula.textContent = this.jogadorAtual
      celula.classList.add(this.jogadorAtual.toLowerCase())
      celula.disabled = true
    }
  
    checarFimDeJogo() {
      const vitoria = this.checarVitoria()
      
      if (vitoria) {
        this.finalizarJogo(true)
        return
      }
  
      if (this.checarEmpate()) {
        this.finalizarJogo(false)
        return
      }
  
      this.trocarJogador()
    }
  
    checarVitoria() {
      return this.combinacoesVitoria.some(combinacao => {
        if (this.tabuleiro[combinacao[0]] &&
            this.tabuleiro[combinacao[0]] === this.tabuleiro[combinacao[1]] &&
            this.tabuleiro[combinacao[0]] === this.tabuleiro[combinacao[2]]) {
          
          // Destacar células vencedoras
          combinacao.forEach(index => {
            this.celulas[index].classList.add('vencedor')
          })
          
          return true
        }
        return false
      })
    }
  
    checarEmpate() {
      return this.tabuleiro.every(celula => celula !== '')
    }
  
    finalizarJogo(vitoria) {
      this.jogoAtivo = false
  
      if (vitoria) {
        this.pontuacao[this.jogadorAtual]++
        this.atualizarPlacar()
        setTimeout(() => {
          alert(`Jogador ${this.jogadorAtual} venceu!`)
          this.reiniciarJogo()
        }, 100)
      } else {
        setTimeout(() => {
          alert('Empate!')
          this.reiniciarJogo()
        }, 100)
      }
    }
  
    trocarJogador() {
      this.jogadorAtual = this.jogadorAtual === 'X' ? 'O' : 'X'
      this.jogadorAtualEl.textContent = this.jogadorAtual
    }
  
    reiniciarJogo() {
      this.tabuleiro = ['', '', '', '', '', '', '', '', '']
      this.jogoAtivo = true
      
      this.celulas.forEach(celula => {
        celula.textContent = ''
        celula.classList.remove('x', 'o', 'vencedor')
        celula.disabled = false
      })
      
      this.jogadorAtual = 'X'
      this.jogadorAtualEl.textContent = this.jogadorAtual
    }
  
    resetarPlacar() {
      this.pontuacao = { X: 0, O: 0 }
      this.atualizarPlacar()
      this.reiniciarJogo()
    }
  
    atualizarPlacar() {
      this.placarX.textContent = this.pontuacao.X
      this.placarO.textContent = this.pontuacao.O
    }
  }
  
  // Inicializar o jogo quando o DOM estiver carregado
  document.addEventListener('DOMContentLoaded', () => {
    new JogoDaVelha()
  })
  