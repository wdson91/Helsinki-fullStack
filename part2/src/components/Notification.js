import { useState, useEffect } from 'react'

const Notification = ({ info }) => {
  // Estado local para controlar se a notificação está aparecendo na tela
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Se recebermos alguma informação (info não é null), mostramos a notificação
    if (info && info.message) {
      setIsVisible(true)

      // Inicia o timer para esconder após 5 segundos
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 5000)

      // Função de limpeza (cleanup): 
      // Se uma nova mensagem chegar ANTES dos 5 segundos, cancelamos o timer antigo
      return () => clearTimeout(timer)
    }
  }, [info]) // O useEffect observa a prop 'info'

  // Se não estiver visível ou não tiver mensagem, não renderiza nada
  if (!isVisible || !info || !info.message) {
    return null
  }

  // Renderiza a div usando a classe de estilo que veio na prop (ex: 'error' ou 'success')
  return (
    <div className={info.style}>
      {info.message}
    </div>
  )
}

export default Notification