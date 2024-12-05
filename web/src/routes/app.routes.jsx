import { Routes, Route } from "react-router-dom";
import { New } from "../pages/New";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Details } from "../pages/Details";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { MovieNoteProvider } from "../hooks/movie-notes";

export function AppRoutes() {
  return (
    <MovieNoteProvider>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
      </Routes>
    </MovieNoteProvider>
  );
}
