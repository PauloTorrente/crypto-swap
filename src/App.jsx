import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Estilos com Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TitleText = styled.h1`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
`;

const SelectBox = styled.select`
  padding: 10px;
  font-size: 1em;
  margin-bottom: 20px;
`;

const OptionContainer = styled.option`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  font-size: 1.1em;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 30px;

  &:hover {
    background-color: #45a049;
  }
`;

const ExchangeRate = styled.div`
  font-size: 1.5em;
  color: #333;
`;

const Flag = styled.img`
  width: 30px;
  height: 20px;
  margin-right: 10px;
`;

const AmountInput = styled.input`
  padding: 10px;
  font-size: 1em;
  margin-bottom: 20px;
  width: 200px;
`;

const ChartContainer = styled.div`
  margin-top: 30px;
  width: 80%;
  max-width: 600px;
`;

const ExplanationContainer = styled.div`
  margin-top: 20px;
  font-size: 1.2em;
  color: #666;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 5px;
  width: 80%;
  max-width: 600px;
`;

const App = () => {
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('BOB');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([
    { name: 'BRL', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/2560px-Flag-of-Brazil.svg.png' },
    { name: 'ARS', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg' },
    { name: 'PEN', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_Peru.svg/2560px-Flag-of-Peru.svg.png' },
    { name: 'BOB', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Bolivia.svg/2560px-Flag-of-Bolivia.svg.png' },
    { name: 'EUR', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Europe.svg/2560px-Flag-of-Europe.svg.png' },
    { name: 'USD', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag-of-the-United-States.svg.png' },
  ]);
  const [amount, setAmount] = useState(1);
  const [historicalData, setHistoricalData] = useState([]);
  const [fromCurrencyRate, setFromCurrencyRate] = useState(null);
  const [toCurrencyRate, setToCurrencyRate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('6m'); // Novo estado para controlar o período de tempo

  // Mapeamento de moedas que não estão diretamente na Binance para moedas correlacionadas
  const currencyMapping = {
    'BOB': 'BRL', // Usando BRL como referência para BOB
  };

  // Iniciando o Chart.js
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

  useEffect(() => {
    fetchCurrencyRate(fromCurrency);
    fetchCurrencyRate(toCurrency);
    fetchHistoricalData(selectedPeriod); // Carrega os dados históricos com base no período selecionado
  }, [fromCurrency, toCurrency, selectedPeriod]); // Adiciona selectedPeriod como dependência

  const fetchCurrencyRate = async (currency) => {
    try {
      // Verifica se a moeda tem um mapeamento para outra
      const mappedCurrency = currencyMapping[currency] || currency;
      
      // Consultar a taxa de câmbio para a moeda em relação ao USDT
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=${mappedCurrency.toLowerCase()}`);
      const rate = response.data.usd[mappedCurrency.toLowerCase()];
      
      if (currency === fromCurrency) {
        setFromCurrencyRate(rate);
      } else {
        setToCurrencyRate(rate);
      }
    } catch (error) {
      console.error('Erro ao obter taxas:', error);
    }
  };

  const fetchHistoricalData = async (period) => {
    let data;
    switch (period) {
      case '6m':
        // Dados históricos para os últimos 6 meses
        data = [
          { time: '2025-03-01', price: 1.00 },
          { time: '2025-03-15', price: 1.02 },
          { time: '2025-04-01', price: 1.05 },
          { time: '2025-04-15', price: 1.08 },
          { time: '2025-05-01', price: 1.10 },
          { time: '2025-06-01', price: 1.12 },
        ];
        break;
      case '1y':
        // Dados históricos para 1 ano
        data = [
          { time: '2025-03-01', price: 1.00 },
          { time: '2025-06-01', price: 1.05 },
          { time: '2025-09-01', price: 1.10 },
          { time: '2025-12-01', price: 1.15 },
          { time: '2026-03-01', price: 1.20 },
        ];
        break;
      case '5y':
        // Dados históricos para 5 anos
        data = [
          { time: '2020-03-01', price: 1.00 },
          { time: '2021-03-01', price: 1.10 },
          { time: '2022-03-01', price: 1.20 },
          { time: '2023-03-01', price: 1.30 },
          { time: '2024-03-01', price: 1.40 },
          { time: '2025-03-01', price: 1.50 },
        ];
        break;
      default:
        data = [];
    }
    setHistoricalData(data);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const convertCurrency = () => {
    if (fromCurrencyRate && toCurrencyRate) {
      // Primeiro converte a moeda de origem para USDT
      const valueInUSDT = amount / fromCurrencyRate;
      // Depois converte de USDT para a moeda de destino
      const convertedValue = valueInUSDT * toCurrencyRate;
      return convertedValue.toFixed(2);
    }
    return 'Carregando taxas...';
  };

  const explanationText = () => {
    if (fromCurrencyRate && toCurrencyRate) {
      const valueInUSDT = amount / fromCurrencyRate;
      const convertedValue = valueInUSDT * toCurrencyRate;
      return `Primeiro, convertemos ${amount} ${fromCurrency} para USDT, usando a taxa de ${fromCurrency} para USDT: ${fromCurrencyRate}. O valor resultante é ${valueInUSDT.toFixed(2)} USDT. 
      Depois, convertemos esse valor para ${toCurrency}, usando a taxa de USDT para ${toCurrency}: ${toCurrencyRate}. O valor final convertido é ${convertedValue.toFixed(2)} ${toCurrency}.`;
    }
    return 'Carregando taxas...';
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <TitleText>Conversor de Moedas via USDT</TitleText>

        {/* Seleção da moeda de origem */}
        <SelectBox onChange={(e) => setFromCurrency(e.target.value)} value={fromCurrency}>
          {currencies.map((currency) => (
            <OptionContainer key={currency.name} value={currency.name}>
              <Flag src={currency.flag} alt={`${currency.name} flag`} />
              {currency.name}
            </OptionContainer>
          ))}
        </SelectBox>

        {/* Seleção da moeda de destino */}
        <SelectBox onChange={(e) => setToCurrency(e.target.value)} value={toCurrency}>
          {currencies.map((currency) => (
            <OptionContainer key={currency.name} value={currency.name}>
              <Flag src={currency.flag} alt={`${currency.name} flag`} />
              {currency.name}
            </OptionContainer>
          ))}
        </SelectBox>

        {/* Input para valor a ser convertido */}
        <AmountInput
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Digite o valor"
        />

        {/* Seleção do período */}
        <SelectBox onChange={handlePeriodChange} value={selectedPeriod}>
          <OptionContainer value="6m">Últimos 6 meses</OptionContainer>
          <OptionContainer value="1y">Último 1 ano</OptionContainer>
          <OptionContainer value="5y">Últimos 5 anos</OptionContainer>
        </SelectBox>

        {/* Exibindo o valor convertido */}
        <Button onClick={convertCurrency}>Converter</Button>

        {/* Resultado da conversão */}
        <ExchangeRate>
          {amount} {fromCurrency} = {convertCurrency()} {toCurrency}
        </ExchangeRate>

        {/* Explicação do cálculo */}
        <ExplanationContainer>
          <p><strong>Como o valor foi calculado:</strong></p>
          <p>{explanationText()}</p>
        </ExplanationContainer>
        {/* Gráfico histórico */}
        <ChartContainer>
          <Line
            data={{
              labels: historicalData.map(item => item.time),
              datasets: [
                {
                  label: `Preço histórico 1 USDT em ${fromCurrency}`,
                  data: historicalData.map(item => item.price),
                  borderColor: '#4CAF50',
                  fill: false,
                  tension: 0.4,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      // Customiza a exibição da tooltip
                      return `${tooltipItem.dataset.label}: ${tooltipItem.raw} ${fromCurrency}`;
                    },
                  },
                },
              },
            }}
          />
        </ChartContainer>

        {/* Exibindo detalhes do cálculo */}
        <div style={{ marginTop: '20px', fontSize: '1.2em', color: '#333' }}>
          <h2>Detalhes do Cálculo:</h2>
          <p><strong>Valor Original:</strong> {amount} {fromCurrency}</p>
          <p><strong>Taxa de {fromCurrency} para USDT:</strong> {fromCurrencyRate ? fromCurrencyRate.toFixed(4) : 'Carregando...'}</p>
          <p><strong>Taxa de USDT para {toCurrency}:</strong> {toCurrencyRate ? toCurrencyRate.toFixed(4) : 'Carregando...'}</p>
          <p>
            <strong>Cálculo:</strong> ({amount} ÷ {fromCurrencyRate ? fromCurrencyRate.toFixed(4) : 'Carregando...'}) * {toCurrencyRate ? toCurrencyRate.toFixed(4) : 'Carregando...'} = {convertCurrency()} {toCurrency}
          </p>
          <p><i>Fonte de Taxas: CoinGecko</i></p>
        </div>
      </motion.div>
    </Container>
  );
};

export default App;

