import { VscSearch } from "react-icons/vsc";
import AddForm from "./AddForm";
import TodoItem from "./TodoItem";
import { useState } from "react";
import VoirBook from "./VoirBook";

function Home({ data, addData, editData, deleteData, getBook, detailBook }) {
    const [newBook, setNewBook] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 4; // Nombre de livres par page
    const books = data || [];

    const closeModel = () => {
        setOpenModal(false);
    }

    const OpenModel = () => {
        setOpenModal(true);
    }

    // Filter books based on search term
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Réinitialiser à la première page lors d'une recherche
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="min-w-[50%] p-6 bg-white mb-5 border border-gray-200 rounded-lg shadow">
            <div className="mb-2">
                <AddForm
                    updateData={addData}
                    editData={editData}
                    bookToEdit={newBook}
                    setNewBook={setNewBook}
                />
            </div>
            <div className="w-full">
                <div className="w-2/4 relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="default-search" 
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" 
                        placeholder="Search..." 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        required 
                    />
                    <span className="text-white font-bold text-lg absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 rounded-lg px-4 py-2">
                        <VscSearch />
                    </span>
                </div>
                <div className="py-3">
                    <h1 className="text-2xl text-center border-b-4 pb-2">Liste de tâches</h1>
                    {currentBooks.length > 0 ? (
                        currentBooks.map((book, index) => (
                            <TodoItem
                                key={index}
                                titre={book.title}
                                description={book.description}
                                id={book._id}
                                updateBook={setNewBook}
                                deleteBook={deleteData}
                                isOpen={OpenModel}
                                getBook={getBook}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-4">
                            {searchTerm ? "Aucun livre trouvé" : "Chargement des livres..."}
                        </p>
                    )}
                </div>
                {filteredBooks.length > 0 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-4">
                            <button 
                                type="button" 
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`text-white py-1.5 px-3 rounded-lg ${
                                    currentPage === 1 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                Prev
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`text-white py-1.5 px-3 rounded-lg ${
                                    currentPage === totalPages 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                        <span className="text-gray-600">
                            Page {currentPage} sur {totalPages}
                        </span>
                    </div>
                )}
            </div>
            {openModal && (
                <div className="flex items-center justify-center w-full min-h-screen left-0 top-0 bg-black bg-opacity-30 fixed">
                    <VoirBook isClose={closeModel} detailData={detailBook} />
                </div>
            )}
        </div>
    );
}

export default Home;