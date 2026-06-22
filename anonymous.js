const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        // 1. Fetch all messages from your MongoDB collection
        const allMessages = await msg.find(); 
        
        // 2. Pass them to the index.ejs file under the name 'messages'
        res.render('index', { messages: allMessages });
    } catch (err) {
        res.status(500).send("Error loading messages");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//connecting to mongoose
mongoose.connect('mongodb+srv://mayankkumar14206_db_user:5678@cluster0.gae2o4g.mongodb.net/anynomus?appName=Cluster0&tlsAllowInvalidCertificates=true', { }).then(() =>{
    console.log('Connected to MongoDB');
});

//creating schema for msg
const msgSchema = new mongoose.Schema({
    message: { type: String, required: true }
})

const msg = mongoose.model('msg', msgSchema);

app.post('/submit', async (req, res) => {
    const {message} = req.body;
    const newMessage = new msg({ message });
    await newMessage.save();
    res.redirect('/');
})
