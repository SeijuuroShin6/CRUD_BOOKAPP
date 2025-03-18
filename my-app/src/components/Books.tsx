import { useState } from "react";
import { book } from "../types/book.type";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import "../css/book.css";
import { UpdateStatus } from "../../convex/queries";


export const Books = ({ books }: { books: book[]}) => {
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState("");

    const deleteBooks = useMutation(api.queries.deleteBooks);
    const updateStatus = useMutation(api.queries.UpdateStatus);

    const handleClick = (id: string) => {
        setId(id);
        setUpdate(!update);
    }

    const handleDelete = (id: string) => {
        deleteBooks({ id: id as Id<"books"> })
        .then((mess) => console.log(mess))
        .catch((err) => console.log(err));
    }
};


const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const isCompleted: boolean = (formdata.get("completed") as string) === "true";
    updateStatus({ id: id as Id<"books">, isCompleted })
    .then((mess) => console.log(mess))
    .catch((err) => console.log(err));
    setUpdate(false);
};


return (
    <div> 
        {books.map((data: book, index: number)) => {
          return (
            <div key={data._id} className={`book-container ${DataTransfer.isCompleted ? "completed" : "not-comleted"}`}></div>
             <h3>Book no : {index +1}</h3>
             <p>Book title : {data.title}</p>
             <p>Book Author: {data.author}</p>        

             <p>Completed Status : {" "} {data.isCompleted ? "Completed" : "Not Completed"}</p>
             <button onClick={() => handleClick(data._id)}>Update</button>
             {id === data._id && update && {
                
                <form onSubmit={(e) => handleUpdate(e, data._id)}>
                
                
                
                
                </form>
             }}

        )
        }
    
    
    
    }


        
    </div>
);