
function VoirBook({isClose, detailData}) {
    // const [detailBook, setDetailBook] = useState();
    const data = detailData;

    

    // console.log(detailBook);
    // useEffect(()=>{
    //     if(detailData){
    //         setDetailBook(detailData)
    //     }
    // },[])

    console.log(data);

    return (
        <div id="default-modal" className="w-3/6 md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl text-white font-semibold bg-purple-900 px-2 py-1.5 dark:text-white">
                            Détail du tache:
                        </h3>
                        <button type="button" onClick={() => isClose()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <h1>Titre : {data.title}</h1>
                        <p><span>Description : </span> {data.description}</p>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" onClick={() => isClose()}  className="text-white bg-purple-700 hover:bg-purple-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default VoirBook