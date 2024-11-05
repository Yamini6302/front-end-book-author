import React from "react";
import FruitObjectArray from "./components/FruitObjectArray";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ActorList from "./components/actor/ActorList";
import Counter from "./components/Counter";
import EcomList from "./components/ecommerce/EcomList";
import TodoList from "./components/todo-app/TodoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import VenueList from "./components/training/venue/VenueList";
import VenueListHttp from "./components/training-http/venue-http/VenueListHttp";
import HeaderTraining from "./components/training/HeaderTraining";
import HeaderTrainingHttp from "./components/training-http/HeaderTrainingHttp";
import HeaderApp from "./components/HeaderApp";
import CohortList from "./components/training/cohort/CohortList";
import CohortAdd from "./components/training/cohort/CohortAdd";
import VenueAdd from "./components/training/venue/VenueAdd";
import VenueAddHttp from "./components/training-http/venue-http/VenueAddHttp";
import CohortView from "./components/training/cohort/CohortView";
import CohortViewHttp from "./components/training-http/cohort-http/CohortViewHttp";
import JsonPlaceholder from "./components/JsonPlaceholder";
import CohortListHttp from "./components/training-http/cohort-http/CohortListHttp";
import CohortAddHttp from "./components/training-http/cohort-http/CohortAddHttp";
import CohortEditHttp from "./components/training-http/cohort-http/CohortEditHttp";
import BookList from "./components/book-author/book/BookList";
import BookAdd from "./components/book-author/book/BookAdd";
import BookView from "./components/book-author/book/BookView";
import BookEdit from "./components/book-author/book/BookEdit";
import AuthorList from "./components/book-author/author/AuthorList";
import AuthorAdd from "./components/book-author/author/AuthorAdd";
import AuthorView from "./components/book-author/author/AuthorView";
import HeaderBookAuthor from "./components/book-author/HeaderBookAuthor"; 


function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderApp />
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/fruit-list" element={<FruitObjectArray />} />
          <Route path="/ecom-list" element={<EcomList />} />
          <Route path="/actor-list" element={<ActorList />} />
          <Route path="/fake-api" element={<JsonPlaceholder />} />

          <Route path="/book-author" element={<HeaderBookAuthor />}>
            <Route path="books-list" element={<BookList />} />
            <Route path="add-book" element={<BookAdd />} />
            <Route path="book-view/:id" element={<BookView />} /> 
            <Route path="book-edit/:id" element={<BookEdit />} />
            <Route path="author-list" element={<AuthorList />} />
            <Route path="author-view/:id" element={<AuthorView />} /> 
            <Route path="author-add" element={<AuthorAdd />} />
          </Route>

          <Route path="/training" element={<HeaderTraining />}>
            <Route path="venue-list" element={<VenueList />} />
            <Route path="cohort-list" element={<CohortList />} />
            <Route path="cohort-view/:cid" element={<CohortView />} />
            <Route path="cohort-add" element={<CohortAdd />} />
            <Route path="venue-add" element={<VenueAdd />} />
          </Route>
          <Route path="/training-http" element={<HeaderTrainingHttp />}>
            <Route path="venue-list-http" element={<VenueListHttp />} />
            <Route path="cohort-list-http" element={<CohortListHttp />} />
            <Route path="cohort-view-http/:cid" element={<CohortViewHttp />} />
            <Route path="cohort-add-http" element={<CohortAddHttp />} />
            <Route path="cohort-edit-http/:cid" element={<CohortEditHttp />} />
            <Route path="venue-add-http" element={<VenueAddHttp />} />
          </Route>
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
