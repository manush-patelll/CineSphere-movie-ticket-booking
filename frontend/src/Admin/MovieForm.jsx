import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieForm = ({ movie, onSave, onCancel }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    generes: "",
    cast: "",
    duration: "",
    releaseDate: "",
    discription: "",
    ...movie,
  });

  const [moviePosterFile, setMoviePosterFile] = useState(null);
  const [movieBackgroundFile, setMovieBackgroundFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "moviePoster") {
      setMoviePosterFile(files[0]);
    } else if (name === "movieBackground") {
      setMovieBackgroundFile(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("generes", formData.generes);
    formDataToSend.append("cast", formData.cast);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("releaseDate", formData.releaseDate);
    formDataToSend.append("discription", formData.discription);

    if (moviePosterFile) {
      formDataToSend.append("moviePoster", moviePosterFile);
    }
    if (movieBackgroundFile) {
      formDataToSend.append("movieBackground", movieBackgroundFile);
    }

    onSave(formDataToSend);
    navigate("/admin");
  };

  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg text-white">
      <h3 className="text-lg font-semibold mb-4">
        {movie?.id ? "Edit Movie" : "Add New Movie"}
      </h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Genres* (comma separated)
            </label>
            <input
              type="text"
              name="generes"
              value={formData.generes}
              onChange={handleChange}
              placeholder="Action, Drama"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (minutes)*
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Release Date*
            </label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Poster Image*
            </label>
            <input
              type="file"
              name="moviePoster"
              onChange={handleFileChange}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
              accept="image/*"
              required={!movie?.id}
            />
            {movie?.moviePoster && !moviePosterFile && (
              <p className="text-xs text-gray-400 mt-1">
                Current: {movie.moviePoster}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Background Image
            </label>
            <input
              type="file"
              name="movieBackground"
              onChange={handleFileChange}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
              accept="image/*"
            />
            {movie?.movieBackground && !movieBackgroundFile && (
              <p className="text-xs text-gray-400 mt-1">
                Current: {movie.movieBackground}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Casts (comma separated)
            </label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              placeholder="Actor 1, Actor 2"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="discription"
              value={formData.discription}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
