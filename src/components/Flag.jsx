import React from 'react';
import Select from 'react-select';
import Brasil from '../assets/Brasil.jpg';
import Bolivia from '../assets/Bolivia.png';
import { motion } from 'framer-motion';

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    color: '#fff',
    minHeight: '45px'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#334155' : '#1e293b',
    color: '#fff',
    display: 'flex',
    alignItems: 'center'
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    color: '#fff'
  })
};

const options = [
  {
    value: 'BRL',
    label: (
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <img src={Brasil} alt="Brasil" style={{ width: '25px', marginRight: '8px' }} />
        BRL (Real)
      </motion.div>
    )
  },
  {
    value: 'BOB',
    label: (
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <img src={Bolivia} alt="Bolívia" style={{ width: '25px', marginRight: '8px' }} />
        BOB (Boliviano)
      </motion.div>
    )
  }
];

const CurrencySelect = ({ value, onChange }) => {
  const selected = options.find((opt) => opt.value === value);

  return (
    <Select
      styles={customStyles}
      options={options}
      value={selected}
      onChange={(selectedOption) => onChange(selectedOption.value)}
      isSearchable={false}
    />
  );
};

export default CurrencySelect;
