import React from 'react';
import { motion } from 'framer-motion';
import {
  FormContainer,
  InputGroup,
  Input,
  SwapButton,
  ConvertButton
} from './Styles';
import CurrencySelect from './Flag';

const CurrencyForm = ({
  fromCurrency,
  toCurrency,
  amount,
  setFromCurrency,
  setToCurrency,
  setAmount,
  onConvert,
  onSwap,
  loading
}) => {
  return (
    <FormContainer>
      <InputGroup>
        <label>De:</label>
        <CurrencySelect value={fromCurrency} onChange={setFromCurrency} />
      </InputGroup>

      <SwapButton
        onClick={onSwap}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ⇄
      </SwapButton>

      <InputGroup>
        <label>Para:</label>
        <CurrencySelect value={toCurrency} onChange={setToCurrency} />
      </InputGroup>

      <InputGroup>
        <label>Valor:</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          placeholder="Digite o valor"
        />
      </InputGroup>

      <ConvertButton
        onClick={onConvert}
        disabled={loading || !amount}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? 'Convertendo...' : 'Converter'}
      </ConvertButton>
    </FormContainer>
  );
};

export default CurrencyForm;

