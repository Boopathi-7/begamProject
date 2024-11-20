import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize the Express app

app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not defined in the environment variables.");
  process.exit(1); // Exit if MongoDB URI is not provided
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// // Post schema
// const postSchema = new mongoose.Schema({
//   course: { type: String, required: true },
//   description: { type: String, required: true },
// });

// const Post = mongoose.model("Post", postSchema);

// Movie schema
const movieSchema = new mongoose.Schema({
  movie: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }, // Optional field for image URL
});

const Movie = mongoose.model("Movie", movieSchema);

// Post routes
// app.post("/api/posts", async (req, res) => {
//   const newPost = new Post({
//     course: req.body.course,
//     description: req.body.description,
//   });

//   try {
//     const savedPost = await newPost.save();
//     res.status(200).json(savedPost);
//   } catch (error) {
//     res.status(400).json({ message: "Error creating new post", error });
//   }
// });

// app.get("/api/posts", async (req, res) => {
//   try {
//     const limit = Number(req.query.limit);
//     const posts = limit ? await Post.find().limit(limit) : await Post.find();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching posts", error });
//   }
// });

// app.get("/api/posts/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: `Post with ID ${req.params.id} not found` });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching post", error });
//   }
// });

// app.put("/api/posts/:id", async (req, res) => {
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     if (updatedPost) {
//       res.status(200).json(updatedPost);
//     } else {
//       res.status(404).json({ message: `Post with ID ${req.params.id} not found` });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error updating post", error });
//   }
// });

// app.delete("/api/posts/:id", async (req, res) => {
//   try {
//     const deletedPost = await Post.findByIdAndDelete(req.params.id);

//     if (deletedPost) {
//       res.status(200).json({ message: `Post with ID ${req.params.id} deleted successfully` });
//     } else {
//       res.status(404).json({ message: `Post with ID ${req.params.id} not found` });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting post", error });
//   }
// });

// Movie routes
app.post("/api/movies", async (req, res) => {
  const newMovie = new Movie({
    movie: req.body.movie,
    description: req.body.description,
    image: req.body.image, // Optional image field
  });

  try {
    const savedMovie = await newMovie.save();
    res.status(200).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: "Error creating new movie", error });
  }
});

app.get("/api/movies", async (req, res) => {
   try {
    const limit = Number(req.query.limit);
    const movies = limit ? await Movie.find().limit(limit) : await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 

app.get("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: `Movie with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error });
  }
});

app.put("/api/movies/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (updatedMovie) {
      res.status(200).json(updatedMovie);
    } else {
      res.status(404).json({ message: `Movie with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (deletedMovie) {
      res.status(200).json({ message: `Movie with ID ${req.params.id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Movie with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
