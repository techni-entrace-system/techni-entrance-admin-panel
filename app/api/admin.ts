import { useEffect, useState } from "react";

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
  const fetchAdmin = async () =>
    fetch(`${import.meta.env.VITE_API_URL || "/api"}/me`, {
      credentials: "include",
    }).then((res) => res.ok);

  useEffect(() => {
    fetchAdmin().then((data) => {
      setIsAdmin(data);
    });
  }, []);

  return isAdmin;
};
