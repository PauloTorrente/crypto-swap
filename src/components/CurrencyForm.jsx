import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FormContainer,
  InputGroup,
  Field,
  Row,
  Input,
  SwapButton,
  ConvertButton
} from './Styles';
import CurrencySelect from './Flag';

function normalizeAmountInput(value) {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) return '';
  const cleaned = trimmed.replace(/[^\d.,]/g, '');

  const hasComma = cleaned.includes(',');
  const hasDot = cleaned.includes('.');

  if (hasComma && hasDot) {
    // 1.234,56 -> 1234.56
    return cleaned.replace(/\./g, '').replace(',', '.');
  }
  if (hasComma && !hasDot) {
    // 123,45 -> 123.45
    return cleaned.replace(',', '.');
  }
  return cleaned;
}

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
  const parsedAmount = useMemo(() => {
    const n = parseFloat(normalizeAmountInput(amount));
    return Number.isFinite(n) ? n : NaN;
  }, [amount]);

  const canConvert = !loading && Number.isFinite(parsedAmount) && parsedAmount > 0;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canConvert) {
      e.preventDefault();
      onConvert();
    }
  };

  return (
    <FormContainer>
      <InputGroup>
        <label>Você envia</label>
        <Field>
          <Row>
            <CurrencySelect value={fromCurrency} onChange={setFromCurrency} />
            <SwapButton
              onClick={onSwap}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              aria-label="Inverter moedas"
              title="Inverter moedas"
            >
              ⇅
            </SwapButton>
          </Row>

          <Input
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="0"
            aria-label="Valor para converter"
          />
        </Field>
      </InputGroup>

      <InputGroup>
        <label>Você recebe</label>
        <Field>
          <Row>
            <CurrencySelect value={toCurrency} onChange={setToCurrency} />
            <div style={{ fontSize: 12, fontWeight: 900, color: '#8a93a3' }}>
              taxa real
            </div>
          </Row>

          <Input
            value=""
            placeholder="Resultado"
            readOnly
            aria-label="Resultado calculado"
          />
        </Field>
      </InputGroup>

      <ConvertButton
        onClick={onConvert}
        disabled={!canConvert}
        whileHover={!canConvert ? {} : { scale: 1.01, background: '#1f2937' }}
        whileTap={!canConvert ? {} : { scale: 0.99 }}
        type="button"
      >
        {loading ? 'Calculando…' : 'Calcular'}
      </ConvertButton>
    </FormContainer>
  );
};

export default CurrencyForm;
export { normalizeAmountInput };
