import React, { Component } from "react";
import { API_URL, API_KEY } from "../../config.js";
import Navigation from "../elements/Navigation/Navigation.js";
import MovieInfo from "../elements/MovieInfo/MovieInfo.js";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar.js";
import FourColGrid from "../elements/FourColGrid/FourColGrid.js";
import Actor from "../elements/Actor/Actor.js";
import Spinner from "../elements/Spinner/Spinner.js";
import "./Movie.css";

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    if(localStorage.getItem(`${movieId}`)){
      let state = JSON.parse(localStorage.getItem(`${movieId}`))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      // First fetch the movie ...
      const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
      this.fetchItems(endpoint);
    }
  }

  fetchItems = (endpoint) => {
    const { movieId } = this.props.match.params;

    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      console.log(result)
      if (result.status_code) {
        this.setState({ loading: false });
      } else {
        this.setState({ movie: result }, () => {
          // ... then fetch actors in the setState callback function
          const endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
          fetch(endpoint)
          .then(result => result.json())
          .then(result => {
            const directors = result.crew.filter( (member) => member.job === "Director");

            this.setState({
              actors: result.cast,
              directors,
              loading: false
            }, () => {
              localStorage.setItem(`${movieId}`, JSON.stringify(this.state));
            })
          })
        })
      }
    })
    .catch(error => console.error('Error:', error))
  }


  render() {
    // es6 destructing object the props and state
    // const { movieName } = this.props.location;
    // const { movie, directors, actors, loading } = this.state;

    return (
      <div className="rmdb-movie">
        {this.state.movie ?
        <div>
            <Navigation movie={this.props.location.movieName}/>
            <MovieInfo movie={this.state.movie} directors={this.state.directors}/>
            <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue}/>
        </div>
        : null }
      {this.state.actors ?
        <div className="rmdb-movie-grid">
          <FourColGrid header={'Actors'} >
            {this.state.actors.map( (element,i) => {
              return <Actor key={i} actor={element} />
            })}
          </FourColGrid>
        </div>
      : null }
      {!this.state.actors && !this.state.loading ? <h1>No movie found!</h1> : null}
      {this.state.loading ? <Spinner /> : null} 
      </div>
    );
  }
}

export default Movie;
