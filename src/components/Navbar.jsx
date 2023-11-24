import React from 'react';

const Navbar = ({ data, filterInst }) => {

  const handleInstrumentChange = (instrument) => {
    filterInst({ instrument, time: '1' });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', color: 'black' }}>
      <div style={{ width: '1200px', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
            <select onChange={(e) => handleInstrumentChange(e.target.value)}>
                  <option value="">Select Instrument</option>
                  <option value="Nifty">Nifty</option>
                  <option value="Banknifty">Banknifty</option>
                  <option value="Finnifty">Finnifty</option>
            </select>
        <div className='result' style={{ display: 'flex', gap: '20px' }}>
          <p>
            Nifty:<span> {data.Nifty}</span>
          </p>
          <p>
            Banknifty: <span> {data.Banknifty}</span>
          </p>
          <p>
            Finnifty:<span> {data.Finnifty}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
