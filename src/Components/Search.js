import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
import ListBooks from "./ListBooks";
import { func, array } from "prop-types";
import { ToastContainer } from "react-toastify";
import { Throttle } from "react-throttle";

class Search extends Component {
  static propTypes = {
    onUpdateBookShelf: func.isRequired,
    books: array
  };

  state = {
    books: []
  };

  onSearch = evt => {
    if (evt.target.value === "") return false;
    BooksAPI.search(evt.target.value)
      .then(response => {
        response.map(book =>
          this.props.books
            .filter(b => b.id === book.id)
            .map(b => (book.shelf = b.shelf))
        );
        this.setState({ books: response });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <ToastContainer />
            <Throttle time="500" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={this.onSearch}
              />
            </Throttle>
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks
            books={this.state.books}
            onUpdateBookShelf={this.props.onUpdateBookShelf}
          />
        </div>
      </div>
    );
  }
}

export default Search;

/*
  NOTES: The search from BooksAPI is limited to a particular set of search terms.
  You can find these search terms here:
  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
  you don't find a specific author or title. Every search is limited by search terms.*/
