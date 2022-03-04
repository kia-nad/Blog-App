import { useState } from "react";
import "./write.css";
import Cookies from 'js-cookie'
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [movieTitle, setMovieTitle] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movie = await axios.get("Api Website" 
                                + movieTitle 
                                + "Apikey", {
    })
    console.log(movie)
    const newPost = {
      username: Cookies.get('username'),
      movieImg : movie.data.Poster,
      movieTitle : movieTitle,
      movieSummary : movie.data.Plot,
      metaScore : movie.data.Metascore,
      Genre : movie.data.Genre,
      Director : movie.data.Director,
      Runtime : movie.data.Runtime,
      Year : movie.data.Year,
      imdbRating : movie.data.imdbRating,
      title : title,
      desc : desc,
    };
    try {
      const res = await axios.post("/api/posts/", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  }
  console.log(Cookies.get('username'))
  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
          </label>
          <input
            className="writeInput"
            placeholder="Movie title"
            type="text"
            autoFocus={true}
            onChange={e=>setMovieTitle(e.target.value)}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e=>setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
