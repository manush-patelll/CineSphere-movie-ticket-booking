const express = require("express");
const Movies = require("../models/Movies");

const createMovie = async (req, res) => {
  try {
    const imagepath = req.files["moviePoster"][0].path;
    const imagefilename = req.files["moviePoster"][0].filename;
    const bgImagepath = req.files["movieBackground"][0].path;
    const bgImagefilename = req.files["movieBackground"][0].filename;

    // console.log(bgImagefilename)
    // console.log(req.files)
    console.log(bgImagefilename)
    console.log(imagefilename)
    const { title, generes, cast, duration, releaseDate, discription } = req.body;
    const generess = generes.split(",");
    const casts = cast.split(",");
    const movie = await Movies.create({
      title,
      generes: generess,
      imagePath: imagepath,
      fileName: imagefilename,
      bgPosterPath: bgImagepath,
      bgPosterName: bgImagefilename,
      cast: casts,
      duration: duration,
      releaseDate: new Date(releaseDate),
      discription: discription
    });
    res.send(movie);
  } catch (error) {
    console.log(error)
    console.log(req.params.id)
    res.send(error);
    console.log(req.body);
    console.log(req.file);
  } finally {
    console.log("this is uploader")

  }
};

// movieController.post("/", async (req, res) => {
//   try {
//     const imagepath = req.file.path;
//     const imagefilename = req.file.filename;

//     const { title, rating, generes, cast, duration } = req.body;
//     const generess = Array(generes);
//     const movie = await Movies.create({
//       title,
//       rating,
//       generes: generess,
//       imagePath: imagepath,
//       fileName: imagefilename,
//       cast: cast,
//       duration: duration,
//     });
//     res.send(movie);
//   } catch (error) {
//     res.send(error);
//     console.log(req.body);
//     console.log(req.file);
//   }
// });

module.exports = { createMovie };
