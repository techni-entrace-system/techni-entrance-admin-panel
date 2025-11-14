import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useStudents = (options: { page?: number; pageSize?: number; query?: string }) => {
  const fetchStudents = async (page: number = 1, pageSize: number = 10, query: string = "") =>
    fetch(
      `${
        import.meta.env.VITE_API_URL || "/api"
      }/admin/students?page=${page}&page_size=${pageSize}&q=${encodeURIComponent(query)}`,
      {
        credentials: "include",
      }
    ).then((res) => res.json());

  return useQuery({
    queryKey: ["students", options.page, options.pageSize, options.query],
    queryFn: () => fetchStudents(options.page, options.pageSize, options.query),
    keepPreviousData: true,
  });
};

export const useStudent = (id: string) => {
  const fetchStudent = async (id: string) =>
    fetch(`${import.meta.env.VITE_API_URL || "/api"}/admin/students/${id}`, {
      credentials: "include",
    }).then((res) => res.json());

  return useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudent(id),
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "/api"}/admin/students/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`Failed to update student: ${res.status} ${res.statusText}`);
      }
      return res.json();
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student", data.id] });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "/api"}/admin/students/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Failed to delete student: ${res.status} ${res.statusText}`);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
