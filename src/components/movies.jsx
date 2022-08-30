import React, { Component } from 'react';


import Like from './common/like'
import Pagination from './common/pagination';
import {Paginate} from './utils/paginate'
import ListGroup from './common/listGroup';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
    state = {
        movies : [],
        genres : [],
        currentPage : 1,
        pageSize : 4
     };
     componentDidMount() {
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
        console.log(genre)
    }



    render() {
        const { length: count} = this.state.movies;
        const {pageSize, currentPage, movies:allMovies} = this.state;
        if (count === 0) return <p>There are no movies in the database.</p>

        const movies = Paginate(allMovies, currentPage, pageSize);
        
        if (this.state.movies.length ===0)
            return <p>There are no movies in the database </p>
        
        return (
            
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                    items={this.state.genres} 
                    onItemSelect = {this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                <div>
        <p>Showing { count } movies in the database</p>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {movies.map( movie => (
                    <tr key={ movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like liked = {movie.liked} onClick={() => this.handleLike(movie)} /></td>
                    <td><button onClick = {() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
                ))}
               
            </tbody>
            <Pagination 
                onPageChange = {this.handlePageChange} 
                itemsCount = {count} 
                pageSize = {pageSize} 
                currentPage = {currentPage}
                 />
        </table>
        </div>
        </div>
       </div>
        
        )
    }

   

}

export default Movies;
