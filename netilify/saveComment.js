const fs = require("fs");
const path = require("path");

const COMMENTS_FILE = path.join(__dirname, "comments.json");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Método no permitido" };
    }

    const data = JSON.parse(event.body);
    const newComment = { name: data.name, comment: data.comment, date: new Date().toISOString() };

    let comments = [];
    if (fs.existsSync(COMMENTS_FILE)) {
        comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf-8"));
    }

    comments.push(newComment);
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Comentario guardado", comment: newComment }),
    };
};

