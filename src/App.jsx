import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

// Estilos com Styled Components
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: white;
  padding: 20px;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  color: #333;
  width: 150px;
`;

const Flag = styled.img`
  width: 30px;
  height: 20px;
  border-radius: 3px;
`;

const Result = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
`;

// Animaciones con Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const resultVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: "spring", stiffness: 100 } },
};

// Componente principal
function App() {
  const [currencies, setCurrencies] = useState([
    { code: "BRL", name: "Real Brasileño", flag: "https://flagcdn.com/br.svg" },
    { code: "BOB", name: "Peso Boliviano", flag: "https://flagcdn.com/bo.svg" },
    { code: "PEN", name: "Soles Peruanos", flag: "https://flagcdn.com/pe.svg" },
    { code: "ARS", name: "Peso Argentino", flag: "https://flagcdn.com/ar.svg" },
    { code: "EUR", name: "Euros", flag: "https://flagcdn.com/eu.svg" },
    { code: "USD", name: "Dólares Estadounidenses", flag: "https://flagcdn.com/us.svg" },
  ]);
  const [selectedCurrency, setSelectedCurrency] = useState("BRL");
  const [amount, setAmount] = useState(1000);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const commission = 0.0195; // 1.95%

  // Obtener la tasa de cambio de la moneda seleccionada
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // Usar una API de terceros para obtener la tasa de cambio fiat
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const rates = response.data.rates;
        setExchangeRate(rates[selectedCurrency]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [selectedCurrency]);

  // Manejar el cambio de moneda
  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
    setLoading(true);
  };

  // Manejar el cambio de cantidad
  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  // Obtener la bandera de la moneda seleccionada
  const selectedFlag = currencies.find((curr) => curr.code === selectedCurrency)?.flag;

  // Calcular el valor en USDT con comisión
  const calculateFinalAmount = () => {
    if (!exchangeRate) return null;
    const amountInUSDT = amount / exchangeRate;
    const finalAmount = amountInUSDT * (1 - commission);
    return finalAmount.toFixed(2);
  };

  return (
    <Container variants={containerVariants} initial="hidden" animate="visible">
      <Title>CryptoSwap</Title>
      <SelectContainer>
        <Select value={selectedCurrency} onChange={handleCurrencyChange}>
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.name} ({curr.code})
            </option>
          ))}
        </Select>
        {selectedFlag && <Flag src={selectedFlag} alt={`${selectedCurrency} flag`} />}
      </SelectContainer>
      <Input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        min="1"
        placeholder="Cantidad"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Result variants={resultVariants} initial="hidden" animate="visible">
          <p>
            Monto ingresado: {amount} {selectedCurrency}
          </p>
          <p>
            Tipo de cambio: 1 USDT = {exchangeRate} {selectedCurrency}
          </p>
          <p>
            Comisión (1.95%): {(amount * commission).toFixed(2)} {selectedCurrency}
          </p>
          <p>
            Monto final en USDT: {calculateFinalAmount()}
          </p>
        </Result>
      )}
    </Container>
  );
}

export default App;
