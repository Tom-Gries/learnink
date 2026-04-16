import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Stable } from "../types/Staples";

type StapleContextType = {
  staples: Stable[];
  loading: boolean;
  createStaple: (staple: Stable) => Promise<void>;
  updateStaple: (staple: Stable) => Promise<void>;
};

const StapleContext = createContext<StapleContextType>({
  staples: [],
  loading: true,
  createStaple: async () => { },
  updateStaple: async () => { },
});

export function useStaples() {
  return useContext(StapleContext);
}

export function StapleProvider({ children }: { children: ReactNode }) {
  const [staples, setStaples] = useState<Stable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStaples() {
      const res = await fetch("/api/staples");
      const data = await res.json();
      setStaples(data);
      setLoading(false);
    }

    loadStaples();
  }, []);

  async function createStaple(staple: Stable) {
    const res = await fetch("/api/staples", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(staple),
    });

    const newStaple = await res.json();
    setStaples((prev) => [...prev, newStaple]);
  }

  async function updateStaple(staple: Stable) {
    console.log(staple)

    const res = await fetch(`/api/staples`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(staple),
    });
    const updatedStaple = await res.json();
    setStaples((prev) =>
      prev.map((s) => (s._id === updatedStaple._id ? updatedStaple : s))
    );
  }


  return (
    <StapleContext.Provider value={{ staples, loading, createStaple, updateStaple }}>
      {children}
    </StapleContext.Provider>
  );
}