import React, { useState, useEffect } from 'react'
import { usePricing } from '../context/PricingContext'

export default function Step1({ onNext }) {
  const { data, setData } = usePricing()
  const [publico, setPublico] = useState(data.paso1.publico)
  const [oferta, setOferta] = useState(data.paso1.oferta)
  const [valorDiferencial, setValorDiferencial] = useState(data.paso1.valorDiferencial)
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!publico || !oferta) {
      setError('Todos los campos obligatorios')
      return
    }
    setData(prev => ({ ...prev, paso1: { publico, oferta, valorDiferencial } }))
    onNext()
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Paso 1: Define tu público y producto</h2>
      <div className="mb-2">
        <label className="block mb-1">Describe tu público objetivo*</label>
        <textarea value={publico} onChange={e => setPublico(e.target.value)} className="w-full border p-2" />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Nombre del producto o servicio*</label>
        <input value={oferta} onChange={e => setOferta(e.target.value)} className="w-full border p-2" />
      </div>
      <div className="mb-2">
        <label className="block mb-1">¿Cuál es tu valor diferencial?</label>
        <input value={valorDiferencial} onChange={e => setValorDiferencial(e.target.value)} className="w-full border p-2" />
      </div>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Siguiente →</button>
    </div>
  )
}
