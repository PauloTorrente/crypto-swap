import React, { useState } from 'react';
import CurrencyForm from './components/CurrencyForm';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Container,
  Header,
  ErrorBox,
  ResultContainer,
  FinalResult,
  Amount
} from './components/Styles';
import Logo from './assets/Logo.png';
import Brasil from './assets/Brasil.jpg';
import Bolivia from './assets/Bolivia.png';
import Whatsapp from './components/Whatsapp'; // Importação adicionada

const App = () => {
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('BOB');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertCurrency = async () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || isNaN(numericAmount)) {
      setError('Por favor insira um valor válido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://backend-crypto-swap.onrender.com/api/rates/convert',
        {
          from: fromCurrency,
          to: toCurrency,
          amount: numericAmount
        }
      );
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
        <img
          src={Logo}
          alt="Logo Crypto Swap"
          style={{ maxWidth: '450px', height: 'auto' }}
        />
      </Header>

      <CurrencyForm
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
        setFromCurrency={setFromCurrency}
        setToCurrency={setToCurrency}
        setAmount={setAmount}
        onConvert={convertCurrency}
        onSwap={swapCurrencies}
        loading={loading}
      />

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
              <Amount>
                <img
                  src={result.fromCurrency === 'BRL' ? Brasil : Bolivia}
                  alt={result.fromCurrency}
                  style={{ width: '25px', marginRight: '8px', verticalAlign: 'middle' }}
                />
                {formatCurrency(result.originalAmount, result.fromCurrency)} ➔{' '}
                <img
                  src={result.toCurrency === 'BRL' ? Brasil : Bolivia}
                  alt={result.toCurrency}
                  style={{ width: '25px', margin: '0 8px', verticalAlign: 'middle' }}
                />
                {formatCurrency(result.finalAmount, result.toCurrency)}
              </Amount>
            </FinalResult>
          </ResultContainer>
        )}
      </AnimatePresence>

      {/* Componente Whatsapp adicionado aqui */}
      <Whatsapp />
    </Container>
  );
};

export default App;
