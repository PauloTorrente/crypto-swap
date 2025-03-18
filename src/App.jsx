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

const Calculation = styled.div`
  margin-top: 20px;
  font-size: 1rem;
  color: #ddd;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 10px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Animação com Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const resultVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: "spring", stiffness: 100 } },
};

// Lista de moedas suportadas
const currencies = [
  { code: "BRL", name: "Real Brasileiro", flag: "https://flagcdn.com/br.svg" },
  { code: "BOB", name: "Peso Boliviano", flag: "https://flagcdn.com/bo.svg" },
  { code: "PEN", name: "Soles Peruanos", flag: "https://flagcdn.com/pe.svg" },
  { code: "ARS", name: "Peso Argentino", flag: "https://flagcdn.com/ar.svg" },
  { code: "EUR", name: "Euros", flag: "https://flagcdn.com/eu.svg" },
  { code: "USD", name: "Dólares Americanos", flag: "https://flagcdn.com/us.svg" },
];

// Componente principal
function App() {
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [usdtToFrom, setUsdtToFrom] = useState(null);
  const [usdtToTo, setUsdtToTo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para obter o valor de USDT em uma moeda específica
  const getUSDTValue = async (currency) => {
    try {
      const response = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=USDT${currency}`
      );
      return parseFloat(response.data.price);
    } catch (error) {
      console.error(`Erro ao buscar valor de USDT em ${currency}:`, error);
      setError(`Erro ao buscar valor de USDT em ${currency}. Tente novamente.`);
      return null;
    }
  };

  // Função para calcular a conversão
  const convertCurrency = async () => {
    if (amount <= 0) {
      setError("O valor deve ser maior que zero.");
      return;
    }

    setLoading(true);
    setError(null);

    const usdtFrom = await getUSDTValue(fromCurrency); // Valor de USDT na moeda de origem
    const usdtTo = await getUSDTValue(toCurrency); // Valor de USDT na moeda de destino

    if (usdtFrom && usdtTo) {
      setUsdtToFrom(usdtFrom);
      setUsdtToTo(usdtTo);

      const conversionRate = usdtTo / usdtFrom; // Taxa de conversão
      const result = amount * conversionRate; // Valor convertido
      setConvertedAmount(result.toFixed(2)); // Arredonda para 2 casas decimais
    } else {
      setConvertedAmount(null);
    }

    setLoading(false);
  };

  // Atualiza a conversão quando o valor ou as moedas mudam
  useEffect(() => {
    convertCurrency();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <Container variants={containerVariants} initial="hidden" animate="visible">
      <Title>CryptoSwap</Title>

      {/* Seleção de moeda de origem */}
      <SelectContainer>
        <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.name} ({curr.code})
            </option>
          ))}
        </Select>
        <Flag src={currencies.find((curr) => curr.code === fromCurrency)?.flag} alt={`${fromCurrency} flag`} />
      </SelectContainer>

      {/* Entrada de valor */}
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        min="1"
        placeholder="Quantidade"
      />

      {/* Seleção de moeda de destino */}
      <SelectContainer>
        <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.name} ({curr.code})
            </option>
          ))}
        </Select>
        <Flag src={currencies.find((curr) => curr.code === toCurrency)?.flag} alt={`${toCurrency} flag`} />
      </SelectContainer>

      {/* Exibição do resultado */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <Result variants={resultVariants} initial="hidden" animate="visible">
            <p>
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </p>
          </Result>

          {/* Detalhes do cálculo */}
          <Calculation>
            <p>
              <strong>Cálculo:</strong>
            </p>
            <p>
              1 USDT = {usdtToFrom} {fromCurrency}
            </p>
            <p>
              1 USDT = {usdtToTo} {toCurrency}
            </p>
            <p>
              Taxa de conversão: ({usdtToTo} / {usdtToFrom}) = {(usdtToTo / usdtToFrom).toFixed(2)}
            </p>
            <p>
              Valor convertido: {amount} × {(usdtToTo / usdtToFrom).toFixed(2)} = {convertedAmount} {toCurrency}
            </p>
          </Calculation>
        </>
      )}
    </Container>
  );
}

export default App;
