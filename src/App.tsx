import { useMemo, useState } from 'react';
import { CalendarDays, ChevronRight, Clock3, Film, MapPin, Menu, Play, Search, Star, Ticket, UserRound, X } from 'lucide-react';

const posters = [
  'https://images.pexels.com/photos/8717365/pexels-photo-8717365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/25746374/pexels-photo-25746374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1710786/pexels-photo-1710786.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/20188667/pexels-photo-20188667.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8271451/pexels-photo-8271451.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const movies = [
  { id: 1, title: 'Neon Horizon', genre: 'Sci-Fi · Thriller', rating: '8.7', year: '2024', duration: '2h 18m', image: posters[0], description: 'In a city that never sleeps, one last signal could change the future of humanity.' },
  { id: 2, title: 'After the Silence', genre: 'Drama · Mystery', rating: '8.2', year: '2024', duration: '1h 56m', image: posters[1], description: 'A quiet town unravels when a missing voice returns with a secret.' },
  { id: 3, title: 'Velvet Nights', genre: 'Romance · Drama', rating: '7.9', year: '2024', duration: '2h 04m', image: posters[2], description: 'Two strangers find an unexpected story in the glow of the midnight city.' },
  { id: 4, title: 'The Last Frame', genre: 'Action · Adventure', rating: '8.5', year: '2024', duration: '2h 11m', image: posters[3], description: 'The chase is on. Every frame holds a clue, and time is running out.' },
  { id: 5, title: 'Parallel Hearts', genre: 'Romance · Sci-Fi', rating: '8.0', year: '2024', duration: '1h 48m', image: posters[4], description: 'Love crosses dimensions in a beautifully impossible journey.' },
];

const times = ['10:30 AM', '1:15 PM', '4:00 PM', '7:30 PM', '10:15 PM'];

function App() {
  const [active, setActive] = useState<'home' | 'coming'>('home');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<(typeof movies)[number] | null>(null);
  const [booking, setBooking] = useState<(typeof movies)[number] | null>(null);
  const [selectedTime, setSelectedTime] = useState(times[2]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [notice, setNotice] = useState('');

  const filtered = useMemo(() => movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()) || movie.genre.toLowerCase().includes(query.toLowerCase())), [query]);

  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2800); };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="nav-wrap">
          <button className="brand" onClick={() => { setActive('home'); setSelected(null); }}><span className="brand-mark"><Film size={19} /></span><span>I<span>Movies</span></span></button>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <button className={active === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => { setActive('home'); setMenuOpen(false); }}>Now Showing</button>
            <button className={active === 'coming' ? 'nav-link active' : 'nav-link'} onClick={() => { setActive('coming'); setMenuOpen(false); }}>Coming Soon</button>
          </nav>
          <div className="nav-actions"><button className="icon-button" aria-label="Search"><Search size={18} /></button><button className="signin" onClick={() => { setSignedIn(!signedIn); notify(signedIn ? 'Signed out' : 'Welcome back'); }}>{signedIn ? 'My Account' : 'Sign In'}</button></div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><Menu size={21} /></button>
        </div>
      </header>

      {!selected && <>
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> Your seat is waiting</p><h1>Stories worth<br /><em>staying for.</em></h1><p className="hero-text">Discover your next favorite film, choose the perfect seat, and make tonight a movie night.</p><button className="primary-button" onClick={() => document.getElementById('movies')?.scrollIntoView({ behavior: 'smooth' })}>Explore movies <ChevronRight size={17} /></button></div>
          <div className="hero-art"><div className="hero-ring ring-one" /><div className="hero-ring ring-two" /><div className="hero-poster"><img src={posters[0]} alt="Cinema scene" /><div className="hero-poster-shade" /><div className="hero-caption"><span>FEATURED TONIGHT</span><strong>Neon Horizon</strong></div></div><div className="floating-rating"><Star size={15} fill="currentColor" /><b>8.7</b><small>Audience score</small></div></div>
        </section>
        <main className="content" id="movies">
          <div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>{active === 'home' ? 'Now Showing' : 'Coming Soon'}</h2><p className="muted">Pick a movie, choose a showtime, and reserve your seat.</p></div><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search movies..." /></div></div>
          <div className="movie-grid">{filtered.map((movie, index) => <MovieCard key={movie.id} movie={movie} index={index} onSelect={() => setSelected(movie)} onBook={() => setBooking(movie)} />)}</div>
          {!filtered.length && <div className="empty">No movies match your search.</div>}
        </main>
        <section className="experience"><div><p className="eyebrow">THE IMOVIES EXPERIENCE</p><h2>More than a movie.<br /><em>It is a moment.</em></h2></div><div className="experience-list"><div><span>01</span><strong>Choose your story</strong><p>Handpicked films, from first look to final scene.</p></div><div><span>02</span><strong>Find your seat</strong><p>Real-time availability, no surprises at checkout.</p></div><div><span>03</span><strong>Make it yours</strong><p>Book in a few taps and enjoy the show.</p></div></div></section>
      </>}

      {selected && <MovieDetails movie={selected} onBack={() => setSelected(null)} onBook={() => setBooking(selected)} />}
      <footer><div className="footer-brand"><span className="brand-mark"><Film size={17} /></span><b>I<span>Movies</span></b></div><p>Cinema tickets, real-time seat selection, and booking management.<br />Built for the love of the movies.</p></footer>

      {booking && <BookingModal movie={booking} selectedTime={selectedTime} setSelectedTime={setSelectedTime} onClose={() => setBooking(null)} onBooked={() => { setBooking(null); notify('Your seats are reserved. Enjoy the movie.'); }} />}
      {notice && <div className="toast"><Ticket size={16} />{notice}</div>}
    </div>
  );
}

function MovieCard({ movie, index, onSelect, onBook }: { movie: (typeof movies)[number]; index: number; onSelect: () => void; onBook: () => void }) {
  return <article className="movie-card" style={{ animationDelay: `${index * 80}ms` }}><button className="poster-button" onClick={onSelect}><div className="poster"><img src={movie.image} alt={movie.title} /><div className="poster-overlay"><span>View details</span><Play size={15} fill="currentColor" /></div><span className="status">Now Showing</span></div></button><div className="card-info"><div className="card-title-row"><button onClick={onSelect} className="movie-title">{movie.title}</button><span className="score"><Star size={12} fill="currentColor" />{movie.rating}</span></div><p>{movie.genre}</p><div className="card-bottom"><span><Clock3 size={13} />{movie.duration}</span><button className="book-link" onClick={onBook}>Book <ChevronRight size={14} /></button></div></div></article>;
}

function MovieDetails({ movie, onBack, onBook }: { movie: (typeof movies)[number]; onBack: () => void; onBook: () => void }) {
  return <main className="details"><button className="back-link" onClick={onBack}>← Back to movies</button><div className="details-layout"><div className="details-image"><img src={movie.image} alt={movie.title} /></div><div className="details-copy"><p className="eyebrow"><span className="eyebrow-dot" /> Now Showing</p><h1>{movie.title}</h1><p className="detail-meta"><span>{movie.year}</span><span>{movie.duration}</span><span>{movie.genre}</span></p><div className="large-score"><Star size={18} fill="currentColor" /> {movie.rating} <small>audience score</small></div><p className="detail-description">{movie.description}</p><div className="showtimes"><p className="label">Choose a showtime</p><div className="time-grid">{times.map((time) => <button key={time} onClick={onBook}>{time}</button>)}</div></div><button className="primary-button" onClick={onBook}>Reserve your seat <Ticket size={17} /></button></div></div></main>;
}

function BookingModal({ movie, selectedTime, setSelectedTime, onClose, onBooked }: { movie: (typeof movies)[number]; selectedTime: string; setSelectedTime: (time: string) => void; onClose: () => void; onBooked: () => void }) {
  const [seats, setSeats] = useState<number[]>([]);
  const taken = [2, 7, 12, 16, 22];
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="booking-modal"><button className="close-button" onClick={onClose}><X size={18} /></button><div className="modal-head"><p className="eyebrow">RESERVE YOUR SEAT</p><h2>{movie.title}</h2><p><CalendarDays size={14} /> Today · {selectedTime} <MapPin size={14} /> IMovies Downtown</p></div><div className="time-picker">{times.slice(1, 5).map((time) => <button className={selectedTime === time ? 'chosen' : ''} key={time} onClick={() => setSelectedTime(time)}>{time}</button>)}</div><div className="screen">SCREEN</div><div className="seat-grid">{Array.from({ length: 24 }, (_, i) => { const seat = i + 1; const isTaken = taken.includes(seat); const isChosen = seats.includes(seat); return <button disabled={isTaken} className={isTaken ? 'seat taken' : isChosen ? 'seat chosen' : 'seat'} key={seat} onClick={() => setSeats(isChosen ? seats.filter((value) => value !== seat) : [...seats, seat])}>{seat}</button>; })}</div><div className="seat-key"><span><i className="available" />Available</span><span><i className="selected-seat" />Selected</span><span><i className="taken-seat" />Taken</span></div><div className="booking-footer"><div><small>{seats.length} ticket{seats.length !== 1 ? 's' : ''}</small><strong>${(seats.length * 14).toFixed(2)}</strong></div><button disabled={!seats.length} className="primary-button" onClick={onBooked}>Confirm booking <ChevronRight size={16} /></button></div></div></div>;
}

export default App;
