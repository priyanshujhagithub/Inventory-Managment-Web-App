// POST /api/update-product
router.post('/update-product', async (req, res) => {
    const { id, weight, quantity, temperature, humidity } = req.body;
    
    // 1) Update your database
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    Object.assign(product, { weight, quantity, temperature, humidity });
    await product.save();
    
    // 2) Emit a Socket.IO event so all connected dashboards see it instantly
    req.app.get('io').emit('product-update', { id, weight, quantity, temperature, humidity });
    
    return res.json({ success: true });
    });
    