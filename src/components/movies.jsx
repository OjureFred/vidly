import React, { Component } from 'react';
import _ from 'lodash';


import Like from './common/like'
import Pagination from './common/pagination';
import {Paginate} from './utils/paginate'
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
    state = {
        movies : [],
        genres : [],
        currentPage : 1,
        pageSize : 4,
        sortColumn: {path: 'title', order: 'asc'}
     };
     componentDidMount() {
        const genres = [{ _id: " ", name: "All Genre" }, ...getGenres()]
        this.setState( { movies:getMovies(), genres:getGenres()});
     }

     handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies})
        console.log(movie)
     };

     handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
    };

    handlePageChange = page => {
       this.setState({currentPage: page});
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1})
    };

     handleSort = path => {
        const sortColumn = {...this.state.sortColumn};
        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc'
        }
        this.setState({ sortColumn});
     };



    render() {
        const { length: count} = this.state.movies;
        const {pageSize, currentPage, sortColumn, selectedGenre, movies:allMovies} = this.state;
        if (count === 0) return <p>There are no movies in the database.</p>;

        const filtered = selectedGenre && selectedGenre._id
                        ? allMovies.filter(m => m.genre._id === selectedGenre._id): allMovies;

       const sorted =  _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = Paginate(sorted, currentPage, pageSize);
        
        if (this.state.movies.length ===0)
            return <p>There are no movies in the database </p>
        
        return (
            
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                    items={this.state.genres} 
                    selectedItem = {this.state.selectedGenre}
                    onItemSelect = {this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                <p>Showing { filtered.length } movies in the database</p>
                <MoviesTable
                    movies = {movies}
                    onLike = {this.handleLike}
                    onDelete = {this.handleDelete}
                    onSort = {this.handleSort}
                />
                <Pagination 
                    onPageChange = {this.handlePageChange} 
                    itemsCount = {filtered.length} 
                    pageSize = {pageSize} 
                    currentPage = {currentPage}
             />
       
        </div>
        </div>
       
        
        )
    }

   

}

export default Movies;
