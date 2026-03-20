import { useState, useEffect, useRef } from "react";

// ── Sample movie data (replace video/poster URLs with real ones) ──────────────
const MOVIES = {
  hollywood: [
    {
      id: "h1", title: "Inception", year: 2010, rating: "8.8", duration: "2h 28m",
      genre: "Sci-Fi / Thriller",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "h2", title: "The Dark Knight", year: 2008, rating: "9.0", duration: "2h 32m",
      genre: "Action / Drama",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests.",
      poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "h3", title: "Interstellar", year: 2014, rating: "8.6", duration: "2h 49m",
      genre: "Sci-Fi / Adventure",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "h4", title: "Avengers: Endgame", year: 2019, rating: "8.4", duration: "3h 1m",
      genre: "Action / Adventure",
      description: "After devastating events, the Avengers assemble once more in order to reverse Thanos's actions and restore balance to the universe.",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "h5", title: "The Matrix", year: 1999, rating: "8.7", duration: "2h 16m",
      genre: "Sci-Fi / Action",
      description: "A computer programmer discovers that reality as he knows it is a simulation, and joins a rebellion to overthrow its masters.",
      poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "h6", title: "Oppenheimer", year: 2023, rating: "8.3", duration: "3h",
      genre: "Biography / Drama",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
      poster: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
  ],
  bollywood: [
    {
      id: "b1", title: "Dangal", year: 2016, rating: "8.3", duration: "2h 41m",
      genre: "Biography / Drama / Sports",
      description: "Former wrestler Mahavir Singh Phogat trains his daughters to become world-class wrestlers, defying all odds.",
      poster: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "b2", title: "3 Idiots", year: 2009, rating: "8.4", duration: "2h 50m",
      genre: "Comedy / Drama",
      description: "Two friends are searching for their long-lost companion. They revisit their college days and recall the hilarious antics of their eccentric friend.",
      poster: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "b3", title: "Pathaan", year: 2023, rating: "5.9", duration: "2h 26m",
      genre: "Action / Thriller",
      description: "An Indian spy takes on the leader of a mercenary organization who is hell-bent on unleashing a bioweapon called Raktbeej.",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "b4", title: "Kabir Singh", year: 2019, rating: "7.1", duration: "2h 53m",
      genre: "Drama / Romance",
      description: "A medical student with a short temper falls into a spiral of self-destruction after his girlfriend is forced to marry someone else.",
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1500099817043-86d46000d58f?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "b5", title: "RRR", year: 2022, rating: "7.9", duration: "3h 7m",
      genre: "Action / Drama",
      description: "A fictional story about two legendary revolutionaries who took a stand against the British colonialists in the 1920s.",
      poster: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "b6", title: "Brahmastra", year: 2022, rating: "5.6", duration: "2h 28m",
      genre: "Fantasy / Action",
      description: "Shiva discovers he has a mysterious connection with fire and the Brahmastra, an ancient weapon of mythological power.",
      poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
  ],
  pakistani: [
    {
      id: "p1", title: "London Nahi Jaunga", year: 2017, rating: "7.2", duration: "2h 25m",
      genre: "Comedy / Romance",
      description: "A heartwarming comedy about a young man who does everything to avoid going to London while inadvertently falling in love.",
      poster: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "p2", title: "Jawani Phir Nahi Aani", year: 2015, rating: "7.0", duration: "2h 20m",
      genre: "Comedy",
      description: "Three married men ditch their wives for a bachelor's trip to Bangkok, which turns out to be anything but relaxing.",
      poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "p3", title: "Bol", year: 2011, rating: "8.1", duration: "2h 24m",
      genre: "Drama",
      description: "A woman awaiting execution narrates her life story, exploring poverty, gender discrimination, and societal pressures in Pakistan.",
      poster: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "p4", title: "Waar", year: 2013, rating: "8.0", duration: "2h 28m",
      genre: "Action / Thriller",
      description: "Pakistani special forces officers go undercover to dismantle a major terrorist cell funded by foreign powers.",
      poster: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "p5", title: "Actor in Law", year: 2016, rating: "6.8", duration: "2h 18m",
      genre: "Comedy / Drama",
      description: "An aspiring actor becomes a celebrity lawyer overnight and navigates courtrooms and cameras with hilarious results.",
      poster: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
    {
      id: "p6", title: "Na Maloom Afraad", year: 2014, rating: "7.5", duration: "2h 10m",
      genre: "Comedy / Crime",
      description: "Three unemployed friends stumble upon a bag of money and must outwit gangsters to keep it and their lives.",
      poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=600&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&h=600&fit=crop",
      videoUrl: "",
    },
  ],
};

const FEATURED = MOVIES.hollywood[2]; // Interstellar as hero

// ── Star Rating component ─────────────────────────────────────────────────────
function Stars({ rating }) {
  const stars = Math.round(parseFloat(rating) / 2);
  return (
    <span style={{ color: "#f5c518", letterSpacing: 1 }}>
      {"★".repeat(stars)}{"☆".repeat(5 - stars)}
    </span>
  );
}

// ── Movie Card ────────────────────────────────────────────────────────────────
function MovieCard({ movie, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(movie)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0,
        width: 180,
        height: 270,
        boxShadow: hovered
          ? "0 20px 60px rgba(229,9,20,0.5)"
          : "0 4px 20px rgba(0,0,0,0.5)",
        transform: hovered ? "scale(1.06) translateY(-8px)" : "scale(1)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        background: "#111",
      }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
        transition: "background 0.3s",
      }} />
      {hovered && (
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: "#e50914",
          borderRadius: 6,
          padding: "3px 10px",
          fontSize: 11,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "'Rajdhani', sans-serif",
          letterSpacing: 1,
        }}>FREE</div>
      )}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "14px 12px 12px",
      }}>
        <div style={{
          color: "#fff", fontFamily: "'Rajdhani', sans-serif",
          fontSize: 13, fontWeight: 700, letterSpacing: 0.5,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{movie.title}</div>
        {hovered && (
          <>
            <div style={{ color: "#aaa", fontSize: 11, marginTop: 2 }}>{movie.year} • {movie.duration}</div>
            <Stars rating={movie.rating} />
          </>
        )}
      </div>
    </div>
  );
}

// ── Category Row ──────────────────────────────────────────────────────────────
function CategoryRow({ label, flag, movies, onSelect }) {
  const rowRef = useRef(null);
  const scroll = (dir) => {
    rowRef.current.scrollBy({ left: dir * 600, behavior: "smooth" });
  };
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 28 }}>{flag}</span>
        <h2 style={{
          color: "#fff", fontFamily: "'Bebas Neue', cursive",
          fontSize: 28, letterSpacing: 3, margin: 0,
        }}>{label}</h2>
        <div style={{
          flex: 1, height: 1,
          background: "linear-gradient(to right, #e50914, transparent)",
          marginLeft: 16,
        }} />
        <div style={{ display: "flex", gap: 8 }}>
          {["‹", "›"].map((ch, i) => (
            <button key={i} onClick={() => scroll(i === 0 ? -1 : 1)} style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", borderRadius: 6,
              width: 32, height: 32, cursor: "pointer",
              fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)",
              transition: "background 0.2s",
            }}>{ch}</button>
          ))}
        </div>
      </div>
      <div
        ref={rowRef}
        style={{
          display: "flex", gap: 16,
          overflowX: "auto", paddingBottom: 12,
          scrollbarWidth: "none",
        }}
      >
        {movies.map(m => <MovieCard key={m.id} movie={m} onClick={onSelect} />)}
      </div>
    </div>
  );
}

// ── Movie Modal ───────────────────────────────────────────────────────────────
function MovieModal({ movie, onClose }) {
  if (!movie) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          borderRadius: 20,
          width: "min(820px, 95vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 30px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(229,9,20,0.3)",
          animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Backdrop */}
        <div style={{ position: "relative", height: 280, overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
          <img src={movie.backdrop} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 0%, #1a1a2e 100%)",
          }} />
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(0,0,0,0.6)", border: "none",
            color: "#fff", width: 36, height: 36, borderRadius: "50%",
            cursor: "pointer", fontSize: 18, display: "flex",
            alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}>✕</button>
          <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 80,
            background: "linear-gradient(to bottom, transparent, #1a1a2e)" }} />
        </div>

        {/* Info */}
        <div style={{ padding: "0 32px 32px", display: "flex", gap: 28 }}>
          <img src={movie.poster} alt={movie.title} style={{
            width: 130, height: 195, objectFit: "cover",
            borderRadius: 12, marginTop: -60, flexShrink: 0,
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            border: "3px solid rgba(229,9,20,0.5)",
          }} />
          <div style={{ flex: 1, paddingTop: 12 }}>
            <h2 style={{
              color: "#fff", fontFamily: "'Bebas Neue', cursive",
              fontSize: 36, letterSpacing: 3, margin: "0 0 6px",
            }}>{movie.title}</h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
              {[movie.year, movie.duration, movie.genre].map((tag, i) => (
                <span key={i} style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#ccc", padding: "3px 12px",
                  borderRadius: 20, fontSize: 12,
                  fontFamily: "'Rajdhani', sans-serif",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Stars rating={movie.rating} />
              <span style={{ color: "#f5c518", fontFamily: "'Rajdhani', sans-serif", fontSize: 14 }}>
                {movie.rating} / 10
              </span>
            </div>
            <p style={{
              color: "#bbb", lineHeight: 1.7, fontSize: 14,
              fontFamily: "'Rajdhani', sans-serif", margin: "0 0 24px",
            }}>{movie.description}</p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {movie.videoUrl ? (
                <a href={movie.videoUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <button style={{
                    background: "#e50914", color: "#fff", border: "none",
                    padding: "12px 28px", borderRadius: 8, cursor: "pointer",
                    fontFamily: "'Bebas Neue', cursive", fontSize: 18, letterSpacing: 2,
                    display: "flex", alignItems: "center", gap: 8,
                  }}>▶ WATCH NOW</button>
                </a>
              ) : (
                <button style={{
                  background: "rgba(229,9,20,0.3)", color: "#ff6b6b", border: "1px solid #e50914",
                  padding: "12px 28px", borderRadius: 8, cursor: "not-allowed",
                  fontFamily: "'Bebas Neue', cursive", fontSize: 18, letterSpacing: 2,
                }}>▶ VIDEO COMING SOON</button>
              )}
              {movie.videoUrl && (
                <a href={movie.videoUrl} download style={{ textDecoration: "none" }}>
                  <button style={{
                    background: "rgba(255,255,255,0.1)", color: "#fff",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "12px 28px", borderRadius: 8, cursor: "pointer",
                    fontFamily: "'Bebas Neue', cursive", fontSize: 18, letterSpacing: 2,
                    display: "flex", alignItems: "center", gap: 8,
                    backdropFilter: "blur(4px)",
                  }}>⬇ DOWNLOAD</button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Auth Modal ────────────────────────────────────────────────────────────────
function AuthModal({ mode, onClose, onAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [error, setError] = useState("");

  const handle = () => {
    if (!form.email || !form.password) { setError("Please fill all fields."); return; }
    if (!form.email.includes("@")) { setError("Enter a valid email."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    onAuth({ name: form.name || form.email.split("@")[0], email: form.email });
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(0,0,0,0.9)",
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(12px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(135deg, #0d0d0d 0%, #1a0000 100%)",
        borderRadius: 20, width: 420, padding: 40,
        boxShadow: "0 30px 100px rgba(229,9,20,0.4), 0 0 0 1px rgba(229,9,20,0.3)",
        animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 36, letterSpacing: 4,
            background: "linear-gradient(135deg, #e50914, #ff6b35)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>CINE<span style={{ WebkitTextFillColor: "#fff" }}>FREE</span></div>
          <div style={{ color: "#555", fontSize: 12, letterSpacing: 2, fontFamily: "'Rajdhani', sans-serif" }}>
            {isLogin ? "WELCOME BACK" : "JOIN FOR FREE"}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {["Sign In", "Sign Up"].map((t, i) => (
            <button key={i} onClick={() => { setIsLogin(i === 0); setError(""); }} style={{
              flex: 1, padding: "10px", border: "none", borderRadius: 8, cursor: "pointer",
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 1,
              background: (i === 0) === isLogin ? "#e50914" : "transparent",
              color: (i === 0) === isLogin ? "#fff" : "#888",
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>

        {/* Fields */}
        {[
          ...(!isLogin ? [{ label: "Full Name", key: "name", type: "text", placeholder: "Your name" }] : []),
          { label: "Email Address", key: "email", type: "email", placeholder: "you@example.com" },
          { label: "Password", key: "password", type: "password", placeholder: "••••••••" },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 16 }}>
            <label style={{ color: "#888", fontSize: 12, fontFamily: "'Rajdhani', sans-serif", letterSpacing: 1, display: "block", marginBottom: 6 }}>
              {f.label}
            </label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && handle()}
              style={{
                width: "100%", padding: "12px 16px", boxSizing: "border-box",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, color: "#fff", fontSize: 14,
                fontFamily: "'Rajdhani', sans-serif",
                outline: "none",
              }}
            />
          </div>
        ))}

        {error && <div style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 14, fontFamily: "'Rajdhani', sans-serif" }}>{error}</div>}

        <button onClick={handle} style={{
          width: "100%", padding: "14px",
          background: "linear-gradient(135deg, #e50914, #c00)",
          border: "none", borderRadius: 10, color: "#fff",
          fontFamily: "'Bebas Neue', cursive", fontSize: 20,
          letterSpacing: 3, cursor: "pointer",
          boxShadow: "0 8px 30px rgba(229,9,20,0.4)",
          transition: "transform 0.1s",
        }}>{isLogin ? "SIGN IN" : "CREATE ACCOUNT"}</button>

        <p style={{ textAlign: "center", color: "#555", fontSize: 12, marginTop: 20, fontFamily: "'Rajdhani', sans-serif" }}>
          By continuing, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}

// ── Hero Banner ───────────────────────────────────────────────────────────────
function Hero({ onWatch, user }) {
  return (
    <div style={{
      position: "relative", height: "90vh", minHeight: 500,
      overflow: "hidden", marginBottom: 48,
    }}>
      <img src={FEATURED.backdrop} alt="" style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%", objectFit: "cover",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
        background: "linear-gradient(to bottom, transparent, #0a0a0a)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center",
        padding: "0 60px", paddingTop: 80,
      }}>
        <div style={{ maxWidth: 580 }}>
          <div style={{
            background: "#e50914", color: "#fff",
            display: "inline-block", padding: "4px 14px",
            borderRadius: 4, fontFamily: "'Rajdhani', sans-serif",
            fontSize: 12, fontWeight: 700, letterSpacing: 2,
            marginBottom: 16,
          }}>🏆 FEATURED FILM</div>
          <h1 style={{
            color: "#fff", fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(52px, 8vw, 90px)",
            letterSpacing: 4, margin: "0 0 16px",
            lineHeight: 0.95,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}>{FEATURED.title}</h1>
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            {[FEATURED.year, FEATURED.duration, FEATURED.genre].map((t, i) => (
              <span key={i} style={{
                color: "#ccc", fontFamily: "'Rajdhani', sans-serif",
                fontSize: 14, display: "flex", alignItems: "center", gap: 6,
              }}>
                {i > 0 && <span style={{ color: "#e50914" }}>•</span>}
                {t}
              </span>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <Stars rating={FEATURED.rating} />
            <span style={{ color: "#f5c518", fontFamily: "'Rajdhani', sans-serif", fontSize: 15, marginLeft: 8 }}>
              {FEATURED.rating} / 10
            </span>
          </div>
          <p style={{
            color: "#bbb", fontFamily: "'Rajdhani', sans-serif",
            fontSize: 16, lineHeight: 1.7, marginBottom: 28, maxWidth: 480,
          }}>{FEATURED.description}</p>
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => onWatch(FEATURED)} style={{
              background: "#e50914", color: "#fff", border: "none",
              padding: "14px 36px", borderRadius: 10, cursor: "pointer",
              fontFamily: "'Bebas Neue', cursive", fontSize: 22, letterSpacing: 3,
              boxShadow: "0 8px 30px rgba(229,9,20,0.5)",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 10,
            }}>▶ WATCH FREE</button>
            <button onClick={() => onWatch(FEATURED)} style={{
              background: "rgba(255,255,255,0.12)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "14px 28px", borderRadius: 10, cursor: "pointer",
              fontFamily: "'Bebas Neue', cursive", fontSize: 22, letterSpacing: 3,
              backdropFilter: "blur(6px)",
              transition: "all 0.2s",
            }}>ℹ MORE INFO</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ user, onSignIn, onSignOut, activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const tabs = ["ALL", "HOLLYWOOD", "BOLLYWOOD", "PAKISTANI"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      padding: "0 40px",
      height: 68,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled
        ? "rgba(10,10,10,0.97)"
        : "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(229,9,20,0.2)" : "none",
      transition: "all 0.3s",
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: 28, letterSpacing: 4,
        background: "linear-gradient(135deg, #e50914, #ff6b35)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        cursor: "pointer", flexShrink: 0,
      }}>CINE<span style={{ WebkitTextFillColor: "#fff" }}>FREE</span><span style={{
        fontSize: 12, letterSpacing: 2, WebkitTextFillColor: "#555",
        marginLeft: 4,
      }}>PK</span></div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: activeTab === t ? "#e50914" : "transparent",
            border: activeTab === t ? "none" : "1px solid rgba(255,255,255,0.15)",
            color: activeTab === t ? "#fff" : "#aaa",
            padding: "7px 18px", borderRadius: 20, cursor: "pointer",
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 13, letterSpacing: 1,
            transition: "all 0.2s",
          }}>{t}</button>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {user ? (
          <>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #e50914, #ff6b35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontFamily: "'Bebas Neue', cursive", fontSize: 16,
              border: "2px solid rgba(255,255,255,0.2)",
            }}>{user.name[0].toUpperCase()}</div>
            <span style={{
              color: "#fff", fontFamily: "'Rajdhani', sans-serif",
              fontSize: 14, fontWeight: 700,
            }}>{user.name}</span>
            <button onClick={onSignOut} style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
              color: "#aaa", padding: "6px 16px", borderRadius: 20,
              cursor: "pointer", fontFamily: "'Rajdhani', sans-serif",
              fontSize: 13, transition: "all 0.2s",
            }}>Sign Out</button>
          </>
        ) : (
          <button onClick={onSignIn} style={{
            background: "linear-gradient(135deg, #e50914, #c00)",
            color: "#fff", border: "none",
            padding: "8px 24px", borderRadius: 20, cursor: "pointer",
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 14, letterSpacing: 1,
            boxShadow: "0 4px 20px rgba(229,9,20,0.4)",
            transition: "all 0.2s",
          }}>SIGN IN</button>
        )}
      </div>
    </nav>
  );
}

// ── Search Bar ────────────────────────────────────────────────────────────────
function SearchBar({ query, setQuery }) {
  return (
    <div style={{
      maxWidth: 500, margin: "0 auto 40px",
      position: "relative",
    }}>
      <span style={{
        position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
        color: "#666", fontSize: 18,
      }}>🔍</span>
      <input
        placeholder="Search movies…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          width: "100%", boxSizing: "border-box",
          padding: "14px 20px 14px 48px",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 30, color: "#fff", fontSize: 15,
          fontFamily: "'Rajdhani', sans-serif",
          outline: "none",
          boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)",
        }}
      />
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null); // "login" | "signup"
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const allMovies = [...MOVIES.hollywood, ...MOVIES.bollywood, ...MOVIES.pakistani];

  const filtered = (list) =>
    list.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleMovieClick = (movie) => {
    if (!user) { setAuthMode("login"); return; }
    setSelectedMovie(movie);
  };

  const stats = [
    { label: "Movies", value: allMovies.length + "+" },
    { label: "Categories", value: "3" },
    { label: "HD Quality", value: "100%" },
    { label: "Cost", value: "FREE" },
  ];

  return (
    <>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0a0a; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #e50914; border-radius: 3px; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px) } to { opacity: 1; transform: translateY(0) } }
        input::placeholder { color: #555 !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
        <Navbar
          user={user}
          onSignIn={() => setAuthMode("login")}
          onSignOut={() => setUser(null)}
          activeTab={activeTab}
          setActiveTab={(t) => { setActiveTab(t); setSearchQuery(""); }}
        />

        {/* Hero */}
        {(activeTab === "ALL") && <Hero onWatch={handleMovieClick} user={user} />}

        {/* Stats bar */}
        {activeTab === "ALL" && (
          <div style={{
            display: "flex", justifyContent: "center", gap: "clamp(20px,5vw,80px)",
            padding: "20px 40px 48px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 36, letterSpacing: 2,
                  background: "linear-gradient(135deg, #e50914, #ff6b35)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{s.value}</div>
                <div style={{ color: "#666", fontSize: 12, fontFamily: "'Rajdhani', sans-serif", letterSpacing: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Category header for filtered tabs */}
        {activeTab !== "ALL" && (
          <div style={{ paddingTop: 100, paddingLeft: 60 }}>
            <h1 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 48, letterSpacing: 4, color: "#fff",
            }}>
              {activeTab === "HOLLYWOOD" ? "🇺🇸" : activeTab === "BOLLYWOOD" ? "🇮🇳" : "🇵🇰"} {activeTab} MOVIES
            </h1>
            <div style={{ width: 120, height: 3, background: "#e50914", borderRadius: 2, marginTop: 8 }} />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "40px 40px 80px" }}>
          {/* Search */}
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />

          {/* Movie rows */}
          {activeTab === "ALL" && (
            <>
              {filtered(MOVIES.hollywood).length > 0 && (
                <CategoryRow label="Hollywood Movies" flag="🇺🇸" movies={filtered(MOVIES.hollywood)} onSelect={handleMovieClick} />
              )}
              {filtered(MOVIES.bollywood).length > 0 && (
                <CategoryRow label="Bollywood Movies" flag="🇮🇳" movies={filtered(MOVIES.bollywood)} onSelect={handleMovieClick} />
              )}
              {filtered(MOVIES.pakistani).length > 0 && (
                <CategoryRow label="Pakistani Movies" flag="🇵🇰" movies={filtered(MOVIES.pakistani)} onSelect={handleMovieClick} />
              )}
              {filtered(allMovies).length === 0 && (
                <div style={{ textAlign: "center", color: "#555", padding: "80px 0", fontFamily: "'Bebas Neue', cursive", fontSize: 28, letterSpacing: 3 }}>
                  NO MOVIES FOUND
                </div>
              )}
            </>
          )}

          {activeTab === "HOLLYWOOD" && (
            <CategoryRow label="Hollywood Movies" flag="🇺🇸" movies={filtered(MOVIES.hollywood)} onSelect={handleMovieClick} />
          )}
          {activeTab === "BOLLYWOOD" && (
            <CategoryRow label="Bollywood Movies" flag="🇮🇳" movies={filtered(MOVIES.bollywood)} onSelect={handleMovieClick} />
          )}
          {activeTab === "PAKISTANI" && (
            <CategoryRow label="Pakistani Movies" flag="🇵🇰" movies={filtered(MOVIES.pakistani)} onSelect={handleMovieClick} />
          )}
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "40px 60px",
          background: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: 24, letterSpacing: 4,
              background: "linear-gradient(135deg, #e50914, #ff6b35)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>CINEFREE<span style={{ WebkitTextFillColor: "#fff" }}>PK</span></div>
            <div style={{ color: "#555", fontSize: 12, fontFamily: "'Rajdhani', sans-serif", marginTop: 4 }}>
              Free Movies for Everyone • Hollywood • Bollywood • Pakistani
            </div>
          </div>
          <div style={{ color: "#444", fontSize: 12, fontFamily: "'Rajdhani', sans-serif" }}>
            © 2025 CineFreePK. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Modals */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onAuth={(u) => { setUser(u); setAuthMode(null); }}
        />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}
