import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  img {
    max-width: 300px;
    width: 100%;
    height: auto;
  }

  h1 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  p {
    color: #7f8c8d;
  }
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: end;
  margin-bottom: 2rem;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "from"
      "swap"
      "to";
  }
`;


export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2c3e50;
  }

  &:first-child {
    @media (max-width: 768px) {
      grid-area: from;
    }
  }

  &:last-child {
    @media (max-width: 768px) {
      grid-area: to;
    }
  }
`;


export const CurrencySelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

export const SwapButton = styled(motion.button)`
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

  @media (max-width: 768px) {
    grid-area: swap;
    margin: 0 auto;
  }
`;


export const ConvertButton = styled(motion.button)`
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

export const ErrorBox = styled(motion.div)`
  padding: 1rem;
  background: #e74c3c;
  color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

export const ResultContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
`;

export const FinalResult = styled.div`
  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
`;

export const Amount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #27ae60;
  margin: 1rem 0;

  img {
    vertical-align: middle;
    width: 24px;
    height: auto;
  }
`;
