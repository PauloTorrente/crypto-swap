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

  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  width: 100%;
  position: relative;
`;

export const Shell = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 16px 20px 120px;
  box-sizing: border-box;
  overflow-x: hidden;
  
  @media (min-width: 480px) {
    max-width: 480px;
    padding: 20px 20px 120px;
  }
  
  @media (min-width: 768px) {
    max-width: 600px;
  }
`;

export const Header = styled(motion.header)`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  width: 100%;
  overflow-x: hidden;
`;

export const HeaderInner = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  
  @media (min-width: 480px) {
    max-width: 480px;
    padding: 14px 20px;
  }
  
  @media (min-width: 768px) {
    max-width: 600px;
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
`;

export const LocationPill = styled.div`
  font-size: 12px;
  color: var(--muted);
  font-weight: 700;
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: white;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const Card = styled(motion.div)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(11, 15, 25, 0.05);
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
`;

export const CardBody = styled.div`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const Footer = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border);
  z-index: 90;
  width: 100%;
`;

export const FooterInner = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  
  @media (min-width: 480px) {
    max-width: 480px;
  }
  
  @media (min-width: 768px) {
    max-width: 600px;
  }
`;

// Hero Section Components
export const HeroSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 24px;
  width: 100%;
`;

export const HeroImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  margin-bottom: 16px;
`;

export const HeroContent = styled.div`
  padding: 0;
  width: 100%;
`;

export const HeroName = styled.h1`
  font-size: 28px;
  font-weight: 950;
  letter-spacing: -0.02em;
  margin: 0 0 6px;
  color: #0b0f19;
  word-break: keep-all;
`;

export const HeroTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #0a7a4b;
  margin: 0 0 12px;
`;

export const HeroDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #5a6472;
  margin: 0 0 16px;
  padding: 0;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #f0fdf4;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 600;
  color: #0a7a4b;
  gap: 4px;
  white-space: nowrap;
  
  @media (max-width: 480px) {
    white-space: normal;
    font-size: 11px;
  }
`;

// Stats Components
export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
`;

export const StatBox = styled.div`
  text-align: center;
  padding: 14px 8px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e6e8eb;
`;

export const StatNumber = styled.div`
  font-size: 22px;
  font-weight: 950;
  color: #0a7a4b;
`;

export const StatLabel = styled.div`
  font-size: 11px;
  color: #5a6472;
  font-weight: 600;
  margin-top: 4px;
`;

// Services Components
export const ServicesGrid = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
`;

export const ServiceItem = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 4px 0;
  width: 100%;
`;

export const ServiceEmoji = styled.div`
  font-size: 28px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f7f9;
  border-radius: 14px;
  flex-shrink: 0;
`;

export const ServiceText = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ServiceTitle = styled.div`
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 4px;
  color: #0b0f19;
`;

export const ServiceDesc = styled.div`
  font-size: 13px;
  color: #5a6472;
  line-height: 1.4;
  word-wrap: break-word;
`;

// Contact Components
export const ContactCard = styled.div`
  border-radius: 24px;
  background: #fef9e3;
  padding: 20px;
  border: 1px solid #e6e8eb;
  width: 100%;
  box-sizing: border-box;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const ContactButton = styled(motion.a)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #25D366;
  color: #fff;
  font-weight: 800;
  border-radius: 40px;
  padding: 14px 20px;
  font-size: 15px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;

// SEO Components
export const SeoContent = styled.div`
  margin-top: 32px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 20px;
  border: 1px solid #e6e8eb;
  width: 100%;
  box-sizing: border-box;
`;

export const SeoHeading = styled.h2`
  font-size: 18px;
  font-weight: 950;
  margin: 0 0 12px;
  color: #0b0f19;
  word-wrap: break-word;
`;

export const SeoParagraph = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: #5a6472;
  margin-bottom: 12px;
  word-wrap: break-word;
  
  strong {
    color: #0b0f19;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// Countries Components
export const CountriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
  width: 100%;
  
  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const CountryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px;
  background: #fff;
  border: 1px solid #e6e8eb;
  border-radius: 16px;
  transition: all 0.2s ease;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(11,15,25,0.08);
    border-color: #0a7a4b;
  }
`;

export const CountryFlag = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid #e6e8eb;
`;

export const CountryName = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #0b0f19;
  margin-bottom: 4px;
`;

export const InfoCard = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  padding: 24px;
  background: #fff;
  border-radius: 24px;
  border: 1px solid #e6e8eb;
  box-shadow: 0 2px 12px rgba(11, 15, 25, 0.05);
  width: 100%;
  box-sizing: border-box;
`;

export const InfoCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 950;
  margin: 0 0 20px 0;
  color: #0b0f19;
  text-align: center;
`;

export const InfoGrid = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f0f1f3;
    transform: translateX(4px);
  }
`;

export const InfoIcon = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

export const InfoContent = styled.div`
  flex: 1;
`;

export const InfoLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #5a6472;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0b0f19;
  line-height: 1.4;
`;
