import { useEffect, useState } from "react"
import Home from "./Components/Home"
import axios from "axios";

function App() {
  const [books, setBooks] = useState();
  const [detailBook, setDetailBook] = useState({});

  // Methode pour récupèrer tous les books
  const getFormations = () => {
    axios.get('http://localhost:3000/books')
      .then(res => {
        setBooks(res.data);
      })
      .catch(erro => {
        console.log(erro);
      });
  };

  // Methode pour récupèrer un book
  const getFormation = (id) => {
    axios.get(`http://localhost:3000/books/${id}`)
      .then(res => {
        setDetailBook(res.data);
      })
      .catch(erro => {
        console.log(erro);
      });
  };

  // Méthode pour ajouter une formation
  const addFormation = (newBook) => {
    axios
      .post('http://localhost:3000/books', newBook)
      .then((res) => {
        console.log("Formation ajoutée :", res.data);
        // Rafraîchir les formations après ajout
        getFormations();
      })
      .catch((error) => {
        console.error("Erreur d'ajout :", error);
      });
  };

  // Méthode pour mettre à jour les données
  const editFormation = async (id, updatedFormation) => {
    try {
      const response = await axios.put(`http://localhost:3000/books/${id}`, updatedFormation);
      getFormations();
      console.log("mise à jour avec succès :", response.data);
    } catch (error) {
      console.error("Erreur de mise à jour :", error.response ? error.response.data : error.message);
    }
  };

    // Méthode de suppression d'une formation
    const deletFormation = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:3000/books/${id}`);
        console.log('Ressource supprimée avec succès:', response.data);
        getFormations();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    };

  useEffect(() => {
    getFormations();
  }, [])
  // console.log(books)
  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-900">
      <h1 className="text-4xl font-semibold text-white pt-4 pb-2">Todolist</h1>
      <Home data={books} 
            addData={addFormation} 
            editData={editFormation}
            deleteData={deletFormation} 
            getBook={getFormation}  
            detailBook = {detailBook}
      />
    </div>
  )
}

export default App
