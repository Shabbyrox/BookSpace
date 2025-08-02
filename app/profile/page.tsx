"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/superbase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Plus, Star } from 'lucide-react';

// Placeholder for the PieChart component
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    const chartData = {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          backgroundColor: ["#E1B5EE", "#BA7FCB", "#462C90", "#483285", "#A855F7"],
          borderWidth: 1,
          borderColor: "#ffffff",
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hiding the legend for a cleaner look as in the design
        },
      },
    };

    return (
      <div style={{ width: "150px", height: "150px", margin: "0 auto" }}>
        <Pie data={chartData} options={options} />
      </div>
    );
  };

// Placeholder components for book cover 
const BookCover = ({ imageUrl, title }) => (
  <img
    src={imageUrl}
    alt={`Cover of the book ${title}`}
    className="w-28 h-40 object-cover rounded-md shadow-md shrink-0"
    style={{ backgroundColor: "#462C90" }}
  />
);


export default function ProfilePage() {

const genresData = {
  labels: ["Fiction", "Non-Fiction", "Mystery", "Fantasy", "Biography"],
  values: [10, 5, 8, 12, 6], // Example data: number of books read per genre
};

<PieChart data={genresData} />;

//State for book diary form
const [bookName, setBookName] = useState("");
const [author, setAuthor] = useState("");
const [genre, setGenre] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [thoughts, setThoughts] = useState("");
const [feedback, setFeedback] = useState("");

// Function to handle saving book diary entry
const handleSave = async () => {
  const bookDiaryData = {
    userId: user?.id, // Assuming `user` is the authenticated user object
    bookName,
    author,
    genre,
    startDate,
    endDate,
    rating, // Use the existing `rating` state for star rating
    thoughts,
  };

  try {
    const response = await fetch("/api/book-diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookDiaryData),
    });

    if (response.ok) {
      setFeedback("Saved successfully!");
      setTimeout(() => setFeedback(""), 3000);
      // Optionally reset form fields
      setBookName("");
      setAuthor("");
      setGenre("");
      setStartDate("");
      setEndDate("");
      setThoughts("");
      setRating(0);
    } else {
      const errorMessage = await response.text();
      setFeedback("Error: Could not save diary entry.");
      setTimeout(() => setFeedback(""), 3000);
    }
  } catch (error) {
    console.error("Unexpected error while saving book diary:", error);
  }
};

  //Star click handler
  const [rating, setRating] = useState(0); // Tracks the number of stars selected

  const handleStarClick = (index: number) => {
    setRating(index + 1); // Update the rating based on the clicked star
  };

  // Genres to explore state and handlers
  const [genresToExplore, setGenresToExplore] = useState<string[]>([]);
  const [genresInput, setGenresInput] = useState("");

  const handleAddToGenres = () => {
    if (genresInput.trim()) {
      setGenresToExplore([...genresToExplore, genresInput.trim()]);
      setGenresInput(""); // Clear the input field after adding
    }
  };

  // Wishlist state and handlers
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistInput, setWishlistInput] = useState("");

  const handleAddToWishlist = () => {
    if (wishlistInput.trim()) {
      setWishlist([...wishlist, wishlistInput.trim()]);
      setWishlistInput(""); // Clear the input field after adding
    }
  };

  // Reading goals state and handlers
  const [readingGoals, setReadingGoals] = useState<string[]>([]);
  const [readingGoalsInput, setReadingGoalsInput] = useState("");

  const handleAddToReadingGoals = () => {
    if (readingGoalsInput.trim()) {
      setReadingGoals([...readingGoals, readingGoalsInput.trim()]);
      setReadingGoalsInput(""); // Clear the input field after adding
    }
  };

  // Router and Supabase client setup
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login-signup");
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push("/login-signup");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, router]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
      } else {
        console.log("Successfully signed out");
        router.push("/login-signup");
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className=" rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <Button
              onClick={handleSignOut}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              Sign Out
            </Button>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                User Information
              </h2>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

    <div className="max-w-7xl mt-8 mx-auto space-y-12">
    {/* Book Diary */}
          <section className="bg-[#E1B5EE] p-6 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-4xl font-bold text-center text-[#483285] mb-8">
            Book Diary
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Entry Form */}
            <div className="lg:col-span-2 bg-[#483285] text-white p-6 rounded-xl space-y-5 shadow-inner">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Search page: __"
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
                <Button className="bg-white/90 text-[#483285] hover:bg-white w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> add a book
                </Button>
              </div>
              <Input
                placeholder="Name of Book"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              />
              <Input
                placeholder="Author (auto filled from data)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-white/10 border-white/30 placeholder:text-gray-300"
              />
              <Input
                placeholder="Genre (auto filled from data)"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="bg-white/10 border-white/30 placeholder:text-gray-300"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 dark"
                />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 dark"
                />
              </div>

            {/* Star Rating Section */}
              <div>
                <label className="text-sm font-medium">How much I liked this book</label>
                <div className="flex items-center gap-1 mt-2 text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      fill={index < rating ? "currentColor" : "none"} // Fill the star if its index is less than the rating
                      onClick={() => handleStarClick(index)} // Handle click event
                      className="cursor-pointer" // Add pointer cursor for better UX
                    />
                  ))}
                </div>
              </div>
              
              <Textarea
                placeholder="I think this book..."
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 min-h-[100px]"
              />
              <div className="flex justify-between items-center pt-2">
                <Button variant="secondary" onClick={handleSave}>SAVE</Button>
                {feedback && <p className="text-sm self-center">{feedback}</p>}
                <Button className="bg-[#a855f7] hover:bg-[#9333ea]">PUBLISH</Button>
              </div>
            </div>

            {/* Right Side: Stats & Lists */}
            <div className="space-y-6 text-center text-[#ffffff]">
              <div className="bg-[#462C90] p-4 rounded-xl shadow-md">
                <h3 className="font-bold mb-2">Genres I've read</h3>
                <PieChart data={genresData} />
                <Input
                  placeholder="genres I want to explore"
                  className="bg-white/80 border-[#483285]/30 placeholder:text-slate-500 text-gray-500 mt-4"
                />
              </div>
              
              {/* Wishlist Section */}
              <div className="bg-[#462C90] p-4 rounded-xl shadow-md">
                <h3 className="font-bold mb-2">my wishlist</h3>
                <div className="space-y-2">
                  {/* Display the wishlist items */}
                  {wishlist.map((item, index) => (
                    <p key={index} className="text-white text-sm bg-[#483285] p-2 rounded-md">
                      {item}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="Add to wishlist"
                    value={wishlistInput}
                    onChange={(e) => setWishlistInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddToWishlist();
                      }
                    }}
                    className="bg-white/80 border-[#483285]/30 placeholder:text-slate-500 text-gray-500"
                  />
                  <Button
                    className="bg-[#a855f7] hover:bg-[#9333ea]"
                    onClick={handleAddToWishlist}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              {/* Reading Goals Section */} 
              <div className="bg-[#462C90] p-4 rounded-xl shadow-md">
                <h3 className="font-bold mb-2">reading goals</h3>
                <div className="space-y-2">
                  {/* Display the reading goals items */}
                  {readingGoals.map((goal, index) => (
                    <p key={index} className="text-gray-500 text-sm bg-white/80 p-2 rounded-md">
                      {goal}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="Add a reading goal"
                    value={readingGoalsInput}
                    onChange={(e) => setReadingGoalsInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddToReadingGoals();
                      }
                    }}
                    className="bg-white/80 border-[#483285]/30 placeholder:text-slate-500 text-gray-500"
                  />
                  <Button
                    className="bg-[#a855f7] hover:bg-[#9333ea]"
                    onClick={handleAddToReadingGoals}
                  >
                    Add
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </section>
            
        {/* My Library Section */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <div className="flex justify-center items-start gap-4">
            {/* <img src="bookshelf_pp.png" alt="Bookshelf" className="hidden lg:block w-[15%] h-auto object-contain object-top transform -scale-x-100" /> */}
            <div className="w-full lg:w-[70%]">
              <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">My Library</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-600">currently reading</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    />
                  </div>
                  <hr className="mt-4 border-8 rounded-full" style={{ borderColor: "#BA7FCB" }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-600">lined up next</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    />
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    />
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    />
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    />
                    </div>
                <hr className="mt-4 border-8 rounded-full" style={{ borderColor: "#BA7FCB" }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-600">finished reading</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    /> 
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    /> 
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    /> 
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    />
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    />
                    </div>
                  <hr className="mt-4 border-8 rounded-full" style={{ borderColor: "#BA7FCB" }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-600">reviewed</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    <BookCover 
                      imageUrl="psychology.png" 
                      title="Psychology of Money" 
                    /> 
                    <BookCover 
                    
                    />
                    </div>
                    <hr className="mt-4 border-8 rounded-full" style={{ borderColor: "#BA7FCB" }} />
                </div>
              </div>
            </div>
            {/* <img src="https://i.imgur.com/KxX2QAL.png" alt="Bookshelf" className="hidden lg:block w-[15%] h-auto object-contain object-top" /> */}
          </div>
        </section>
      </div>
    </div>
  );
}
