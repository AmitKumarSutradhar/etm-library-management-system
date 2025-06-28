import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const PORT = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://amitkumarsutradhar:amitkumarsutradhar@cluster0.dynrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

        server = app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    }
    catch (error) {
        console.log(error);
    }
}

main()