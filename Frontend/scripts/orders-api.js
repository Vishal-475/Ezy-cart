import { db, collection, addDoc, getDocs, doc, updateDoc, query, where, orderBy } from './firebase-config.js';

const ordersCollection = collection(db, 'orders');

export async function placeOrder(orderData) {
    try {
        const docRef = await addDoc(ordersCollection, {
            ...orderData,
            orderStatus: 'confirmed',
            createdAt: new Date().toISOString()
        });
        return { success: true, orderId: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getAllOrders(filterDate = null) {
    try {
        let q = query(ordersCollection, orderBy('createdAt', 'desc'));
        // Implementing simple filtering could be added here
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching orders: ", error);
        return [];
    }
}

export async function getMyOrders(email) {
    try {
        const q = query(ordersCollection, where('contactEmail', '==', email), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching user orders: ", error);
        return [];
    }
}

export async function updateOrderStatus(id, status) {
    try {
        const orderRef = doc(db, 'orders', id);
        await updateDoc(orderRef, { orderStatus: status });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
