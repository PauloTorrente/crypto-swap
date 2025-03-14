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

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 1rem;
  margin-top: 10px;
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
  const [fromCurrency, setFromCurrency] = useState("BOB"); // Moeda nacional (padrão: BOB)
  const [toCurrency, setToCurrency] = useState("BRL"); // Moeda estrangeira (padrão: BRL)
  const [amount, setAmount] = useState(1000); // Valor em moeda nacional
  const [convertedAmount, setConvertedAmount] = useState(null); // Valor convertido
  const [exchangeRateFrom, setExchangeRateFrom] = useState(null); // Taxa de câmbio da moeda nacional para USDT
  const [exchangeRateTo, setExchangeRateTo] = useState(null); // Taxa de câmbio da moeda estrangeira para USDT
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener las tasas de cambio de las monedas seleccionadas a USDT
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setError(null);
        setLoading(true);

        // Obtener la tasa de cambio de la moneda nacional a USDT
        const responseFrom = await axios.get(
          `https://api.binance.com/api/v3/ticker/price?symbol=${fromCurrency}USDT`
        );
        const rateFrom = parseFloat(responseFrom.data.price);

        // Obtener la tasa de cambio de la moneda extranjera a USDT
        const responseTo = await axios.get(
          `https://api.binance.com/api/v3/ticker/price?symbol=${toCurrency}USDT`
        );
        const rateTo = parseFloat(responseTo.data.price);

        setExchangeRateFrom(rateFrom);
        setExchangeRateTo(rateTo);

        // Calcular el valor convertido
        const amountInUSDT = amount / rateFrom;
        const finalAmount = amountInUSDT * rateTo;
        setConvertedAmount(finalAmount.toFixed(2));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setError("Error al obtener el tipo de cambio. Inténtelo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();

    // Actualizar cada 60 segundos
    const interval = setInterval(fetchExchangeRates, 60000);
    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency, amount]);

  // Manejar el cambio de moneda nacional
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  // Manejar el cambio de moneda extranjera
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  // Manejar el cambio de cantidad
  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  // Obtener la bandera de la moneda seleccionada
  const fromFlag = currencies.find((curr) => curr.code === fromCurrency)?.flag;
  const toFlag = currencies.find((curr) => curr.code === toCurrency)?.flag;

  return (
    <Container variants={containerVariants} initial="hidden" animate="visible">
      <Title>Tasa de Cambio</Title>

      {/* Selección de moneda nacional */}
      <SelectContainer>
        <Select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.name} ({curr.code})
            </option>
          ))}
        </Select>
        {fromFlag && <Flag src={fromFlag} alt={`${fromCurrency} flag`} />}
      </SelectContainer>

      {/* Campo para inserir o valor em moeda nacional */}
      <Input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        min="1"
        placeholder="Cantidad"
      />

      {/* Selección de moeda estrangeira */}
      <SelectContainer>
        <Select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.name} ({curr.code})
            </option>
          ))}
        </Select>
        {toFlag && <Flag src={toFlag} alt={`${toCurrency} flag`} />}
      </SelectContainer>

      {/* Resultado da conversão */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <Result variants={resultVariants} initial="hidden" animate="visible">
          <p>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </p>
          <p>
            Tipo de cambio: 1 {fromCurrency} = {(exchangeRateTo / exchangeRateFrom).toFixed(2)} {toCurrency}
          </p>
        </Result>
      )}
    </Container>
  );
}

export default App;
