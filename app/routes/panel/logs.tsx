import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

function formatDuration(ms: number) {
  if (!isFinite(ms) || ms < 0) return "—";
  const totalSec = Math.floor(ms / 1000);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export default function LogsPage() {
  const [logs, setLogs] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/admin/logs`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setLogs(data);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(String(err));
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <div className="px-4 pl-6 h-14 flex justify-between items-center mt-1.5 mb-2">
        <h3 className="text-lg font-bold">Logs</h3>
      </div>
      <div className="px-4 flex-1 h-0 overflow-y-auto">
        {loading && (
          <div className="w-full bg-card rounded-md border grid place-items-center p-4">
            Loading...
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!loading && !error && (
          <div className="grid gap-2">
            {logs && logs.length > 0 ? (
              logs.map((l, i) => {
                // If the log looks like a student entry object, render a nicer card
                const isStudentLog =
                  l &&
                  typeof l === "object" &&
                  ("student_id" in l || "name" in l || "entry_time" in l);

                if (isStudentLog) {
                  const studentId = l.student_id ?? l.studentId ?? "—";
                  const name =
                    (l.name ? `${l.name}` : "") +
                    (l.surname ? ` ${l.surname}` : "");
                  const entryIso = l.entry_time ?? l.entryTime ?? null;
                  const exitIso = l.exit_time ?? l.exitTime ?? null;
                  const entryDate = entryIso ? new Date(entryIso) : null;
                  const exitDate = exitIso ? new Date(exitIso) : null;
                  const duration =
                    entryDate && exitDate
                      ? formatDuration(exitDate.getTime() - entryDate.getTime())
                      : null;

                  return (
                    <div
                      key={i}
                      className="p-3 border flex flex-col gap-2 rounded-md bg-card"
                    >
                      <div className="flex items-center justify-between px-1">
                        <div className="font-semibold text-sm">
                          {name.trim() || "Unnamed student"}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div>Duration: {duration ?? "—"}</div>
                          <div>
                            {l.timestamp ? formatDate(l.timestamp) : ""}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-background rounded">
                          <div className="text-xs text-muted-foreground">
                            Entry
                          </div>
                          <div className="font-mono text-sm">
                            {formatDate(entryIso)}
                          </div>
                        </div>
                        <div className="p-2 bg-background rounded">
                          <div className="text-xs text-muted-foreground">
                            Exit
                          </div>
                          <div className="font-mono text-sm">
                            {formatDate(exitIso)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // fallback generic rendering
                return (
                  <div key={i} className="p-3 border rounded">
                    <div className="font-medium">
                      {l.level ?? l.type ?? "log"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {typeof l === "string"
                        ? l
                        : l.message ?? JSON.stringify(l)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {l.timestamp ?? ""}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full bg-card rounded-md border grid place-items-center p-4">
                No logs available.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
