import { createContext, useContext, useState, ReactNode } from "react";

type TripContextType = {
  people: string[];
  addPerson: (name: string) => void;
  removePerson: (index: number) => void;
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [people, setPeople] = useState<string[]>([]);

  function addPerson(name: string) {
    const trimmed = name.trim();
    if (trimmed === "") return;
    setPeople((prev) => [...prev, trimmed]);
  }

  function removePerson(index: number) {
    setPeople((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <TripContext.Provider value={{ people, addPerson, removePerson }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrip must be used inside a TripProvider");
  }
  return context;
}