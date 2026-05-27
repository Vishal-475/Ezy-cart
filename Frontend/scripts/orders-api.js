import { db, collection, addDoc, getDocs, doc, updateDoc, query, where, orderBy } from './firebase-config.js';

const ordersCollection = collection(db, 'orders');

// Generate invoice number: INV-YYYYMMDD-XXXX
function generateInvoiceNumber() {
    const now = new Date();
    const datePart = now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0');
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    return `INV-${datePart}-${randomPart}`;
}

export async function placeOrder(orderData) {
    try {
        const invoiceNumber = generateInvoiceNumber();
        const docRef = await addDoc(ordersCollection, {
            ...orderData,
            invoiceNumber: invoiceNumber,
            orderStatus: 'confirmed',
            createdAt: new Date().toISOString()
        });
        return { success: true, orderId: docRef.id, invoiceNumber: invoiceNumber };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getAllOrders(filterDate = null) {
    try {
        let q = query(ordersCollection, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching orders: ", error);
        return [];
    }
}

export async function getMyOrders(userId) {
    try {
        const q = query(ordersCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
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
