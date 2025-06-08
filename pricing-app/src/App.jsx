import React, { useState } from 'react'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'
import Step4 from './components/Step4'
import Step5 from './components/Step5'

function App() {
  const [step, setStep] = useState(1)

  const renderStep = () => {
    switch(step) {
      case 1: return <Step1 onNext={()=>setStep(2)} />
      case 2: return <Step2 onNext={()=>setStep(3)} onPrev={()=>setStep(1)} />
      case 3: return <Step3 onNext={()=>setStep(4)} onPrev={()=>setStep(2)} />
      case 4: return <Step4 onNext={()=>setStep(5)} onPrev={()=>setStep(3)} />
      case 5: return <Step5 onPrev={()=>setStep(4)} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 text-center text-gray-700 font-bold">Sistema de Pricing - Paso {step}/5</div>
      {renderStep()}
    </div>
  )
}

export default App
