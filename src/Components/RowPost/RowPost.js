import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import { imageUrl, API_KEY } from '../../constants/constants'
import axios from '../../axios'
import './RowPost.css'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState([])
  useEffect(() => {
    axios.get(props.url).then((res) => {
      setMovies(res.data.results)
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id) => {
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res) => {
      if (res.data.results.length !== 0) {
        setUrlId(res.data.results[0])
      } else {
        console.log('Trailer not found');
      }
    })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) =>
          <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="Poster" />
        )}
      </div>
      {urlId.key && <Youtube opts={opts} videoId={urlId.key} />  }
    </div>
  )
}

export default RowPost