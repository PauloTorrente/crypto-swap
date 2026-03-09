import React, { useMemo, useState } from 'react';
import CurrencyForm, { normalizeAmountInput } from './components/CurrencyForm';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

import {
  Container,
  Shell,
  Header,
  HeaderInner,
  BrandRow,
  BrandLogo,
  LocationPill,
  TitleBlock,
  Title,
  Subtitle,
  Card,
  CardBody,
  Divider,
  ErrorBox,
  ResultContainer,
  ResultTopRow,
  ResultSide,
  ResultMeta,
  Arrow,
  FinalResult,
  Amount,
  Note,
  Footer,
  FooterInner
} from './components/Styles';

import Logo from './assets/Logo.png';
import Brasil from './assets/Brasil.jpg';
import Bolivia from './assets/Bolivia.png';
import Whatsapp from './components/Whatsapp';

const API_URL = 'https://backend-crypto-swap.onrender.com/api/rates/convert';

const App = () => {
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('BOB');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const numericAmount = useMemo(() => {
    const n = parseFloat(normalizeAmountInput(amount));
    return Number.isFinite(n) ? n : NaN;
  }, [amount]);

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('es-BO', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const convertCurrency = async () => {
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Por favor ingrese un valor válido (mayor que 0).');
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL, {
        from: fromCurrency,
        to: toCurrency,
        amount: numericAmount
      });

      setResult(response.data);
    } catch (err) {
      setResult(null);
      setError(err.response?.data?.message || 'Error en la conversión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setError(null);
  };

  const onAmountChange = (v) => {
    setAmount(v);
    setResult(null);
    setError(null);
  };

  const fromFlag = result?.fromCurrency === 'BRL' ? Brasil : Bolivia;
  const toFlag = result?.toCurrency === 'BRL' ? Brasil : Bolivia;

  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <HeaderInner>
          <BrandRow>
            <BrandLogo src={Logo} alt="Crypto Swap" />
          </BrandRow>
          <LocationPill>Santa Cruz</LocationPill>
        </HeaderInner>
      </Header>

      <Shell>
        <TitleBlock>
          <Title>Conversor BRL ↔ BOB</Title>
          <Subtitle>Interfaz limpia, tasa real y enfoque en el valor final.</Subtitle>
        </TitleBlock>

        <Card
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <CardBody>
            <CurrencyForm
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              amount={amount}
              setFromCurrency={setFromCurrency}
              setToCurrency={setToCurrency}
              setAmount={onAmountChange}
              onConvert={convertCurrency}
              onSwap={swapCurrencies}
              loading={loading}
            />
          </CardBody>

          <Divider />

          <CardBody style={{ paddingTop: 12 }}>
            <div style={{ display: 'grid', gap: 10 }}>
              <div style={{ fontSize: 13, color: '#5a6472', fontWeight: 900 }}>
                Transparencia
              </div>

              <div
                style={{
                  display: 'grid',
                  gap: 8,
                  padding: 12,
                  borderRadius: 14,
                  border: '1px solid #e6e8eb',
                  background: '#fff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontSize: 13, color: '#5a6472', fontWeight: 800 }}>
                    Comisión
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 950 }}>0.00</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontSize: 13, color: '#5a6472', fontWeight: 800 }}>
                    Tasa
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 950 }}>
                    tasa real
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <AnimatePresence>
          {error && (
            <ErrorBox
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ lineHeight: 1 }}>⚠️</div>
              <div>{error}</div>
            </ErrorBox>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <ResultContainer
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
            >
              <ResultTopRow>
                <ResultSide>
                  <img
                    src={fromFlag}
                    alt=""
                    style={{ width: 28, height: 28, borderRadius: 999, objectFit: 'cover' }}
                  />
                  <ResultMeta>
                    <div className="label">Usted envía</div>
                    <div className="code">{result.fromCurrency}</div>
                  </ResultMeta>
                </ResultSide>

                <Arrow>⇢</Arrow>

                <ResultSide style={{ justifyContent: 'flex-end' }}>
                  <ResultMeta style={{ textAlign: 'right' }}>
                    <div className="label">Usted recibe</div>
                    <div className="code">{result.toCurrency}</div>
                  </ResultMeta>
                  <img
                    src={toFlag}
                    alt=""
                    style={{ width: 28, height: 28, borderRadius: 999, objectFit: 'cover' }}
                  />
                </ResultSide>
              </ResultTopRow>

              <FinalResult>
                <Amount>
                  <div className="from">
                    {formatCurrency(result.originalAmount, result.fromCurrency)}
                  </div>
                  <div className="to">
                    {formatCurrency(result.finalAmount, result.toCurrency)}
                  </div>
                </Amount>

                <Note>
                  Actualizado ahora • Sin comisiones ocultas
                </Note>
              </FinalResult>
            </ResultContainer>
          )}
        </AnimatePresence>

        {/* Servicios en Español */}
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 12,
              marginBottom: 14
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 950, letterSpacing: '-0.01em' }}>
              Servicios en Santa Cruz
            </div>
            <div style={{ fontSize: 11, color: '#8a93a3', fontWeight: 800 }}>
              8R3W+J88
            </div>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { 
                icon: '💸', 
                title: 'Remesas Internacionales', 
                desc: 'Envíe entre Brasil y Bolivia con agilidad y seguridad.' 
              },
              { 
                icon: '📊', 
                title: 'Corredor Cambiario', 
                desc: 'Cambio BRL/BOB con tasas reales y transparencia.' 
              },
              { 
                icon: '🏦', 
                title: 'Casa de Cambio', 
                desc: 'Atención personalizada en Santa Cruz de la Sierra.' 
              }
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: 16,
                  borderRadius: 16,
                  border: '1px solid #e6e8eb',
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(11,15,25,0.04)'
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#f6f7f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0
                  }}
                >
                  {s.icon}
                </div>

                <div style={{ flex: 1, display: 'grid', gap: 6 }}>
                  <div style={{ 
                    fontSize: 15, 
                    fontWeight: 950,
                    color: '#0b0f19'
                  }}>
                    {s.title}
                  </div>
                  <div style={{ 
                    fontSize: 13, 
                    color: '#5a6472', 
                    lineHeight: 1.4,
                    fontWeight: 500
                  }}>
                    {s.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Información de Contacto - Mobile Optimizado */}
        <div style={{ marginTop: 28, marginBottom: 100 }}>
          <div
            style={{
              border: '1px solid #e6e8eb',
              borderRadius: 18,
              background: '#f8f9fa',
              padding: 18,
              boxShadow: '0 2px 12px rgba(11,15,25,0.05)'
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <div style={{ 
                fontSize: 16, 
                fontWeight: 950,
                color: '#0b0f19',
                marginBottom: 4
              }}>
                📍 Santa Cruz de la Sierra
              </div>
              <div style={{ 
                fontSize: 13, 
                color: '#5a6472',
                fontWeight: 600,
                lineHeight: 1.4
              }}>
                Dirección: 8R3W+J88, Bolivia
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 12 
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: 12,
                background: '#fff',
                borderRadius: 14,
                border: '1px solid #e6e8eb'
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: '#f0f9ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: '#0369a1'
                }}>
                  📞
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: 14, 
                    fontWeight: 800,
                    color: '#0b0f19'
                  }}>
                    +591 78365424
                  </div>
                  <div style={{ 
                    fontSize: 11, 
                    color: '#8a93a3',
                    marginTop: 2
                  }}>
                    Atención: Lun–Vie 9:00–18:00 • Sáb 9:00–13:00
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/59178365424"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  background: '#25D366',
                  color: '#fff',
                  fontWeight: 950,
                  borderRadius: 14,
                  padding: '14px 16px',
                  fontSize: 15,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#128C7E'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#25D366'}
              >
                <span style={{ fontSize: 18 }}>💬</span>
                <span>Contactar por WhatsApp</span>
              </a>
            </div>

            <div style={{ 
              marginTop: 14, 
              fontSize: 12, 
              color: '#8a93a3', 
              textAlign: 'center',
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 12,
              border: '1px solid #e6e8eb'
            }}>
              <strong>Emergencias:</strong> WhatsApp disponible 24/7 para consultas urgentes.
            </div>
          </div>
        </div>
      </Shell>

      <Whatsapp />

      <Footer>
        <FooterInner>
          <div style={{ fontSize: 12, color: '#8a93a3' }}>
            © {new Date().getFullYear()} Crypto Swap
          </div>
          <div style={{ 
            display: 'flex', 
            gap: 16,
            fontSize: 11,
            color: '#8a93a3',
            fontWeight: 700
          }}>
            <span>Santa Cruz</span>
            <span>•</span>
            <span>BRL/BOB</span>
            <span>•</span>
            <span>Cambio</span>
          </div>
        </FooterInner>
      </Footer>
    </Container>
  );
};

export default App;
