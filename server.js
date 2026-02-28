const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { db } = require('./firebase');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

// Place new order
app.post('/api/orders', async (req, res) => {
  try {
    console.log('📦 New order received:', req.body);
    const {
      orderId, studentName, studentPhone,
      items, total, paymentMethod
    } = req.body;

    await db.collection('orders').doc(orderId).set({
      orderId,
      studentName:   studentName   || 'Student',
      studentPhone:  studentPhone  || 'N/A',
      items,
      total,
      paymentMethod: paymentMethod || 'UPI Payment',
      status:        'confirmed',
      createdAt:     new Date().toISOString()
    });

    console.log('✅ Order saved to Firebase:', orderId);
    res.json({ success: true, orderId });

  } catch (err) {
    console.error('❌ Error saving order:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get all orders for staff dashboard
app.get('/api/orders', async (req, res) => {
  try {
    const snapshot = await db.collection('orders')
      .orderBy('createdAt', 'desc')
      .get();
    const orders = snapshot.docs.map(doc => doc.data());
    console.log(`📋 Fetched ${orders.length} orders`);
    res.json(orders);
  } catch (err) {
    console.error('❌ Error fetching orders:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update order status
app.patch('/api/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status }  = req.body;
    await db.collection('orders').doc(orderId).update({ status });
    console.log(`🔄 Order ${orderId} updated to: ${status}`);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error updating order:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get menu
app.get('/api/menu', async (req, res) => {
  try {
    const snapshot = await db.collection('menu')
      .orderBy('id')
      .get();
    const items = snapshot.docs.map(doc => doc.data());
    res.json(items);
  } catch (err) {
    console.error('❌ Error fetching menu:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Toggle menu item availability
app.patch('/api/menu/:itemId', async (req, res) => {
  try {
    const { itemId }    = req.params;
    const { available } = req.body;
    await db.collection('menu')
      .doc(itemId.toString())
      .update({ available });
    console.log(`🍽️ Menu item ${itemId} set to: ${available}`);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error updating menu:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Quit-Queue server running at http://localhost:${PORT}`);
});