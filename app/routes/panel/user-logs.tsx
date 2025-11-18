import React, { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import LogComponent from "~/components/log";
import { useLogs } from "~/api/logs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "~/components/ui/pagination";
import { useUserLogs } from "~/api/user-logs";
import UserLogComponent from "~/components/user-log";

export default function UserLogsPage() {
  const [page, setPage] = useState(1);
  const { isLoading, data, error } = useUserLogs({ page });
  const pages = useMemo(() => (data ? data.total / data.limit : 0), [data]);
  const logs = useMemo(() => data?.items ?? [], [data]);

  return (
    <>
      <div className="px-4 pl-6 h-14 flex justify-between items-center mt-1.5 mb-2">
        <h3 className="text-lg font-bold">User Logs</h3>
      </div>
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
                logs.map((l: any, i: number) => <UserLogComponent key={i} log={l} />)
              ) : (
                <div className="w-full bg-card rounded-md border grid place-items-center p-4">No logs available.</div>
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
