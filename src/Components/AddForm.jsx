import { useState, useEffect } from "react";

function AddForm({ updateData, editData, bookToEdit, setNewBook, message }) {
    // Modification de l'état initial pour gérer les valeurs par défaut
    const initialFormState = {
        title: "",
        description: "",
        _id: null  // Ajout d'un identifiant optionnel
    };

    const [dataBook, setDataBook] = useState(initialFormState);

    // Effet pour gérer le pré-remplissage du formulaire
    useEffect(() => {
        if (bookToEdit) {
            setDataBook({
                _id: bookToEdit._id || null,
                title: bookToEdit.title || "",
                description: bookToEdit.description || ""
            });
        } else {
            // Réinitialiser au state initial si aucun livre à éditer
            setDataBook(initialFormState);
        }
    }, [bookToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataBook((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!dataBook.title.trim() || !dataBook.description.trim()) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        const newBook = {
            title: dataBook.title.trim(),
            description: dataBook.description.trim(),
        };
        
        // Si on édite un livre existant
        if (dataBook._id) {
            editData(dataBook._id, newBook);
            setNewBook(null); // Réinitialiser l'état d'édition
        } else {
            // Sinon, ajouter un nouveau livre
            updateData(newBook);
        }

        // Réinitialiser le formulaire
        setDataBook(initialFormState);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-full mx-auto shadow-2xl px-4">
            <div className="flex justify-center gap-4">
                <div className="mb-5 w-2/5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tâche</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        // Utiliser une chaîne vide par défaut
                        value={dataBook.title || ""}
                        onChange={handleChange}
                        className="block w-full p-1.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                        placeholder="Nom de la tâche"
                        required
                    />
                </div>
                <div className="mb-5 w-2/5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input 
                        type="text" 
                        id="description" 
                        name="description"
                        // Utiliser une chaîne vide par défaut
                        value={dataBook.description || ""}
                        onChange={handleChange}
                        className="block w-full bg-gray-50 border p-1.5 border-gray-300 text-gray-900 text-sm rounded-lg" 
                        placeholder="Description de la tâche" 
                        required
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button 
                    type="submit" 
                    className="w-4/5 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                >
                    {dataBook._id ? "Modifier" : "Ajouter"}
                </button>
            </div>
        </form>
    );
}

export default AddForm;