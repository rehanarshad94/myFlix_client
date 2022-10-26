// requirement for creating a component
import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


// React.Component is a template or blueprint for creating a component
// export exposes the MainView component and makes it available for use for by other components, modules, and files
// class Mainview extendes React.Component creates the MainView component w/ class keyword stating its a class component and not a function component
// extends means youre telling React to create a new Mainview component using generic React.Component template as its foundation
// render() is what presents the visual representation to be displayed to viewer on the screen 
export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
          movies: [
            { _id: 1, 
                Title: 'Inception', 
                Description: 'The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets. He is offered a chance to have his criminal history erased as payment for the implantation of another person\'s idea into a target\'s subconscious.', 
                ImagePath: 'https://c8.alamy.com/compes/2c4x05r/inception-2010-dirigida-por-christopher-nolan-y-protagonizada-por-leonardo-dicaprio-joseph-gordon-levitt-ellen-page-tom-hardy-y-ken-watanabe-un-equipo-irnante-al-subconsciente-de-un-hombre-de-negocios-utilizando-la-tecnologia-de-compartir-suenos-para-una-planta-una-semilla-para-influir-en-su-decision-en-el-mundo-real-2c4x05r.jpg'
            },
            { _id: 2, 
                Title: 'The Shawshank Redemption',
                 Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit.', 
                 ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg'
                },
            { _id: 3, 
                Title: 'Gladiator', 
                Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery. Maximus is a powerful Roman general, loved by the people and the aging Emperor, Marcus Aurelius.', 
                ImagePath: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_(2000_film_poster).png'
            },
          ]
        }
      }
    
      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }
    
      render() {
        const { movies, selectedMovie } = this.state;
      
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
      
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
    }