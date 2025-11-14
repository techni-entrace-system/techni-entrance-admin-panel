import { useQuery } from "@tanstack/react-query";

export const useUserLogs = (options: { page?: number; pageSize?: number }) => {
  const fetchUserLogs = async (page: number = 1, pageSize: number = 10) =>
    fetch(`${import.meta.env.VITE_API_URL || "/api"}/admin/logs-user?page=${page}&page_size=${pageSize}`, {
      credentials: "include",
    }).then((res) => res.json());

  return useQuery({
    queryKey: ["userLogs", options.page, options.pageSize],
    queryFn: () => fetchUserLogs(options.page, options.pageSize),
    keepPreviousData: true,
  });
};
