import express from 'express';
import { json } from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = express();
const server = createServer(app);
const io = new Server(server);

const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

app.use(json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Google OAuth 2.0 authentication
app.get('/auth/google', (req, res) => {
    const provider = new GoogleAuthProvider();
    auth.signInWithRedirect(provider);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});