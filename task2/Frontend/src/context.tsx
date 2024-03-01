// SimulationContext.js
import React, { createContext, useContext, useState, ReactNode } from 'react';

const SimulationContext = createContext<any>(null);

export const useSimulationData = () => useContext(SimulationContext);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [simulationData, setSimulationData] = useState(null);

  return (
    <SimulationContext.Provider value={{ simulationData, setSimulationData }}>
      {children}
    </SimulationContext.Provider>
  );
};
