import { useEffect, useState } from "react";

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const fetchAdmin = async () =>
    fetch(`${import.meta.env.VITE_API_URL}/admin`, {
      credentials: "include",
    }).then((res) => res.ok);

  useEffect(() => {
    fetchAdmin().then((data) => {
      setIsAdmin(data);
    });
  }, []);

  return isAdmin;
};
