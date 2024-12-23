import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { VscEye } from "react-icons/vsc";

function TodoItem({ titre, description, id, updateBook, deleteBook, isOpen, getBook }) {

    const handleVoir = (index) => {
        getBook(index);
        isOpen();
    }

    return (
        <div className="flex justify-between items-center gap-5 border-2 border-purple-800 mt-3 rounded-lg px-2 py-1.5">
            <div className="flex gap-5">
                <div className="text-sm sm:text-lg">{titre}</div>
                <div className="border-l-2 border-purple-800 pl-3 text-sm sm:text-lg">{description}</div>
            </div>
            <div className="flex gap-3">
                {/* <span className="text-2xl text-green-600 font-bold " onClick={() => updateData(id,)}><CiEdit /></span> */}
                <span
                    className="text-base sm:text-2xl text-green-600 font-bold  cursor-pointer transform active:scale-75 transition-transform"
                    onClick={() => updateBook({
                        _id: id,
                        title: titre,
                        description: description
                    })}
                >
                    <CiEdit />
                </span>
                <span className="text-base sm:text-2xl text-purple-600 cursor-pointer transform active:scale-75 transition-transform"  onClick={() =>handleVoir(id)}><VscEye /></span>
                <span className="text-base sm:text-xl text-red-600 cursor-pointer transform active:scale-75 transition-transform"  onClick={() => deleteBook(id)}><MdOutlineDeleteForever /></span>
            </div>
        </div>
    )
}

export default TodoItem