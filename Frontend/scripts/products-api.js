import { db, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from './firebase-config.js';

const productsCollection = collection(db, 'products');

export async function getAllProducts(categoryFilter = null) {
    try {
        let q = productsCollection;
        if (categoryFilter) {
            q = query(productsCollection, where("category", "==", categoryFilter));
        }
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(p => p.isActive !== false);
    } catch (error) {
        console.error("Error fetching products: ", error);
        return [];
    }
}

export async function getProductById(id) {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
    } catch (error) {
        console.error("Error fetching product: ", error);
    }
    return null;
}

export async function addProduct(productData) {
    try {
        const docRef = await addDoc(productsCollection, { ...productData, isActive: true });
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function updateProduct(id, productData) {
    try {
        const productRef = doc(db, 'products', id);
        await updateDoc(productRef, productData);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function deleteProduct(id) {
    try {
        const productRef = doc(db, 'products', id);
        // Soft delete
        await updateDoc(productRef, { isActive: false });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
