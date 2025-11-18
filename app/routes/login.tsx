import { AlertCircle, Lock, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useIsAdmin } from "~/api/admin";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin === true) {
      navigate("/");
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "/api"}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Login failed");
      }

      navigate("/");
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background flex-col gap-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>

      <Card className="w-full max-w-sm relative z-10">
        <CardHeader className="flex justify-center">
          <div className="pb-4 pt-2 flex flex-row gap-3 items-center">
            <img src="/techni.svg" alt="Logo" className="h-10" />
            <div className="flex-1 font-bold flex flex-col">
              <div className="text-xl leading-tight">
                <span className="text-primary">Techni</span> Entrance
              </div>
              <div className="text-sm text-muted-foreground">Panel admin'a</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-accent-foreground">
                Nazwa użytkownika
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-accent" />
                <Input
                  id="username"
                  type="text"
                  placeholder="nazwa użytkownika"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-input border border-border text-foreground placeholder:muted"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-accent-foreground">
                Hasło
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-accent" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-input border border-border text-foreground placeholder:muted"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full text-foreground mt-2">
              {loading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </form>
        </CardContent>
      </Card>
      {error && (
        <Alert variant="destructive" className="bg-destructive/20 border-destructive max-w-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-destructive-foreground">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default LoginPage;
