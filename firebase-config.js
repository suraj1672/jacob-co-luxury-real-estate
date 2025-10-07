// Firebase Configuration
// Replace with your actual Firebase project credentials

const firebaseConfig = {
    apiKey: "AIzaSyDqRipNH0944KR4RGQjUsmycikd1hDPDTk",
    authDomain: "primeestate-c164d.firebaseapp.com",
    projectId: "primeestate-c164d",
    storageBucket: "primeestate-c164d.firebasestorage.app",
    messagingSenderId: "889765329015",
    appId: "1:889765329015:web:6add5da8ab56e8ddf0ae72",
    measurementId: "G-GYG6J36XY9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Helper function to save form data to Firestore
async function saveToFirestore(collectionName, data) {
    try {
        const docRef = await db.collection(collectionName).add({
            ...data,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: new Date().toISOString()
        });
        console.log('Document written with ID: ', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding document: ', error);
        return { success: false, error: error.message };
    }
}

// Helper function to generate enquiry number
function generateEnquiryNumber(prefix = 'ENQ') {
    return prefix + '-' + Date.now().toString().slice(-8);
}
