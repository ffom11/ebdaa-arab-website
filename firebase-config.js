// Firebase Configuration - Real Project Settings
const firebaseConfig = {
    apiKey: "AIzaSyAZstjL3mmMmDDR4N-rQRu9EVG-Q6GP2nw",
    authDomain: "ebdaa-shop.firebaseapp.com",
    databaseURL: "https://ebdaa-shop-default-rtdb.firebaseio.com",
    projectId: "ebdaa-shop",
    storageBucket: "ebdaa-shop.firebasestorage.app",
    messagingSenderId: "576023563750",
    appId: "1:576023563750:web:9c9e00737632a68d37da27",
    measurementId: "G-PGZ1MP4JPR"
};

// Initialize Firebase with fallback to local authentication
let auth, db, storage;
let isFirebaseAuthAvailable = false;

try {
    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log("Firebase initialized successfully");
    } else {
        firebase.app();
    }
    
    // Try to initialize Firebase services
    try {
        auth = firebase.auth();
        db = firebase.firestore();
        storage = firebase.storage();
        isFirebaseAuthAvailable = true;
        console.log("Firebase services initialized");
    } catch (authError) {
        console.warn("Firebase Auth not available, using local authentication:", authError.message);
        initializeLocalAuth();
    }
    
} catch (error) {
    console.error("Firebase initialization failed:", error);
    initializeLocalAuth();
}

// Local Authentication System
function initializeLocalAuth() {
    console.log("Initializing local authentication system");
    
    // Local user storage
    const users = JSON.parse(localStorage.getItem('ebdaa_users') || '[]');
    
    // Add default users if empty
    if (users.length === 0) {
        const defaultUsers = [
            {
                uid: 'admin-123',
                email: 'admin@ebdaa.com',
                password: 'admin123', // In production, this should be hashed
                displayName: 'مدير النظام',
                role: 'admin',
                createdAt: new Date().toISOString()
            },
            {
                uid: 'user-456',
                email: 'user@ebdaa.com',
                password: 'user123', // In production, this should be hashed
                role: 'user',
                name: 'مستخدم تجريبي'
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
    
    auth = {
        signInWithEmailAndPassword: async (email, password) => {
            console.log("Local: Attempting sign in", email);
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                // Store current user in localStorage
                localStorage.setItem('currentUser', JSON.stringify({
                    email: user.email,
                    role: user.role || 'customer',
                    name: user.name || 'عميل'
                }));
                
                return { 
                    user: {
                        email: user.email,
                        uid: user.email.replace(/[^a-zA-Z0-9]/g, '_'),
                        role: user.role || 'customer'
                    }
                };
            } else {
                throw new Error('Invalid email or password');
            }
        },
        
        createUserWithEmailAndPassword: async (email, password) => {
            console.log("Local: Attempting user creation", email);
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (users.find(u => u.email === email)) {
                throw new Error('User already exists');
            }
            
            const newUser = {
                email: email,
                password: password, // In production, hash this
                displayName: email.split('@')[0],
                role: 'user',
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('ebdaa_users', JSON.stringify(users));
            
            return {
                user: {
                    uid: newUser.uid,
                    email: newUser.email,
                    displayName: newUser.displayName,
                    role: newUser.role
                }
            };
        },
        
        signOut: async () => {
            await new Promise(resolve => setTimeout(resolve, 300));
            localStorage.removeItem('ebdaa_current_user');
            return true;
        },
        
        onAuthStateChanged: (callback) => {
            // Check current user
            const currentUser = localStorage.getItem('ebdaa_current_user');
            if (currentUser) {
                callback(JSON.parse(currentUser));
            } else {
                callback(null);
            }
            
            // Return unsubscribe function
            return () => {};
        },
        
        currentUser: null,
        
        updateProfile: async (updates) => {
            const currentUser = localStorage.getItem('ebdaa_current_user');
            if (currentUser) {
                const user = JSON.parse(currentUser);
                Object.assign(user, updates);
                localStorage.setItem('ebdaa_current_user', JSON.stringify(user));
                
                // Update in users array
                const users = JSON.parse(localStorage.getItem('ebdaa_users') || '[]');
                const userIndex = users.findIndex(u => u.uid === user.uid);
                if (userIndex !== -1) {
                    users[userIndex] = { ...users[userIndex], ...updates };
                    localStorage.setItem('ebdaa_users', JSON.stringify(users));
                }
            }
        }
    };
    
    // Local database simulation
    db = {
        collection: (name) => ({
            doc: (id) => ({
                set: async (data) => {
                    console.log("Local: Setting document", id, data);
                    await new Promise(resolve => setTimeout(resolve, 300));
                    const key = `${name}_${id}`;
                    localStorage.setItem(key, JSON.stringify({ ...data, id }));
                    return { id: id };
                },
                get: async () => {
                    await new Promise(resolve => setTimeout(resolve, 300));
                    const key = `${name}_${id}`;
                    const data = localStorage.getItem(key);
                    return data ? { exists: true, data: () => JSON.parse(data) } : { exists: false };
                },
                update: async (data) => {
                    console.log("Local: Updating document", id, data);
                    await new Promise(resolve => setTimeout(resolve, 300));
                    const key = `${name}_${id}`;
                    const existing = localStorage.getItem(key);
                    if (existing) {
                        const currentData = JSON.parse(existing);
                        localStorage.setItem(key, JSON.stringify({ ...currentData, ...data }));
                    }
                    return { id: id };
                }
            })
        })
    };
    
    storage = {
        ref: (path) => ({
            put: async (file) => {
                console.log("Local: Simulating file upload", path);
                await new Promise(resolve => setTimeout(resolve, 1000));
                return { 
                    ref: { 
                        getDownloadURL: async () => `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A`
                    } 
                };
            }
        })
    };
}

// Make services available globally
window.firebase = firebase;
window.auth = auth;
window.db = db;
window.storage = storage;
window.isFirebaseAuthAvailable = isFirebaseAuthAvailable;

console.log(`Authentication system ready (${isFirebaseAuthAvailable ? 'Firebase' : 'Local'} mode)`);
