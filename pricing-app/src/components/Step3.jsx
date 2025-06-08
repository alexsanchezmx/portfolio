import React from 'react'
import { usePricing } from '../context/PricingContext'

export default function Step3({ onNext, onPrev }) {
  const { data, setData } = usePricing()
  const directTotal = data.paso2.costosDirectos.reduce((sum,r)=>sum + r.subtotal,0)
  const overhead = data.paso2.unidadesEstimadas? data.paso2.gastosIndirectosMensuales/data.paso2.unidadesEstimadas:0
  const total = directTotal + overhead

  const handleNext = () => {
    setData(prev=> ({...prev, paso3:{ costoDirectoTotal: directTotal, overheadUnidad: overhead, costoTotal: total }}))
    onNext()
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Paso 3: Costo Total</h2>
      <div className="mb-2">Costo Directo Total: ${directTotal.toFixed(2)} MXN</div>
      <div className="mb-2">Overhead por unidad: ${overhead.toFixed(2)} MXN</div>
      <div className="mb-4 font-bold">Costo Total: ${total.toFixed(2)} MXN</div>
      <div className="flex justify-between">
        <button onClick={onPrev} className="bg-gray-300 px-4 py-2 rounded">← Atrás</button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Siguiente →</button>
      </div>
    </div>
  )
}
