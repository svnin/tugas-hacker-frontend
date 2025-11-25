import { useState, useEffect } from 'react'
import axios from 'axios'

// --- UTILS ---
const formatPrice = (value) => {
  if (!value) return '$0.00';
  if (typeof value === 'number') {
     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
  return value;
}

const parsePrice = (priceString) => {
  if (!priceString) return 0;
  if (typeof priceString === 'number') return priceString;
  return parseInt(priceString.replace(/[^0-9]/g, ''));
}

const formatRupiah = (value) => {
    if (!value) return 'Rp 0';
    if (typeof value === 'string') return value;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
}

// --- 1. NAVBAR COMPONENT (Updated: Terima Keyword dari App) ---
const Navbar = ({ keyword, setKeyword, onSearch }) => {
  const cartCount = 0 
  const wishCount = 0

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(keyword)
  }

  const handleChange = (e) => {
    setKeyword(e.target.value)
    if (e.target.value === '') {
        onSearch('') 
    }
  }

  return (
    <div className="w-full font-sans sticky top-0 z-50 bg-white shadow-sm">
      {/* HEADER HIJAU */}
      <div className="bg-[#23856D] text-white text-sm py-3">
        <div className="max-w-[1128px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6 text-xs md:text-sm font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              (225) 555-0118
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              michelle.rivera@example.com
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs md:text-sm font-bold">
            <span>Follow Us and get a chance to win 80% off</span>
            <div className="flex gap-3 items-center border-l border-white/30 pl-4">
              <span className="text-xs">Follow Us :</span>
              <div className="flex gap-3">
                 <a href="#" className="hover:text-gray-200"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                 <a href="#" className="hover:text-gray-200"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
                 <a href="#" className="hover:text-gray-200"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
                 <a href="#" className="hover:text-gray-200"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR PUTIH */}
      <div className="py-5 px-4 md:px-8 border-b">
        <div className="max-w-[1128px] mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="text-2xl font-bold text-gray-900 tracking-tighter mr-8">
            Bookstar
          </div>

          <div className="hidden lg:flex gap-6 text-sm font-bold text-[#737373]">
            <a href="#" className="hover:text-[#23856D]">Home</a>
            <a href="#" className="text-[#252B42] font-bold flex items-center gap-1">
               Shop <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
            </a>
            <a href="#" className="hover:text-[#23856D]">About</a>
            <a href="#" className="hover:text-[#23856D]">Blog</a>
            <a href="#" className="hover:text-[#23856D]">Contact</a>
            <a href="#" className="hover:text-[#23856D]">Pages</a>
          </div>

          <div className="flex items-center gap-4 text-[#23A6F0] font-bold text-sm ml-auto lg:ml-0 w-full lg:w-auto">
            <div className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-80 whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span>Login / Register</span>
            </div>
            
            <form onSubmit={handleSearch} className="flex items-center relative w-full md:w-auto">
               <input 
                 type="text" 
                 placeholder="Search book..." 
                 className="pl-3 pr-8 py-1 border rounded-full text-gray-600 text-xs focus:outline-none focus:border-[#23A6F0] w-full"
                 value={keyword}
                 onChange={handleChange}
               />
               <button type="submit" className="absolute right-2 text-gray-400 hover:text-[#23856D]">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
               </button>
            </form>

            <div className="flex items-center gap-4 ml-2">
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#23856D]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  {cartCount > 0 && <span className="text-xs">{cartCount}</span>}
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#23856D]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  {wishCount > 0 && <span className="text-xs">{wishCount}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 2. HERO SECTION ---
const HeroSection = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Reset slider jika data berubah (misal user klik buku baru)
  useEffect(() => {
    if(books.length > 0) setCurrentIndex(0)
  }, [books])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length)
  }
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length)
  }

  if (!books || books.length === 0) {
    return (
      <section className="bg-gray-50 py-16 px-6 relative animate-pulse">
        <div className="max-w-[1128px] mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-5/12 flex justify-center"><div className="w-64 h-80 bg-gray-300 rounded"></div></div>
          <div className="w-full md:w-7/12 space-y-4">
             <div className="w-20 h-6 bg-gray-300 rounded"></div>
             <div className="w-full h-12 bg-gray-300 rounded"></div>
             <div className="w-full h-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      </section>
    )
  }

  const book = books[currentIndex]

  return (
    <section className="bg-white py-8 px-6 relative overflow-hidden group">
      <div className="max-w-[1128px] mx-auto flex flex-col md:flex-row items-start gap-8">
        
        <div className="w-full md:w-5/12 flex flex-col items-center">
            <div className="relative w-64 md:w-80"> 
                <div className="flex items-center gap-3 mb-10">
                   <a href="#" className="text-[#252B42] font-bold text-sm hover:underline">Home</a>
                   <svg className="w-2 h-3 text-[#BDBDBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path>
                   </svg>
                   <span className="text-[#737373] font-bold text-sm">Shop</span>
                </div>

                <div className="relative w-full">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gray-100 rounded-full -z-10"></div>
                    
                    <button onClick={prevSlide} className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-20 p-2 text-gray-300 hover:text-gray-900 transition hidden md:block">
                       <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>

                    <img 
                      src={book.cover_image} 
                      alt={book.title} 
                      onError={(e) => {e.target.src='https://via.placeholder.com/300x450?text=Book+Cover'}}
                      className="w-full shadow-2xl rounded-lg transform transition duration-500"
                    />

                    <button onClick={nextSlide} className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-20 p-2 text-gray-300 hover:text-gray-900 transition hidden md:block">
                       <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </div>

        <div className="w-full md:w-7/12 text-left space-y-6 pt-16"> 
          <div className="flex flex-wrap gap-3 text-sm font-bold tracking-wide text-[#737373]">
             <span className="bg-[#F6F6F6] px-4 py-2 rounded-full text-[#737373]">
                {book.category?.name || 'General'}
             </span>
             {book.tags && book.tags.length > 0 && book.tags[0].name !== book.category?.name && (
               <span className="bg-[#F6F6F6] px-4 py-2 rounded-full text-[#737373]">
                  {book.tags[0].name}
               </span>
             )}
          </div>
          
          <h1 className="text-[#252B42] font-sans font-semibold text-[32px] leading-[40px] tracking-[-0.04em] mb-2">
            {book.title}
          </h1>

          <div className="flex flex-col gap-1">
             <p className="text-2xl font-bold text-[#252B42]">
               {formatPrice(book.details?.price || book.price)}
             </p>
             <p className="text-sm font-bold text-[#737373]">
                Availability : <span className="text-[#23A6F0]">In Stock</span>
             </p>
          </div>
          
          <p className="text-[#737373] text-sm leading-relaxed max-w-lg line-clamp-3">
            {book.summary || "Deskripsi buku belum tersedia."}
          </p>

          <div className="space-y-1 text-sm text-[#737373] pt-2 border-t border-gray-200 mt-4 pt-4"> 
             {book.details?.total_pages && <p><span className="text-sm font-bold text-[#737373]">Pages:</span> {book.details.total_pages}</p>}
             {book.publisher && <p><span className="text-sm font-bold text-[#737373]">Publisher:</span> {book.publisher}</p>}
             {book.details?.isbn && <p><span className="text-sm font-bold text-[#737373]">ISBN:</span> {book.details.isbn}</p>}
             {book.details?.published_date && <p><span className="text-sm font-bold text-[#737373]">Published:</span> {book.details.published_date}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button className="px-8 py-3 bg-[#007AFF] hover:bg-blue-600 text-white font-bold rounded-[5px] shadow-lg transition flex items-center gap-2 uppercase text-sm tracking-wider">
              BUY NOW
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#DBECFF] text-[#252B42] hover:bg-blue-200 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#DBECFF] text-[#252B42] hover:bg-blue-200 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#DBECFF] text-[#252B42] hover:bg-blue-200 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- 3. HORIZONTAL CARD (READING LIST) ---
const ReadingListCard = ({ item, onClick }) => {
  const priceNum = parsePrice(item.details?.price || item.price);
  const fakeOriginalPrice = priceNum * 1.2;
  const displayPrice = priceNum ? formatRupiah(priceNum) : formatPrice(item.details?.price || item.price);
  
  return (
    <div onClick={() => onClick(item)} className="bg-white rounded border border-gray-100 hover:shadow-lg transition group cursor-pointer flex flex-col h-full">
      <div className="bg-gray-100 h-60 flex items-center justify-center p-4 relative overflow-hidden">
        <img 
          src={item.cover_image} 
          alt={item.title}
          onError={(e) => {e.target.src='https://via.placeholder.com/300x300?text=Book+Cover'}}
          className="h-full object-contain shadow-md transition transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">New</div>
      </div>
      <div className="p-4 text-left flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <p className="text-[#23A6F0] text-xs font-bold uppercase truncate w-3/4">{item.category?.name || 'General'}</p>
            <div className="bg-[#23856D] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <span>★</span> 4.8
            </div>
        </div>
        <h3 className="font-bold text-[#252B42] text-base mb-1 line-clamp-2 leading-tight flex-grow">{item.title}</h3>
        <p className="text-xs text-[#737373] mb-3">{item.author?.name || 'Unknown'}</p>
        <div className="flex items-center gap-2 mt-auto">
          {priceNum > 0 && <span className="text-[#BDBDBD] font-bold line-through text-xs">{formatRupiah(fakeOriginalPrice)}</span>}
          <span className="text-[#23856D] font-bold text-sm">{displayPrice}</span>
        </div>
      </div>
    </div>
  )
}

// --- 4. MAIN GRID CARD (BOOKS FOR YOU) ---
const ProductCard = ({ item, onClick }) => {
  const priceNum = parsePrice(item.details?.price || item.price);
  const fakeOriginalPrice = priceNum * 1.2;
  const displayPrice = priceNum ? formatRupiah(priceNum) : formatPrice(item.details?.price || item.price);

  return (
    <div onClick={() => onClick(item)} className="bg-white group cursor-pointer flex flex-col items-center">
      <div className="relative mb-4 overflow-hidden h-80 w-full flex items-center justify-center bg-gray-50 rounded">
        <img 
          src={item.cover_image} 
          alt={item.title}
          onError={(e) => {e.target.src='https://via.placeholder.com/300x300?text=Book+Cover'}} 
          className="h-64 object-contain shadow-md transition transform group-hover:scale-105"
        />
      </div>
      <div className="text-center px-2 w-full">
        <p className="text-xs text-gray-400 font-bold uppercase mb-2">{item.category?.name || 'Book'}</p>
        <h3 className="text-base font-bold text-[#252B42] line-clamp-1 mb-2">{item.title}</h3>
        <p className="text-xs text-[#737373] mb-2">{item.author?.name || 'Penulis'}</p>
        <div className="flex justify-center gap-3">
           {priceNum > 0 && (
              <span className="text-[#BDBDBD] font-bold line-through text-sm">{formatRupiah(fakeOriginalPrice)}</span>
           )}
           <span className="text-[#23856D] font-bold text-base">{displayPrice}</span>
        </div>
      </div>
    </div>
  )
}

// --- MAIN APP ---
function App() {
  const [heroBooks, setHeroBooks] = useState([]) // Data Hero Slider
  const [books, setBooks] = useState([]) 
  const [readingList, setReadingList] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  // STATE BARU: Untuk menyimpan keyword search
  const [keyword, setKeyword] = useState('')

  const BASE_URL = 'https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1'

  const getRandomPage = () => Math.floor(Math.random() * 10) + 1;

  // FUNGSI KLIK BUKU (RESET SEARCH)
  const handleBookClick = (clickedBook) => {
    // 1. Reset Keyword
    setKeyword('')
    // 2. Matikan mode searching
    setIsSearching(false)
    // 3. Update Hero dengan buku yg diklik
    setHeroBooks([clickedBook, ...heroBooks.filter(b => b._id !== clickedBook._id)])
    // 4. Kembalikan list bawah ke default (karena search dimatikan)
    fetchBooks('') 
    // 5. Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const fetchBooks = async (searchKeyword = '') => {
    setLoading(true)
    setErrorMsg(null)
    
    // Update state searching berdasarkan keyword
    setIsSearching(!!searchKeyword) 

    try {
      let url = `${BASE_URL}/book?limit=8&page=${getRandomPage()}`
      if (searchKeyword) {
        url = `${BASE_URL}/book?limit=8&keyword=${searchKeyword}`
      }
      
      const res = await axios.get(url)
      const data = res.data.books || res.data.data || []
      
      if (Array.isArray(data)) setBooks(data)
      else setBooks([])
    } catch (err) {
      console.error(err)
      setErrorMsg("Gagal memuat data.")
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchInitData = async () => {
        try {
            // 1. Hero Books 
            const randomHeroPage = Math.floor(Math.random() * 10) + 1;
            const heroRes = await axios.get(`${BASE_URL}/book?limit=5&page=${randomHeroPage}`)
            const heroData = heroRes.data.books || heroRes.data.data || []
            if(Array.isArray(heroData)) setHeroBooks(heroData)

            // 2. Reading List
            const randomReadingPage = Math.floor(Math.random() * 5) + 1; 
            const readingRes = await axios.get(`${BASE_URL}/book?limit=4&page=${randomReadingPage}`)
            const readingData = readingRes.data.data || []
            if(Array.isArray(readingData)) setReadingList(readingData)

            // 3. Books For You
            fetchBooks()
        } catch (e) { console.error(e) }
    }
    fetchInitData()
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Pass keyword & setKeyword ke Navbar biar sinkron */}
      <Navbar keyword={keyword} setKeyword={setKeyword} onSearch={fetchBooks} />
      
      {/* LOGIKA: Sembunyikan Hero kalau lagi searching */}
      {!isSearching && <HeroSection books={heroBooks} />}

      {/* LOGIKA: Sembunyikan Reading List kalau lagi searching */}
      {!isSearching && (
        <section className="max-w-[1128px] mx-auto py-12 px-6">
           <div className="text-left mb-8">
              <h2 className="text-[#252B42] font-sans font-semibold text-[32px] leading-[40px] tracking-[-0.04em]">
                Your Reading List
              </h2>
           </div>
           
           {readingList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {readingList.map((book) => (
                    <ReadingListCard key={book._id} item={book} onClick={handleBookClick} />
                ))}
              </div>
           ) : (
              <div className="bg-gray-50 p-8 rounded text-center text-gray-400 border border-dashed border-gray-200">
                 Belum ada buku di Reading List.
              </div>
           )}
        </section>
      )}

      {/* BOOKS FOR YOU (atau Search Result) */}
      <section className="max-w-[1128px] mx-auto py-16 px-6 border-t border-gray-100">
         <div className="text-left mb-10">
            <p className="text-[#737373] text-sm font-medium mb-2">
                {isSearching ? 'Search Result' : 'Featured Products'}
            </p>
            <h2 className="text-[#252B42] font-sans font-semibold text-[32px] leading-[40px] tracking-[-0.04em] mb-2">
                {isSearching ? 'HASIL PENCARIAN' : 'Books For You'}
            </h2>
            {!isSearching && <p className="text-[#737373] text-sm">Problems trying to resolve the conflict between</p>}
         </div>

         {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-pulse">
                {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-80 bg-gray-100 rounded"></div>)}
             </div>
         ) : errorMsg ? (
             <div className="text-center text-gray-500 py-10">{errorMsg}</div>
         ) : books.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                {books.map((book) => (
                    <ProductCard key={book._id} item={book} onClick={handleBookClick} />
                ))}
             </div>
         ) : (
            <p className="text-gray-500 text-center col-span-full">Tidak ada buku ditemukan.</p>
         )}
      </section>

      <footer className="bg-gray-50 py-10 mt-10 border-t">
        <div className="max-w-[1128px] mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-[#737373] text-sm font-bold gap-4">
           <p>Bookstar Project 2025 by Nindya</p>
        </div>
      </footer>
    </div>
  )
}

export default App