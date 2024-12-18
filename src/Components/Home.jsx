import { VscSearch } from "react-icons/vsc";
import AddForm from "./AddForm";
import TodoItem from "./TodoItem";
import { useState } from "react";
import VoirBook from "./VoirBook";

function Home({ data, addData, editData, deleteData, getBook, detailBook }) {
    const [newBook, setNewBook] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const books = data;

    // Methode pour fermer le modale
    const closeModel = () => {
        setOpenModal(false)
    }

    // Methode d'ouverture du model
    const OpenModel = () => {
        setOpenModal(true)
    }

    return (
        <div className=" min-w-[50%] p-6 bg-white mb-5 border border-gray-200 rounded-lg shadow">
            <div className="mb-2">
                <AddForm
                    updateData={addData}
                    editData={editData}
                    bookToEdit={newBook} // Passer l'élément à éditer
                    setNewBook={setNewBook} // Permettre de réinitialiser
                />
            </div>
            <div className="w-full">
                <div className="w-2/4 relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search..." required />
                    <button type="submit" className="text-white font-bold text-lg absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 rounded-lg px-4 py-2"><VscSearch /></button>
                </div>
                <div className="py-3">
                    <h1 className="text-2xl text-center border-b-4 pb-2">Liste de tâches</h1>
                    {books && (
                        books.map((book, index) => {
                            return (
                                <TodoItem
                                    key={index}
                                    titre={book.title}
                                    description={book.description}
                                    id={book._id}
                                    updateBook={setNewBook} // Permet de mettre à jour l'élément à éditer
                                    deleteBook={deleteData}
                                    isOpen = {OpenModel}
                                    getBook={getBook}
                                />
                            )
                        })
                    )}
                </div>
                <div className="flex gap-4">
                    <button type="button" onClick={() => alert("Prev")} className="text-white py-1.5 px-3 bg-indigo-600 rounded-lg">Prev</button>
                    <button type="button" onClick={() => alert("Next")} className="text-white py-1.5 px-3 bg-indigo-600 rounded-lg">Next</button>
                </div>
            </div>
            {openModal && <div className="flex items-center justify-center w-full min-h-screen left-0 top-0 bg-black bg-opacity-30 fixed">
                              <VoirBook isClose={closeModel} detailData={detailBook} />
                          </div>
            }

        </div>
    )
}

export default Home