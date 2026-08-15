import { createContext, useContext, useState, ReactNode } from "react";

export type Item = {
  id: string;
  name: string;
  quantity: string;
  price: number;
  paidBy: string;
  sharedBy: string[];
};

type TripContextType = {
  people: string[];
  addPerson: (name: string) => void;
  removePerson: (index: number) => void;
  items: Item[];
  addItem: (item: Omit<Item, "id">) => void;
  updateItem: (id: string, item: Omit<Item, "id">) => void;
  removeItem: (id: string) => void;
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [people, setPeople] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  function addPerson(name: string) {
    const trimmed = name.trim();
    if (trimmed === "") return;
    setPeople((prev) => [...prev, trimmed]);
  }

  function removePerson(index: number) {
    setPeople((prev) => prev.filter((_, i) => i !== index));
  }

  function addItem(item: Omit<Item, "id">) {
    const id = Date.now().toString();
    setItems((prev) => [...prev, { ...item, id }]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function updateItem(id: string, updated: Omit<Item, "id">) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...updated, id } : it))
    );
  }

  return (
    <TripContext.Provider
    value={{ people, addPerson, removePerson, items, addItem, updateItem, removeItem }}    >
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