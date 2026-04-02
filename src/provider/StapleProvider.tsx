import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Stables } from "../types/Staples";

const StapleContext = createContext<{ staples: Stables[]; loading: boolean }>({
  staples: [],
  loading: true,
});

export function useStaples() {
  return useContext(StapleContext);
}

export function StapleProvider({ children }: { children: ReactNode }) {
  const [staples, setStaples] = useState<Stables[]>([]);
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

  return (
    <StapleContext.Provider value={{ staples, loading }}>
      {children}
    </StapleContext.Provider>
  );
}