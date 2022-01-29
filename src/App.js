import { lazy, Suspense} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import Navigation from "./components/Navigation/Navigation";
// import HomePage from "./components/HomePage/HomePage";
// import MoviesPage from "./components/MoviesPage/MoviesPage";
// import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
// import Cast from "./components/Cast/Cast";
// import Reviews from "./components/Reviews/Reviews";

const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./components/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./components/MovieDetailsPage/MovieDetailsPage"));
const Cast = lazy(() => import("./components/Cast/Cast"));
const Reviews = lazy(() => import("./components/Reviews/Reviews"));


export default function App() {
  return (
    <>
    <Navigation />

    <Routes>
        <Route
          path='/'
          element={
            <Suspense
              fallback={
                <BallTriangle
                  color="#000"
                  height={50}
                  width={50} />}>
              <HomePage />
            </Suspense>}
        />
        <Route
          path='/movies'
          element={
            <Suspense
              fallback={
                  <BallTriangle
                    color="#000"
                    height={50}
                    width={50} />}>
              <MoviesPage />
            </Suspense>}
        />
        <Route
          path='/movies/:movieId'
          element={
            <Suspense
              fallback={
                  <BallTriangle
                    color="#000"
                    height={50}
                    width={50} />}>
              <MovieDetailsPage />
            </Suspense>}>
          <Route
            path='cast'
            element={
              <Suspense fallback={<>...</>}>
                <Cast />
              </Suspense>}
          />
          <Route
            path='reviews'
            element={
              <Suspense fallback={<>...</>}>
                <Reviews />
              </Suspense>}
          />
        </Route>
        <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

