import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import { Ellipsis, Search } from "lucide-react";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/admin/students`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setStudents(data);
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

  const filtered =
    students?.filter((s) =>
      !query
        ? true
        : JSON.stringify(s).toLowerCase().includes(query.toLowerCase())
    ) ?? [];

  return (
    <>
      <div className="px-4 pl-6 h-14 flex justify-between items-center mt-1.5 mb-2">
        <h3 className="text-lg font-bold">Students</h3>
        <InputGroup className="w-64">
          <InputGroupInput
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
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
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <div
                  key={s.serial_hash}
                  className="p-3 pl-4 border bg-card rounded-md flex items-center justify-between"
                >
                  <div className="font-medium">
                    {s.name ?? s.email ?? `Student ${s.serial_hash ?? ""}`}
                  </div>
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`${s.serial_hash}`}>
                      <Ellipsis />
                    </Link>
                  </Button>
                </div>
              ))
            ) : (
              <div className="w-full bg-card rounded-md border grid place-items-center p-4">
                No students found.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
