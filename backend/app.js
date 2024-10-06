import pg from "pg";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const port = 3001;
const { Client } = pg;

const client = new Client({
    user: "postgres",
    host: "postgres",
    database: "devops",
    password: "1234",
    port: 5432,
});
client.connect();

const createTable = async () => {
    await client.query(`CREATE TABLE IF NOT EXISTS form
  (id serial PRIMARY KEY, texte VARCHAR (255) NOT NULL);`);
};

createTable();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => res.send("Hello World!"));

app.get("/getform", async (req, res) => {
    try {
        const response = await client.query(`SELECT * FROM form`);

        if (response) {
            res.status(200).send(response.rows);
        }
    } catch (error) {
        res.status(500).send("Error");
        console.log(error);
    }
});

app.post("/sendform", async (req, res) => {
    try {
        const texte = req.body.texte;

        const response = await client.query(
            `INSERT INTO form(texte) VALUES ('${texte}');`
        );
        if (response) {
            res.status(200).send(req.body);
        }
    } catch (error) {
        res.status(500).send("Error");
        console.log(error);
    }
});

app.listen(port, () => console.log(`App running on port ${port}.`));
