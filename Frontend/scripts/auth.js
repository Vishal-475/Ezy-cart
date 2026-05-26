import { 
  auth, db, 
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
  doc, setDoc, getDoc 
} from './firebase-config.js';

// Get Current User Role
export async function getUserRole(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
  }
  return 'user';
}

// Login
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const role = await getUserRole(user.uid);
    return { success: true, user, role };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Register
export async function registerUser(email, password, name, role = 'user') {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      displayName: name,
      role: role,
      createdAt: new Date()
    });
    
    return { success: true, user, role };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Logout
export async function logoutUser() {
  try {
    await signOut(auth);
    localStorage.removeItem('cart'); // clear user cart locally on logout
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Auth State Listener
export function initAuthListener(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const role = await getUserRole(user.uid);
      callback({ user, role });
    } else {
      callback(null);
    }
  });
}
