import React, { Component } from 'react';


import Like from './common/like'
import Pagination from './common/pagination';

import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
    state = {
        movies : getMovies(),
        currentPage : 1,
        pageSize : 4
     };

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



    render() {
        const { length: count} = this.state.movies;
        const {pageSize, currentPage} = this.state;
        if (this.state.movies.length ===0)
            return <p>There are no movies in the database </p>
        
        return (
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
                {this.state.movies.map( movie => (
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
                onPageChange = {this.state.handlePageChange} 
                itemsCount = {count} 
                pageSize = {pageSize} 
                currentPage = {currentPage}
                 />
        </table>
        </div>
        )
    }

   

}

export default Movies;
