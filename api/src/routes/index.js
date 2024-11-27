import { Router } from "express";
import { usersRoutes } from "./user.routes.js";
import { sessionsRoutes } from "./sessions.routes.js";
import { movieNotesRoutes } from "./movie-notes.routes.js";

export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/movie-notes", movieNotesRoutes);
