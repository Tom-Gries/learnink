import { createContext, useContext, useEffect, useState } from "react";

const StapleContext = createContext();

export function useStaples() {
  return useContext(StapleContext);
}

export function StapleProvider({ children }) {
  const [staples, setStaples] = useState([]);
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