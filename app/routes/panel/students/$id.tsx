import React, { useEffect, useMemo, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { ChevronLeft, Pen, Trash } from "lucide-react";
import { useStudent } from "~/api/students";
import DeleteSudentDialog from "~/components/dialogs/delete-student";
import EditStudentDialog from "~/components/dialogs/edit-student";
import { useStudentLogs } from "~/api/logs";
import LogComponent from "~/components/log";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "~/components/ui/pagination";

function StudentLogs({ studentId }: { studentId: string }) {
  const [page, setPage] = useState(1);
  const { isLoading, data, error } = useStudentLogs(studentId, { page });
  const logs = useMemo(() => data?.items ?? [], [data]);

  return (
    <div className="px-4 flex-1 h-0 overflow-y-auto">
      {isLoading && <div className="w-full bg-card rounded-md border grid place-items-center p-4">Loading...</div>}

      {!!error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{String(error)}</AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && (
        <>
          <div className="grid gap-2 flex-1">
            {logs && logs.length > 0 ? (
              logs.map((l: any, i: number) => <LogComponent key={i} log={l} withName={false} />)
            ) : (
              <div className="w-full bg-card rounded-md border grid place-items-center p-4">No logs available.</div>
            )}
          </div>
          {data?.total > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((c) => Math.min(1, c - 1))}
                    className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: data?.total ?? 0 }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink href="#" isActive={p === page} onClick={() => setPage(p)}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((c) => Math.min(data?.total ?? c, c + 1))}
                    className={page === data?.total ? "opacity-50 cursor-not-allowed" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}

export default function StudentPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) return navigate("/students");
  const { isLoading, data, error } = useStudent(id);

  return (
    <>
      <div className="px-4 h-14 flex items-center mt-1.5 mb-2 gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </Button>
          <h3 className="text-lg font-bold">{`${data?.name} ${data?.surname}`}</h3>
        </div>
        <div className="flex gap-4">
          {data && (
            <>
              <EditStudentDialog student={data}>
                <Button variant="outline" size="icon">
                  <Pen />
                </Button>
              </EditStudentDialog>
              <DeleteSudentDialog studentId={id}>
                <Button variant="destructive" size="icon">
                  <Trash />
                </Button>
              </DeleteSudentDialog>
            </>
          )}
        </div>
      </div>
      <StudentLogs studentId={id} />
    </>
  );
}
