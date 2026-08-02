const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Allows your server to read JSON payloads

// A simple test route
app.get('/', (req, res) => {
    res.send('Hello from our team API!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
