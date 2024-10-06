import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [form, setForm] = useState({
        texte: "",
    });
    const [formData, setAllUser] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:3001/getform")
            .then((response) => setAllUser(response.data))
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleInputChange = (event) => {
        setForm({ ...form, texte: event.target.value });
    };

    const createForm = async () => {
        await axios
            .post("http://localhost:3001/sendform", form, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .catch((e) => {
                return alert(e);
            });
        window.location.reload();
    };
    return (
        <div className="App">
            <div className="block">
                <h2>Bienvenue</h2>
                <input
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Entrez quelque chose..."
                />
                <button onClick={() => createForm()}>Afficher le texte</button>
                <p>Vous avez saisi :</p>
                {formData &&
                    formData.map((form) => (
                        <li key={form.id}>
                            <h3>{form.texte}</h3>
                        </li>
                    ))}
            </div>
        </div>
    );
}

export default App;
