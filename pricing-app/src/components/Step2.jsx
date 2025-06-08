import React, { useState } from 'react'
import { usePricing } from '../context/PricingContext'

function DirectRow({ row, index, onChange, onRemove }) {
  return (
    <tr>
      <td><input value={row.item} onChange={e=>onChange(index,'item',e.target.value)} className="border p-1"/></td>
      <td><input type="number" value={row.costoUnitario} onChange={e=>onChange(index,'costoUnitario',e.target.value)} className="border p-1 w-24"/></td>
      <td><input type="number" value={row.cantidad} onChange={e=>onChange(index,'cantidad',e.target.value)} className="border p-1 w-24"/></td>
      <td className="px-2">{(row.costoUnitario*row.cantidad).toFixed(2)}</td>
      <td><button onClick={()=>onRemove(index)} className="text-red-600">🗑</button></td>
    </tr>
  )
}

export default function Step2({ onNext, onPrev }) {
  const { data, setData } = usePricing()
  const [rows, setRows] = useState(data.paso2.costosDirectos.length? data.paso2.costosDirectos : [{item:'',costoUnitario:0,cantidad:0}])
  const [gastosIndirectosMensuales, setGIM] = useState(data.paso2.gastosIndirectosMensuales)
  const [unidadesEstimadas, setUE] = useState(data.paso2.unidadesEstimadas)

  const handleRowChange = (i, field, value) => {
    const newRows = [...rows]
    newRows[i] = { ...newRows[i], [field]: value }
    setRows(newRows)
  }
  const addRow = () => setRows([...rows, {item:'',costoUnitario:0,cantidad:0}])
  const removeRow = (i) => setRows(rows.filter((_,idx)=>idx!==i))

  const handleNext = () => {
    const updatedRows = rows.map(r=>({ ...r, costoUnitario:Number(r.costoUnitario), cantidad:Number(r.cantidad), subtotal:Number(r.costoUnitario)*Number(r.cantidad)}))
    setData(prev=> ({
      ...prev,
      paso2: { costosDirectos: updatedRows, gastosIndirectosMensuales:Number(gastosIndirectosMensuales), unidadesEstimadas:Number(unidadesEstimadas) }
    }))
    onNext()
  }

  const overhead = unidadesEstimadas? (gastosIndirectosMensuales/unidadesEstimadas):0
  
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Paso 2: Costos Directos e Indirectos</h2>
      <table className="w-full mb-2 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border">Ítem</th>
            <th className="border">Costo unitario</th>
            <th className="border">Cantidad</th>
            <th className="border">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row,i)=>(<DirectRow key={i} row={row} index={i} onChange={handleRowChange} onRemove={removeRow}/>))}
        </tbody>
      </table>
      <button onClick={addRow} className="mb-4 bg-gray-200 px-2 py-1">+ Agregar ítem</button>
      <div className="mb-2">
        <label className="block mb-1">Gastos indirectos mensuales totales (MXN)</label>
        <input type="number" value={gastosIndirectosMensuales} onChange={e=>setGIM(e.target.value)} className="w-full border p-2"/>
      </div>
      <div className="mb-2">
        <label className="block mb-1">Unidades/servicios estimados al mes</label>
        <input type="number" value={unidadesEstimadas} onChange={e=>setUE(e.target.value)} className="w-full border p-2"/>
      </div>
      <p className="mb-4">Overhead por unidad: ${overhead.toFixed(2)} MXN</p>
      <div className="flex justify-between">
        <button onClick={onPrev} className="bg-gray-300 px-4 py-2 rounded">← Atrás</button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Siguiente →</button>
      </div>
    </div>
  )
}
