import React, { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function StudentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/admin/students/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setStudent(data);
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
  }, [id]);

  const name =
    (student?.name ? `${student.name}` : "") +
    (student?.surname ? ` ${student.surname}` : "");

  return (
    <>
      <div className="px-4 pl-6 h-14 flex items-center mt-1.5 mb-2 gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
        <h3 className="text-lg font-bold">{name}</h3>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Student {id}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <div>Loading...</div>}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!loading && !error && (
              <div className="grid gap-2">
                {student ? (
                  <pre className="p-3 rounded">
                    {JSON.stringify(student, null, 2)}
                  </pre>
                ) : (
                  <div>No student data.</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
