import React, { useState } from 'react'
import { usePricing } from '../context/PricingContext'
import { jsPDF } from 'jspdf'

export default function Step5({ onPrev }) {
  const { data } = usePricing()
  const [precioCompetencia, setPC] = useState(data.paso5.precioCompetencia)
  const venta = data.paso4.precioRedondeado || data.paso4.precioBruto
  let mensaje = ''
  if (precioCompetencia) {
    if (venta > precioCompetencia * 1.2) mensaje = 'Revisa tus costos o margen'
    else if (venta < precioCompetencia * 0.8) mensaje = 'Verifica que no estés dejando poca ganancia'
    else mensaje = 'Precio competitivo en rango medio'
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Resumen Sistema de Pricing', 10, 10)
    doc.text(`Público: ${data.paso1.publico}`, 10, 20)
    doc.text(`Producto: ${data.paso1.oferta}`, 10, 30)
    doc.text(`Costo total: ${data.paso3.costoTotal.toFixed(2)}`, 10, 40)
    doc.text(`Precio venta: ${venta.toFixed(2)}`, 10, 50)
    doc.save('pricing.pdf')
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Paso 5: Validar</h2>
      <div className="mb-2">
        <label className="block mb-1">Precio promedio de la competencia (MXN)</label>
        <input type="number" value={precioCompetencia} onChange={e=>setPC(e.target.value)} className="w-full border p-2" />
      </div>
      {mensaje && <p className="mb-4">{mensaje}</p>}
      <div className="flex justify-between">
        <button onClick={onPrev} className="bg-gray-300 px-4 py-2 rounded">← Atrás</button>
        <div>
          <button onClick={exportPDF} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Exportar a PDF</button>
        </div>
      </div>
    </div>
  )
}
