import React from 'react';
import {
  Container,
  Shell,
  Header,
  HeaderInner,
  BrandRow,
  BrandLogo,
  LocationPill,
  Card,
  CardBody,
  Footer,
  FooterInner,
  HeroSection,
  HeroImage,
  HeroContent,
  HeroName,
  HeroTitle,
  HeroDescription,
  BadgeContainer,
  Badge,
  ServicesGrid,
  ServiceItem,
  ServiceEmoji,
  ServiceText,
  ServiceTitle,
  ServiceDesc,
  ContactCard,
  ContactInfo,
  ContactButton,
  InfoCard,
  InfoCardTitle,
  InfoGrid,
  InfoItem,
  InfoIcon,
  InfoContent,
  InfoLabel,
  InfoValue,
  SeoContent,
  SeoHeading,
  SeoParagraph,
  StatsRow,
  StatBox,
  StatNumber,
  StatLabel,
  CountriesGrid,
  CountryItem,
  CountryFlag,
  CountryName
} from './components/Styles';

import Logo from './assets/Logo.png';
import DonJuanImg from './assets/donjuan.png';
import Whatsapp from './components/Whatsapp';

// URLs de banderas vía CDN
const flags = {
  brasil: 'https://flagcdn.com/w320/br.png',
  bolivia: 'https://flagcdn.com/w320/bo.png',
  peru: 'https://flagcdn.com/w320/pe.png',
  argentina: 'https://flagcdn.com/w320/ar.png',
  chile: 'https://flagcdn.com/w320/cl.png',
  colombia: 'https://flagcdn.com/w320/co.png',
  venezuela: 'https://flagcdn.com/w320/ve.png',
  panama: 'https://flagcdn.com/w320/pa.png'
};

const App = () => {
  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <HeaderInner>
          <BrandRow>
            <BrandLogo src={Logo} alt="Casa de Cambio Santa Cruz - Don Juan Cambios" />
          </BrandRow>
          <LocationPill>
            <img src={flags.bolivia} alt="Bolivia" style={{ width: 14, height: 14, marginRight: 6, borderRadius: 2 }} />
            Santa Cruz - Bolivia
          </LocationPill>
        </HeaderInner>
      </Header>

      <Shell>
        {/* Hero Section - Presentación personal */}
        <HeroSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroImage 
            src={DonJuanImg} 
            alt="Don Juan - Casa de Cambio Santa Cruz Bolivia" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{ display: 'none' }}>
            <HeroImage as="div" style={{ 
              width: 100, height: 100, borderRadius: 50, 
              background: '#e6e8eb', margin: '0 auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40
            }}>
              👨
            </HeroImage>
          </div>
          
          <HeroContent>
            <HeroName>Don Juan</HeroName>
            <HeroTitle>Tu Casa de Cambio de Confianza en Santa Cruz, Bolivia</HeroTitle>
            <HeroDescription>
              Especialista en <strong>cambio de divisas BRL/BOB</strong> y <strong>remesas internacionales</strong> entre Brasil y Bolivia. También realizamos operaciones con Perú, Argentina, Chile, Colombia, Venezuela y Panamá. Atención personalizada, trato directo y las mejores tasas del mercado. Sin intermediarios, sin comisiones ocultas.
            </HeroDescription>
            
            <BadgeContainer>
              <Badge>
                <img src={flags.brasil} alt="Brasil" style={{ width: 18, height: 18, borderRadius: 12, marginRight: 6 }} />
                Real Brasileño (BRL)
              </Badge>
              <Badge>
                <img src={flags.bolivia} alt="Bolivia" style={{ width: 18, height: 18, borderRadius: 12, marginRight: 6 }} />
                Boliviano (BOB)
              </Badge>
              <Badge>⭐ Mejor Tasa Garantizada</Badge>
            </BadgeContainer>
          </HeroContent>
        </HeroSection>

        {/* Stats de confianza */}
        <StatsRow>
          <StatBox>
            <StatNumber>105</StatNumber>
            <StatLabel>Clientes Satisfechos</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>2+</StatNumber>
            <StatLabel>Años de Experiencia</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Atención WhatsApp</StatLabel>
          </StatBox>
        </StatsRow>

        {/* Servicios principales */}
        <Card style={{ marginTop: 24 }}>
          <CardBody>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 950, marginBottom: 8 }}>
                Servicios de Cambio en Santa Cruz
              </div>
              <div style={{ fontSize: 13, color: '#5a6472' }}>
                Soluciones financieras con trato personal y las mejores tasas
              </div>
            </div>

            <ServicesGrid>
              <ServiceItem>
                <ServiceEmoji>💵</ServiceEmoji>
                <ServiceText>
                  <ServiceTitle>Casa de Cambio Santa Cruz</ServiceTitle>
                  <ServiceDesc>Cambio de Real Brasileño (BRL) a Boliviano (BOB) y viceversa. Atención presencial en el centro de Santa Cruz con la mejor cotización del mercado. Nuestro principal servicio es el corredor cambiario Brasil - Bolivia.</ServiceDesc>
                </ServiceText>
              </ServiceItem>

              <ServiceItem>
                <ServiceEmoji>🌎</ServiceEmoji>
                <ServiceText>
                  <ServiceTitle>Remesas Internacionales</ServiceTitle>
                  <ServiceDesc>Envío y recepción de dinero entre Bolivia y países como Brasil, Perú, Argentina, Chile, Colombia, Venezuela y Panamá. Transferencias rápidas, seguras y con las tasas más competitivas. Especialista en el corredor Brasil - Bolivia.</ServiceDesc>
                </ServiceText>
              </ServiceItem>

              <ServiceItem>
                <ServiceEmoji>🤝</ServiceEmoji>
                <ServiceText>
                  <ServiceTitle>Trato Directo y Personalizado</ServiceTitle>
                  <ServiceDesc>Negociamos juntos cada operación. No soy un algoritmo — soy Don Juan, quien personalmente gestiona tu cambio con total transparencia y honestidad. Cada cliente recibe atención exclusiva.</ServiceDesc>
                </ServiceText>
              </ServiceItem>

              <ServiceItem>
                <ServiceEmoji>🏠</ServiceEmoji>
                <ServiceText>
                  <ServiceTitle>Servicio a Domicilio en Santa Cruz</ServiceTitle>
                  <ServiceDesc>¿Estás en Santa Cruz de la Sierra? Me acerco a tu oficina, negocio o domicilio para facilitar tu operación de cambio. Comodidad y seguridad garantizadas para todos mis clientes.</ServiceDesc>
                </ServiceText>
              </ServiceItem>

              <ServiceItem>
                <ServiceEmoji>💼</ServiceEmoji>
                <ServiceText>
                  <ServiceTitle>Cambio para Empresas y Negocios</ServiceTitle>
                  <ServiceDesc>Soluciones personalizadas para empresas que operan entre Bolivia y el extranjero. Tasas preferenciales por volumen y atención prioritaria para tus operaciones comerciales internacionales.</ServiceDesc>
                </ServiceText>
              </ServiceItem>

              <ServiceItem>
                <ServiceEmoji>⚡</ServiceEmoji>
                <ServiceText>
                  <ServiceTitle>Transferencias Rápidas Internacionales</ServiceTitle>
                  <ServiceDesc>Envíos de dinero en el día hacia Brasil, Perú, Argentina, Chile, Colombia, Venezuela y Panamá. Eficiencia y seguridad para tus remesas internacionales desde Santa Cruz.</ServiceDesc>
                </ServiceText>
              </ServiceItem>
            </ServicesGrid>
          </CardBody>
        </Card>

        {/* Países con los que trabajamos */}
        <div style={{ marginTop: 32 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 950 }}>🌎 Cobertura Internacional</div>
            <div style={{ fontSize: 12, color: '#5a6472', marginTop: 4 }}>
              Realizamos operaciones con los siguientes países
            </div>
          </div>

          <CountriesGrid>
            <CountryItem>
              <CountryFlag src={flags.brasil} alt="Brasil" />
              <CountryName>Brasil</CountryName>
              <div style={{ fontSize: 11, color: '#0a7a4b', fontWeight: 600 }}>BRL • Principal</div>
            </CountryItem>
            <CountryItem>
              <CountryFlag src={flags.bolivia} alt="Bolivia" />
              <CountryName>Bolivia</CountryName>
              <div style={{ fontSize: 11, color: '#0a7a4b', fontWeight: 600 }}>BOB • Principal</div>
            </CountryItem>
            <CountryItem>
              <CountryFlag src={flags.peru} alt="Perú" />
              <CountryName>Perú</CountryName>
              <div style={{ fontSize: 11, color: '#5a6472' }}>PEN • Disponible</div>
            </CountryItem>
            <CountryItem>
              <CountryFlag src={flags.argentina} alt="Argentina" />
              <CountryName>Argentina</CountryName>
              <div style={{ fontSize: 11, color: '#5a6472' }}>ARS • Disponible</div>
            </CountryItem>
            <CountryItem>
              <CountryFlag src={flags.chile} alt="Chile" />
              <CountryName>Chile</CountryName>
              <div style={{ fontSize: 11, color: '#5a6472' }}>CLP • Disponible</div>
            </CountryItem>
            <CountryItem>
              <CountryFlag src={flags.colombia} alt="Colombia" />
              <CountryName>Colombia</CountryName>
              <div style={{ fontSize: 11, color: '#5a6472' }}>COP • Disponible</div>
            </CountryItem>
            <CountryItem>
              <CountryFlag src={flags.venezuela} alt="Venezuela" />
              <CountryName>Venezuela</CountryName>
              <div style={{ fontSize: 11, color: '#5a6472' }}>VES • Disponible</div>
            </CountryItem>
            <CountryItem>
              <CountryFlag src={flags.panama} alt="Panamá" />
              <CountryName>Panamá</CountryName>
              <div style={{ fontSize: 11, color: '#5a6472' }}>USD • Disponible</div>
            </CountryItem>
          </CountriesGrid>
        </div>

        {/* Contacto destacado con WhatsApp */}
        <ContactCard style={{ marginTop: 32 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 20, fontWeight: 950, marginBottom: 6 }}>
              📞 ¿Necesitas Cambiar Dinero?
            </div>
            <div style={{ fontSize: 13, color: '#5a6472' }}>
              Prefiero el trato personal. Escríbeme o llámame para obtener la mejor tasa.
            </div>
          </div>

          <ContactInfo>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#fff', borderRadius: 12 }}>
              <span style={{ fontSize: 24 }}>📱</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>+591 78365424</div>
                <div style={{ fontSize: 11, color: '#8a93a3' }}>WhatsApp • Llamadas • Atención 24/7</div>
              </div>
            </div>

            <ContactButton
              href="https://wa.me/59178365424"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              💬 Contactar por WhatsApp
            </ContactButton>
          </ContactInfo>
        </ContactCard>

        {/* Información de Contacto Detallada - Mejorada visualmente */}
        <InfoCard>
          <InfoCardTitle>📍 Información de Contacto</InfoCardTitle>
          
          <InfoGrid>
            <InfoItem>
              <InfoIcon>📍</InfoIcon>
              <InfoContent>
                <InfoLabel>Dirección</InfoLabel>
                <InfoValue>8R3W+J88, Santa Cruz de la Sierra, Bolivia</InfoValue>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>📞</InfoIcon>
              <InfoContent>
                <InfoLabel>Teléfono / WhatsApp</InfoLabel>
                <InfoValue>+591 78365424</InfoValue>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>⏰</InfoIcon>
              <InfoContent>
                <InfoLabel>Horario de atención</InfoLabel>
                <InfoValue>Lunes a Viernes 8:00–20:00 • Sábados 8:00–20:00</InfoValue>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>💬</InfoIcon>
              <InfoContent>
                <InfoLabel>Atención WhatsApp</InfoLabel>
                <InfoValue>Disponible 24/7 para consultas urgentes</InfoValue>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>🏠</InfoIcon>
              <InfoContent>
                <InfoLabel>Servicio a domicilio</InfoLabel>
                <InfoValue>Previa coordinación en toda Santa Cruz</InfoValue>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>🌎</InfoIcon>
              <InfoContent>
                <InfoLabel>Cobertura internacional</InfoLabel>
                <InfoValue>Brasil, Perú, Argentina, Chile, Colombia, Venezuela, Panamá</InfoValue>
              </InfoContent>
            </InfoItem>
          </InfoGrid>
        </InfoCard>

        {/* SEO Content */}
        <SeoContent>
          <SeoHeading>Casa de Cambio en Santa Cruz, Bolivia | Don Juan Cambios</SeoHeading>
          
          <SeoParagraph>
            ¿Buscas una <strong>casa de cambio en Santa Cruz, Bolivia</strong> confiable y con atención personalizada? 
            Don Juan es el especialista en <strong>cambio de divisas</strong> y <strong>remesas internacionales</strong> 
            con más de 15 años de experiencia en el mercado cruceño. Mi principal especialidad es el 
            <strong> cambio BRL/BOB</strong> entre Brasil y Bolivia, pero también realizo operaciones con Perú, 
            Argentina, Chile, Colombia, Venezuela y Panamá.
          </SeoParagraph>
          
          <SeoParagraph>
            Ofrezco el mejor servicio de <strong>cambio de Real Brasileño a Boliviano</strong> con las 
            tasas más competitivas de Santa Cruz. Sin comisiones ocultas, sin intermediarios, solo trato directo 
            y honesto. Ya sea que necesites cambiar dinero para viajes, negocios, envíos familiares o 
            transferencias comerciales internacionales, cuentas con un aliado de confianza que te atiende personalmente.
          </SeoParagraph>

          <SeoHeading>Remesas Internacionales desde Bolivia</SeoHeading>
          <SeoParagraph>
            Como especialista en <strong>remesas internacionales</strong>, realizo envíos de dinero rápidos y seguros 
            desde Santa Cruz hacia Brasil (mi especialidad), así como también hacia Perú, Argentina, Chile, Colombia, 
            Venezuela y Panamá. También recibo remesas desde estos países hacia Bolivia. Proceso ágil, 
            tasas preferenciales y atención personalizada para cada cliente. Mi foco principal es el corredor 
            Brasil - Bolivia, ofreciendo las mejores tasas del mercado para el cambio BRL/BOB.
          </SeoParagraph>

          <SeoHeading>¿Por qué elegir mi casa de cambio en Santa Cruz?</SeoHeading>
          <SeoParagraph>
            Con más de 15 años de experiencia, me diferencio por ofrecer trato directo y personalizado, 
            las mejores tasas de cambio para BRL/BOB, cero comisiones ocultas, servicio a domicilio en toda 
            Santa Cruz y atención rápida por WhatsApp. Cada operación es gestionada personalmente por mí, 
            Don Juan, garantizando transparencia y honestidad en cada transacción.
          </SeoParagraph>
        </SeoContent>
      </Shell>

      <Whatsapp />

      <Footer>
        <FooterInner>
          <div style={{ fontSize: 11, color: '#8a93a3' }}>
            © {new Date().getFullYear()} Don Juan Cambios - Casa de Cambio Santa Cruz, Bolivia
          </div>
        </FooterInner>
      </Footer>
    </Container>
  );
};

export default App;
