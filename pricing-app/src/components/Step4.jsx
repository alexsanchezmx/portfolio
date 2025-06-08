import React, { useState } from 'react'
import { usePricing } from '../context/PricingContext'

const roundPrice = (price, option) => {
  const val = Number(option)
  if(!val) return price
  return Math.ceil(price/val)*val
}

export default function Step4({ onNext, onPrev }) {
  const { data, setData } = usePricing()
  const [margen, setMargen] = useState(data.paso4.margenPorcentaje)
  const [roundOpt, setRoundOpt] = useState(0)

  const directTotal = data.paso3.costoTotal || (data.paso2.costosDirectos.reduce((s,r)=>s+r.subtotal,0) + (data.paso2.unidadesEstimadas?data.paso2.gastosIndirectosMensuales/data.paso2.unidadesEstimadas:0))
  const precioBruto = directTotal * (1 + margen/100)
  const precioRedondeado = roundPrice(precioBruto, roundOpt)

  const handleNext = () => {
    setData(prev=>({...prev, paso4:{ margenPorcentaje:Number(margen), precioBruto, precioRedondeado }}))
    onNext()
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Paso 4: Margen de Ganancia</h2>
      <div className="mb-2">
        <label className="block mb-1">Porcentaje de margen deseado (%)</label>
        <input type="number" value={margen} onChange={e=>setMargen(e.target.value)} className="w-full border p-2" />
      </div>
      <div className="mb-2">Precio de venta bruto: ${precioBruto.toFixed(2)} MXN</div>
      <div className="mb-2">
        <label className="block mb-1">Redondear</label>
        <select value={roundOpt} onChange={e=>setRoundOpt(e.target.value)} className="border p-2">
          <option value="0">Ninguno</option>
          <option value="10">10 MXN</option>
          <option value="50">50 MXN</option>
          <option value="100">100 MXN</option>
        </select>
      </div>
      <div className="mb-4">Precio redondeado: ${precioRedondeado.toFixed(2)} MXN</div>
      <div className="flex justify-between">
        <button onClick={onPrev} className="bg-gray-300 px-4 py-2 rounded">← Atrás</button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Siguiente →</button>
      </div>
    </div>
  )
}
