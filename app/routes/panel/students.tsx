import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/components/ui/input-group";
import { Ellipsis, Search } from "lucide-react";
import { useStudents } from "~/api/students";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "~/components/ui/pagination";
import StudentComponent from "~/components/student";

export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { isLoading, data, error } = useStudents({ page, query: debouncedQuery });
  const pages = useMemo(() => (data ? data.total / data.limit : 0), [data]);
  const students = useMemo(() => data?.items ?? [], [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <>
      <div className="px-4 pl-6 h-14 flex justify-between items-center mt-1.5 mb-2">
        <h3 className="text-lg font-bold">Students</h3>
        <InputGroup className="w-64">
          <InputGroupInput placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="px-4 flex-1 h-0 overflow-y-auto flex flex-col pb-8">
        {isLoading && (
          <div className="w-full bg-card rounded-md border grid place-items-center p-4 h-fit lg:col-span-2 xl:col-span-3">
            Loading...
          </div>
        )}

        {!!error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error loading students</AlertTitle>
            <AlertDescription>{String(error)}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && (
          <>
            {/* <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-3 flex-1 auto-rows-min"> */}
            <div className="grid gap-2 flex-1">
              {students.length > 0 ? (
                students.map((s: any, i: number) => <StudentComponent key={i} student={s} />)
              ) : (
                <div className="w-full bg-card rounded-md border grid place-items-center p-4 h-fit lg:col-span-2 xl:col-span-3">
                  No students found.
                </div>
              )}
            </div>
            {pages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((c) => Math.min(1, c - 1))}
                      className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink href="#" isActive={p === page} onClick={() => setPage(p)}>
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((c) => Math.min(pages, c + 1))}
                      className={page === pages ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </>
  );
}
