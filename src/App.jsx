import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import axios from 'axios';

// Estilos globais para garantir renderização de emojis
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "EmojiFont";
    src: local("Apple Color Emoji"), 
         local("Segoe UI Emoji"), 
         local("Segoe UI Symbol"),
         local("Noto Color Emoji");
    unicode-range: U+1F000-1F644, U+203C-3299;
  }
  
  body {
    font-family: 'Segoe UI', system-ui, sans-serif, "EmojiFont";
  }
`;

// Cores e tema
const colors = {
  primary: '#6C5CE7',
  secondary: '#00CEFF',
  accent: '#FD79A8',
  background: '#F9F9FF',
  text: '#2D3436',
  lightText: '#636E72',
  card: '#FFFFFF',
  border: '#DFE6E9'
};

// Animação de pulso
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Estilizações com Styled Components
const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${colors.background};
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(108, 92, 231, 0.15);
  font-family: 'Segoe UI', system-ui, sans-serif, "EmojiFont";
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    color: ${colors.primary};
    font-size: 2rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  p {
    color: ${colors.lightText};
    font-size: 1rem;
  }
`;

const CurrencyCard = styled(motion.div)`
  padding: 1.5rem;
  background: ${colors.card};
  border-radius: 16px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.border};
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const CurrencySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 140px;
`;

const FlagContainer = styled.span`
  font-size: 2rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(108, 92, 231, 0.1);
  border-radius: 50%;
  padding: 5px;
  position: relative;
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${colors.border};
  border-radius: 12px;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${colors.text};
  text-align: right;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
  }
  &[readonly] {
    background: ${colors.background};
    color: ${colors.primary};
    font-weight: 700;
  }
`;

const Select = styled.select`
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid ${colors.border};
  color: ${colors.text};
  background: ${colors.card};
  cursor: pointer;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const SwapButton = styled(motion.button)`
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
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

const RateInfo = styled(motion.div)`
  text-align: center;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(108, 92, 231, 0.05);
  border-radius: 12px;
  p {
    color: ${colors.lightText};
    margin: 0.3rem 0;
    font-size: 0.9rem;
  }
  .rate {
    color: ${colors.primary};
    font-weight: 700;
    font-size: 1.1rem;
  }
`;

const Loading = styled(motion.div)`
  text-align: center;
  padding: 1rem;
  color: ${colors.lightText};
`;

// Sistema de emojis mais robusto com fallback
const getCurrencyEmoji = (currencyCode) => {
  const emojiMap = {
    BOB: { emoji: '🇧🇴', fallback: 'BO', color: '#047857' },
    BRL: { emoji: '🇧🇷', fallback: 'BR', color: '#1E40AF' },
    USD: { emoji: '🇺🇸', fallback: 'US', color: '#1E40AF' },
    EUR: { emoji: '🇪🇺', fallback: 'EU', color: '#0033AA' },
    default: { emoji: '💱', fallback: '$', color: '#6C5CE7' }
  };
  
  return emojiMap[currencyCode] || emojiMap.default;
};

// Componente Flag melhorado
const Flag = ({ currencyCode }) => {
  const { emoji, fallback, color } = getCurrencyEmoji(currencyCode);
  
  return (
    <FlagContainer style={{ backgroundColor: `${color}20` }}>
      <span aria-hidden="true" style={{ fontFamily: '"EmojiFont", sans-serif' }}>{emoji}</span>
      <span className="sr-only">{fallback}</span>
    </FlagContainer>
  );
};

const Main = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('BOB');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rateInfo, setRateInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://backend-crypto-swap.onrender.com/api/exchange/');
        const filtered = response.data.filter(currency => currency.currency_code !== 'USDT');
        setCurrencies(filtered);
        
        // Prepara informações da taxa
        if (filtered.length >= 2) {
          const from = filtered.find(c => c.currency_code === 'BOB');
          const to = filtered.find(c => c.currency_code === 'BRL');
          if (from && to) {
            setRateInfo({
              buyRate: parseFloat(to.buy_rate).toFixed(4),
              sellRate: parseFloat(from.sell_rate).toFixed(4),
              spread: parseFloat(from.spread).toFixed(2),
              lastUpdated: new Date(from.last_updated).toLocaleString()
            });
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const calculateConversion = () => {
      if (!currencies.length) return;

      const from = currencies.find(c => c.currency_code === fromCurrency);
      const to = currencies.find(c => c.currency_code === toCurrency);

      if (from && to) {
        let result;
        // Calcula seguindo a lógica do Excel
        if (fromCurrency === 'BOB' && toCurrency === 'BRL') {
          result = (amount / parseFloat(from.sell_rate)) * 0.975 * parseFloat(to.buy_rate);
        } else if (fromCurrency === 'BRL' && toCurrency === 'BOB') {
          result = (amount / parseFloat(from.sell_rate)) * 0.975 * parseFloat(to.buy_rate);
        } else {
          result = amount; // Mesma moeda
        }
        
        setConvertedAmount(result.toFixed(2));
      }
    };

    calculateConversion();
  }, [amount, fromCurrency, toCurrency, currencies]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value, currencyCode) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode
    }).format(value).replace(/\D00(?=\D*$)/, '');
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1>Conversor Global <span style={{ fontFamily: '"EmojiFont", sans-serif' }}>🌎</span></h1>
          <p>Taxas competitivas em tempo real</p>
        </Header>

        {loading ? (
          <Loading
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Carregando cotações...
          </Loading>
        ) : (
          <>
            <CurrencyCard 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CurrencySelector>
                <Flag currencyCode={fromCurrency} />
                <Select 
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency.id} value={currency.currency_code}>
                      {currency.currency_code} - {currency.currency_name}
                    </option>
                  ))}
                </Select>
              </CurrencySelector>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </CurrencyCard>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SwapButton
                onClick={handleSwap}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <span style={{ fontFamily: '"EmojiFont", sans-serif' }}>🔄</span>
              </SwapButton>
            </div>

            <CurrencyCard 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CurrencySelector>
                <Flag currencyCode={toCurrency} />
                <Select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency.id} value={currency.currency_code}>
                      {currency.currency_code} - {currency.currency_name}
                    </option>
                  ))}
                </Select>
              </CurrencySelector>
              <Input
                type="text"
                value={formatCurrency(convertedAmount, toCurrency)}
                readOnly
              />
            </CurrencyCard>

            {rateInfo && (
              <RateInfo
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
              </RateInfo>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Main;
