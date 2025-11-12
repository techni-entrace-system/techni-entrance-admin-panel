import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/panel.tsx", [
    route("logs", "routes/panel/logs.tsx"),
    route("students", "routes/panel/students.tsx"),
    route("students/:id", "routes/panel/students/$id.tsx"),
  ]),
  route("/login", "routes/login.tsx"),
] satisfies RouteConfig;
