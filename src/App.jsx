import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('BOB');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertCurrency = async () => {
    const numericAmount = parseFloat(amount);
    if ((!numericAmount) || isNaN(numericAmount)) {
      setError('Por favor insira um valor válido');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('https://backend-crypto-swap.onrender.com/api/rates/convert', {
        from: fromCurrency,
        to: toCurrency,
        amount: numericAmount
      });
      
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Falha na conversão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency === 'BRL' ? 'BRL' : 'BOB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <Container>
      <Header>
        <h1>💰 Conversor de Moedas Crypto Swap</h1>
        <p>Converta entre Real Brasileiro e Boliviano</p>
      </Header>

      <FormContainer>
        <InputGroup>
          <label>De:</label>
          <CurrencySelect 
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
              setResult(null);
            }}
          >
            <option value="BRL">BRL (Real Brasileiro)</option>
            <option value="BOB">BOB (Boliviano)</option>
          </CurrencySelect>
        </InputGroup>

        <SwapButton 
          onClick={swapCurrencies}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ⇄
        </SwapButton>

        <InputGroup>
          <label>Para:</label>
          <CurrencySelect 
            value={toCurrency}
            onChange={(e) => {
              setToCurrency(e.target.value);
              setResult(null);
            }}
          >
            <option value="BOB">BOB (Boliviano)</option>
            <option value="BRL">BRL (Real Brasileiro)</option>
          </CurrencySelect>
        </InputGroup>

        <InputGroup>
          <label>Valor:</label>
          <Input 
            type="number" 
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setResult(null);
            }}
            min="0.01"
            step="0.01"
            placeholder="Digite o valor"
          />
        </InputGroup>

        <ConvertButton 
          onClick={convertCurrency}
          disabled={loading || !amount}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Convertendo...' : 'Converter'}
        </ConvertButton>
      </FormContainer>

      {error && (
        <ErrorBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {error}
        </ErrorBox>
      )}

      <AnimatePresence>
        {result && (
          <ResultContainer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinalResult>
              <h3>Resultado da Conversão</h3>
              <Amount>
                {formatCurrency(result.originalAmount, result.fromCurrency)} ➔{' '}
                {formatCurrency(result.finalAmount, result.toCurrency)}
              </Amount>
            </FinalResult>
          </ResultContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

// Estilos mantidos sem alterações
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #7f8c8d;
  }
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: end;
  margin-bottom: 2rem;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2c3e50;
  }
`;

const CurrencySelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

const SwapButton = styled(motion.button)`
  background: #3498db;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ConvertButton = styled(motion.button)`
  grid-column: 1 / -1;
  padding: 1rem;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;

const ErrorBox = styled(motion.div)`
  padding: 1rem;
  background: #e74c3c;
  color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ResultContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
`;

const FinalResult = styled.div`
  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
`;

const Amount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #27ae60;
  margin: 1rem 0;
`;

export default CurrencyConverter;
