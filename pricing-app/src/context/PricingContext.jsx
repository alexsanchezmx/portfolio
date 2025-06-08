import React, { createContext, useContext, useState, useEffect } from 'react'

const PricingContext = createContext()

export const usePricing = () => useContext(PricingContext)

const defaultData = {
  paso1: { publico: '', oferta: '', valorDiferencial: '' },
  paso2: { costosDirectos: [], gastosIndirectosMensuales: 0, unidadesEstimadas: 0 },
  paso3: { costoDirectoTotal: 0, overheadUnidad: 0, costoTotal: 0 },
  paso4: { margenPorcentaje: 0, precioBruto: 0, precioRedondeado: 0 },
  paso5: { precioCompetencia: 0, validacion: '' }
}

export function PricingProvider({ children }) {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('pricingData')
    return stored ? JSON.parse(stored) : defaultData
  })

  useEffect(() => {
    localStorage.setItem('pricingData', JSON.stringify(data))
  }, [data])

  return (
    <PricingContext.Provider value={{ data, setData }}>
      {children}
    </PricingContext.Provider>
  )
}
