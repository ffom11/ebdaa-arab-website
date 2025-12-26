// Supabase Configuration - Real Project Settings
const SUPABASE_URL = 'https://vfewmbirxkobxsifuyck.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZXdtYmlyeGtvYnhzaWZ1eWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NTk0NTMsImV4cCI6MjA4MjMzNTQ1M30.e7T7om_4G3R08tRJemx8LyLTsmfsP3oiC0uea3yN-5k';

// Initialize Supabase with fallback to local authentication
let supabase;
let isSupabaseAvailable = false;

try {
    // Initialize Supabase
    const { createClient } = window.supabase;
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    isSupabaseAvailable = true;
    console.log("Supabase initialized successfully");
} catch (error) {
    console.error("Supabase initialization failed:", error);
    isSupabaseAvailable = false;
}

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
    
    // Local user storage - Check both possible keys
    let users = JSON.parse(localStorage.getItem('ebdaa_users') || '[]');
    if (users.length === 0) {
        users = JSON.parse(localStorage.getItem('users') || '[]');
    }
    
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
        // Save to both keys for compatibility
                localStorage.setItem('users', JSON.stringify(defaultUsers));
                localStorage.setItem('ebdaa_users', JSON.stringify(defaultUsers));
    }
    
    auth = {
        signInWithEmailAndPassword: async (email, password) => {
            console.log("Local: Attempting sign in", email);
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Refresh users array from localStorage
            const currentUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const ebdaaUsers = JSON.parse(localStorage.getItem('ebdaa_users') || '[]');
            const allUsers = [...currentUsers, ...ebdaaUsers];
            
            console.log("Available users:", allUsers.map(u => ({ email: u.email, role: u.role })));
            
            const user = allUsers.find(u => u.email === email && u.password === password);
            if (user) {
                // Store current user in both locations
                const userData = {
                    email: user.email,
                    role: user.role || 'customer',
                    name: user.name || user.displayName || 'عميل',
                    uid: user.uid || email.replace(/[^a-zA-Z0-9]/g, '_')
                };
                
                localStorage.setItem('currentUser', JSON.stringify(userData));
                localStorage.setItem('ebdaa_current_user', JSON.stringify(userData));
                
                console.log("Login successful for:", userData);
                
                return { 
                    user: {
                        email: user.email,
                        uid: user.uid || email.replace(/[^a-zA-Z0-9]/g, '_'),
                        role: user.role || 'customer',
                        displayName: user.name || user.displayName || 'عميل'
                    }
                };
            } else {
                console.log("Login failed - user not found or password incorrect");
                throw new Error('Invalid email or password');
            }
        },
        
        createUserWithEmailAndPassword: async (email, password) => {
            console.log("Local: Attempting user creation", email);
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check both user arrays
            const currentUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const ebdaaUsers = JSON.parse(localStorage.getItem('ebdaa_users') || '[]');
            const allUsers = [...currentUsers, ...ebdaaUsers];
            
            if (allUsers.find(u => u.email === email)) {
                throw new Error('User already exists');
            }
            
            const newUser = {
                uid: email.replace(/[^a-zA-Z0-9]/g, '_'),
                email: email,
                password: password, // In production, hash this
                displayName: email.split('@')[0],
                name: email.split('@')[0],
                role: 'user',
                createdAt: new Date().toISOString()
            };
            
            // Add to both storage locations
            currentUsers.push(newUser);
            ebdaaUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(currentUsers));
            localStorage.setItem('ebdaa_users', JSON.stringify(ebdaaUsers));
            
            console.log("User created successfully:", newUser);
            
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
            localStorage.removeItem('currentUser');
            return true;
        },
        
        onAuthStateChanged: (callback) => {
            // Check current user in both locations
            const currentUser = localStorage.getItem('ebdaa_current_user') || localStorage.getItem('currentUser');
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
window.supabase = supabase;
window.isFirebaseAuthAvailable = isFirebaseAuthAvailable;
window.isSupabaseAvailable = isSupabaseAvailable;

console.log(`Authentication system ready (${isFirebaseAuthAvailable ? 'Firebase' : 'Local'} mode)`);
console.log(`Supabase integration ready (${isSupabaseAvailable ? 'Connected' : 'Fallback'} mode)`);
