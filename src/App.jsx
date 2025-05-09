import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(108, 92, 231, 0.15);
  font-family: 'Segoe UI', system-ui, sans-serif;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    color: #6C5CE7;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const CurrencyCard = styled(motion.div)`
  padding: 1.5rem;
  background: #fff;
  border-radius: 16px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #DFE6E9;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid #DFE6E9;
  border-radius: 12px;
  font-size: 1.3rem;
  font-weight: 600;
  color: #2D3436;
  text-align: right;
`;

const Select = styled.select`
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid #DFE6E9;
  color: #2D3436;
  background: #fff;
`;

const SwapButton = styled(motion.button)`
  background: linear-gradient(135deg, #6C5CE7, #00CEFF);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
  &:hover {
    animation: ${pulse} 1.5s infinite;
  }
`;

const CalculationSteps = styled(motion.div)`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #F9F9FF;
  border-radius: 16px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Step = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px dashed #DFE6E9;
  &:last-child {
    border-bottom: none;
  }
`;

const ResultCard = styled(motion.div)`
  padding: 1.5rem;
  background: #6C5CE7;
  color: white;
  border-radius: 16px;
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
`;

const Flag = styled.span`
  font-size: 2rem;
  margin-right: 0.5rem;
`;

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('BOB');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const convertCurrency = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://backend-crypto-swap.onrender.com/api/rates/convert', {
        from: fromCurrency,
        to: toCurrency,
        amount: amount
      });
      setResult(response.data);
      setShowSteps(true);
    } catch (error) {
      console.error('Error converting currency:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setShowSteps(false);
  };

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    }).format(value);
  };

  const getFlagEmoji = (currencyCode) => {
    const emojiMap = {
      BRL: '🇧🇷',
      BOB: '🇧🇴',
      USD: '🇺🇸',
      EUR: '🇪🇺'
    };
    return emojiMap[currencyCode] || '💱';
  };

  return (
    <Container>
      <Header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Crypto Swap Converter</h1>
      </Header>

      <CurrencyCard
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Flag>{getFlagEmoji(fromCurrency)}</Flag>
        <Select 
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="BRL">BRL (Real Brasileiro)</option>
          <option value="BOB">BOB (Boliviano)</option>
        </Select>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
        />
      </CurrencyCard>

      <SwapButton
        onClick={handleSwap}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔄
      </SwapButton>

      <CurrencyCard
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Flag>{getFlagEmoji(toCurrency)}</Flag>
        <Select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="BOB">BOB (Boliviano)</option>
          <option value="BRL">BRL (Real Brasileiro)</option>
        </Select>
        <Input
          type="text"
          value={result ? formatCurrency(result.finalAmount, toCurrency) : '0.00'}
          readOnly
        />
      </CurrencyCard>

      <motion.button
        onClick={convertCurrency}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          padding: '1rem',
          background: '#6C5CE7',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: '600',
          marginTop: '1rem',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Calculating...' : 'Convert'}
      </motion.button>

      <AnimatePresence>
        {showSteps && result && (
          <CalculationSteps
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Calculation Steps</h3>
            
            <Step>
              <span>Original Amount:</span>
              <span>{formatCurrency(result.originalAmount, fromCurrency)}</span>
            </Step>
            
            <Step>
              <span>Bank Fee ({result.steps.exchangeRateUsed.bankFeeRate * 100}%):</span>
              <span>-{formatCurrency(result.steps.bankFee, fromCurrency)}</span>
            </Step>
            
            <Step>
              <span>Net After Bank:</span>
              <span>{formatCurrency(result.steps.netAfterBank, fromCurrency)}</span>
            </Step>
            
            <Step>
              <span>Convert to USDT (Rate: {result.steps.exchangeRateUsed.from}):</span>
              <span>{result.steps.usdtAcquired} USDT</span>
            </Step>
            
            <Step>
              <span>Platform Fee ({result.steps.exchangeRateUsed.usdt * 100}%):</span>
              <span>-{result.steps.platformFee} USDT</span>
            </Step>
            
            <Step>
              <span>Net USDT:</span>
              <span>{result.steps.netUsdt} USDT</span>
            </Step>
            
            <Step>
              <span>Spread ({result.steps.exchangeRateUsed.spreadRate * 100}%):</span>
              <span>-{result.steps.spread} USDT</span>
            </Step>
            
            <Step>
              <span>Final USDT:</span>
              <span>{result.steps.finalUsdt} USDT</span>
            </Step>
            
            <Step>
              <span>Convert to {toCurrency} (Rate: {result.steps.exchangeRateUsed.to}):</span>
              <span>{formatCurrency(result.finalAmount, toCurrency)}</span>
            </Step>

            <ResultCard
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              Final Amount: {formatCurrency(result.finalAmount, toCurrency)}
            </ResultCard>
          </CalculationSteps>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CurrencyConverter;
