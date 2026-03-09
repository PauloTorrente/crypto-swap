import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  --bg: #ffffff;
  --surface: #ffffff;
  --surface-2: #f6f7f9;
  --border: #e6e8eb;
  --text: #0b0f19;
  --muted: #5a6472;
  --subtle: #8a93a3;
  --success: #0a7a4b;
  --danger: #c62828;
  --shadow: 0 10px 30px rgba(11, 15, 25, 0.06);
  --shadow-soft: 0 2px 10px rgba(11, 15, 25, 0.06);
  --radius: 16px;
  --radius-sm: 12px;
  --focus: 0 0 0 4px rgba(30, 110, 255, 0.12);
  --cta: #0b0f19;
  --cta-hover: #1f2937;
  --cta-disabled: #c9cdd4;

  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
`;

export const Shell = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 16px 16px 140px;
  
  @media (min-width: 480px) {
    max-width: 480px;
    padding: 20px 16px 140px;
  }
`;

export const Header = styled(motion.header)`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 1px 0 rgba(11, 15, 25, 0.04);
`;

export const HeaderInner = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (min-width: 480px) {
    max-width: 480px;
    padding: 16px 16px;
  }
`;

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const BrandLogo = styled.img`
  height: 32px;
  width: auto;
  display: block;
  object-fit: contain;
  
  @media (min-width: 480px) {
    height: 34px;
  }
`;

export const LocationPill = styled.div`
  font-size: 11px;
  color: var(--muted);
  font-weight: 800;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  
  @media (min-width: 480px) {
    font-size: 12px;
    padding: 8px 14px;
  }
`;

export const TitleBlock = styled.div`
  padding: 24px 0 20px;
  text-align: center;
  
  @media (min-width: 480px) {
    padding: 28px 0 24px;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: 950;
  color: var(--text);
  
  @media (min-width: 480px) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  margin: 8px auto 0;
  font-size: 14px;
  color: var(--muted);
  line-height: 1.4;
  font-weight: 500;
  max-width: 280px;
  
  @media (min-width: 480px) {
    font-size: 15px;
    max-width: 320px;
  }
`;

export const Card = styled(motion.div)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:active {
    transform: scale(0.995);
  }
`;

export const CardBody = styled.div`
  padding: 18px;
  
  @media (min-width: 480px) {
    padding: 20px;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: var(--border);
  margin: 0;
`;

export const ErrorBox = styled(motion.div)`
  margin-top: 16px;
  border: 1px solid rgba(198, 40, 40, 0.25);
  background: rgba(198, 40, 40, 0.06);
  color: var(--danger);
  border-radius: 12px;
  padding: 14px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.4;
  
  @media (min-width: 480px) {
    font-size: 14px;
    padding: 16px;
  }
`;

export const ResultContainer = styled(motion.div)`
  margin-top: 20px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface-2);
  padding: 18px;
  box-shadow: 0 4px 20px rgba(11, 15, 25, 0.05);
  
  @media (min-width: 480px) {
    padding: 20px;
  }
`;

export const ResultTopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
`;

export const ResultSide = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const ResultMeta = styled.div`
  display: grid;
  gap: 4px;

  .label {
    font-size: 13px;
    color: var(--subtle);
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  .code {
    font-size: 15px;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: var(--text);
  }
`;

export const Arrow = styled.div`
  font-size: 14px;
  color: var(--subtle);
  font-weight: 900;
  padding: 0 4px;
`;

export const FinalResult = styled.div`
  text-align: center;
  margin-top: 16px;
`;

export const Amount = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 8px;

  .from {
    font-size: 15px;
    color: var(--muted);
    font-weight: 700;
    opacity: 0.9;
  }

  .to {
    font-size: 32px;
    font-weight: 950;
    letter-spacing: -0.02em;
    color: var(--success);
    line-height: 1.1;
    
    @media (min-width: 480px) {
      font-size: 36px;
    }
  }
`;

export const Note = styled.div`
  margin-top: 16px;
  font-size: 13px;
  color: var(--muted);
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  text-align: center;
  font-weight: 500;
  line-height: 1.4;
`;

export const Footer = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid var(--border);
  z-index: 90;
  box-shadow: 0 -2px 10px rgba(11, 15, 25, 0.04);
`;

export const FooterInner = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--subtle);
  font-size: 12px;
  font-weight: 600;
  
  @media (min-width: 480px) {
    max-width: 480px;
    padding: 16px;
  }
`;

/* FORM STYLES */
export const FormContainer = styled.div`
  display: grid;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: grid;
  gap: 10px;

  label {
    font-size: 14px;
    color: var(--muted);
    font-weight: 700;
    letter-spacing: 0.01em;
  }
`;

export const Field = styled.div`
  border: 1px solid var(--border);
  background: #fff;
  border-radius: 14px;
  padding: 16px;
  display: grid;
  gap: 12px;
  transition: all 0.2s ease;

  &:focus-within {
    box-shadow: var(--focus);
    border-color: rgba(30, 110, 255, 0.35);
  }
  
  @media (min-width: 480px) {
    padding: 18px;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  font-size: 30px;
  font-weight: 950;
  letter-spacing: -0.02em;
  padding: 0;
  color: var(--text);
  caret-color: #1e6eff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::placeholder {
    color: #c2c8d3;
    font-weight: 900;
    opacity: 0.7;
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  @media (min-width: 480px) {
    font-size: 32px;
  }
`;

export const SwapButton = styled(motion.button)`
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
  border-radius: 14px;
  padding: 12px 14px;
  font-weight: 950;
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 16px;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;

  &:active {
    background: var(--surface-2);
    transform: scale(0.97);
  }
  
  @media (min-width: 480px) {
    padding: 12px 16px;
    font-size: 17px;
  }
`;

export const ConvertButton = styled(motion.button)`
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 18px 16px;
  font-weight: 950;
  font-size: 16px;
  cursor: pointer;
  background: var(--cta);
  color: #fff;
  transition: all 0.2s ease;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    cursor: not-allowed;
    background: var(--cta-disabled);
    color: #fff;
    opacity: 0.7;
  }

  &:not(:disabled):active {
    transform: scale(0.98);
  }
  
  @media (min-width: 480px) {
    font-size: 17px;
    padding: 18px 20px;
    border-radius: 16px;
  }
`;
