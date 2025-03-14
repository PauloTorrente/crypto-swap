const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// Rota para obter o preço de uma moeda em USDT
app.get("/api/binance", async (req, res) => {
  try {
    const { symbol } = req.query;
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from Binance" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});