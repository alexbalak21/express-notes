// In your Express backend (e.g., app.js or routes/api.js)
const express = require('express');
const zlib = require('zlib');
const router = express.Router();

// Compress HTML endpoint
router.post('/api/compress', express.text(), (req, res) => {
    const html = req.body;
    
    // Compress using gzip
    zlib.gzip(html, (err, compressed) => {
        if (err) {
            return res.status(500).json({ error: 'Compression failed' });
        }
        // Send back as base64 string for safe transmission
        res.json({ 
            compressed: compressed.toString('base64'),
            originalSize: Buffer.byteLength(html, 'utf8'),
            compressedSize: compressed.length,
            ratio: (compressed.length / Buffer.byteLength(html, 'utf8') * 100).toFixed(2) + '%'
        });
    });
});

// Decompress endpoint
router.post('/api/decompress', express.json(), (req, res) => {
    const { compressed } = req.body;
    const buffer = Buffer.from(compressed, 'base64');
    
    zlib.gunzip(buffer, (err, decompressed) => {
        if (err) {
            return res.status(500).json({ error: 'Decompression failed' });
        }
        res.send(decompressed.toString());
    });
});

module.exports = router;