import { useQuery } from "@tanstack/react-query";

export const useLogs = (options: { page?: number; pageSize?: number }) => {
  const fetchLogs = async (page: number = 1, pageSize: number = 10) =>
    fetch(`${import.meta.env.VITE_API_URL || "/api"}/admin/logs?page=${page}&page_size=${pageSize}`, {
      credentials: "include",
    }).then((res) => res.json());

  return useQuery({
    queryKey: ["logs", options.page, options.pageSize],
    queryFn: () => fetchLogs(options.page, options.pageSize),
    keepPreviousData: true,
  });
};

export const useStudentLogs = (studentId: string, options: { page?: number; pageSize?: number }) => {
  const fetchStudentLogs = async (studentId: string, page: number = 1, pageSize: number = 10) =>
    fetch(`${import.meta.env.VITE_API_URL || "/api"}/admin/logs/${studentId}?page=${page}&page_size=${pageSize}`, {
      credentials: "include",
    }).then((res) => res.json());

  return useQuery({
    queryKey: ["studentLogs", studentId, options.page, options.pageSize],
    queryFn: () => fetchStudentLogs(studentId, options.page, options.pageSize),
  });
};

export const useLogPhoto = (logId: string, photoType: "entry" | "exit", enabled: boolean = false) => {
  const fetchLogPhoto = async (logId: string, photoType: "entry" | "exit") =>
    fetch(`${import.meta.env.VITE_API_URL || "/api"}/logs/${logId}/photo?photo_type=${photoType}`, {
      credentials: "include",
    }).then((res) => res.json());

  return useQuery({
    queryKey: ["logPhoto", logId, photoType],
    queryFn: () => fetchLogPhoto(logId, photoType),
    enabled: enabled,
  });
};
