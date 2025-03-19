import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Books } from "./Books";
import { useState } from "react";   
import "../css/home.css";



const Home = () => {
    const [title, setTitle]= useState("");
    const [author, setAuthor]= useState("");
    const books = useQuery(api.queries.getBooks);
    const createBooks = useMutation(api.queries.createBooks);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        createBooks({ title, author })
        .then(() => {
            console.log("created");
            setTitle("");
            setAuthor("");
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className="main-container">
            <h1>Librarie</h1>
           <form onSubmit={handleSubmit}>
           
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nom du livre"/>
             <br/>
             <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nom de l'auteur"/>
             <br/>
             <input type="submit"/>
           </form>
           {books ? <Books books={books} /> : "Chargement"}
        </div>
    );
};

export default Home;