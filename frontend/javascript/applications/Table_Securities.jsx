import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Table({ apiUrl, columnHeaders, columnLinks }) {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setData(data));
  }, [apiUrl]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key: key, direction: direction });
  };

  const renderCell = (item, header) => {
    if (columnLinks.includes(header) && item[header] !== "") {
      return (
        <td key={header}>
          <a href={item[header]} target='_blank' rel='noopener noreferrer'>
            <i className="fa-solid fa-link"></i>
          </a>
        </td>
      );
    }
    return <td key={header}>{item[header]}</td>;
  };

  return (
    <div className='card p-2 text-center'>
      <div className='overflow-auto' style={{ height: '315px' }}>
        <table className="table table-sm table-striped table-hover">
          <thead className="bg-white sticky-top">
            <tr>
              {columnHeaders.map(header => (
                <th className='text-nowrap' key={header} onClick={() => handleSort(header)}>
                  {header} <i className='fa-solid fa-filter fa-2xs'></i>
                </th>
              ))}
            </tr>
          </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  {columnHeaders.map(header => (
                    renderCell(item, header)
                  ))}
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

function App() {
    const [activeTab, setActiveTab] = useState('tab1');
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    }
  
    return (
        <div className="card p-4 bg-black">

            {/* <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link a-link ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => handleTabClick('tab1')} href="#">Stocks</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link a-link ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => handleTabClick('tab2')} href="#">Commodities</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link a-link ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => handleTabClick('tab3')} href="#">FX & Rates</a>
                </li>
            </ul> */}
  
            <div className="tab-content">
                <div className={`tab-pane fade ${activeTab === 'tab1' ? 'show active' : ''}`} id="tab1">
                    <Table
                        apiUrl="/data/api/securities/stocks/"
                        columnHeaders={['Models', 'Ticker', 'Sector', 'Industry', 'Products', 'P/E', 'P/S', 'IR']}
                        columnLinks={['Models', 'IR']}
                    />
                </div>
                {/* <div className={`tab-pane fade ${activeTab === 'tab2' ? 'show active' : ''}`} id="tab2">
                    <Table
                        apiUrl="/data/api/securities/commodities/"
                        columnHeaders={['Models', 'News', 'Futures Ticker', 'Macro', 'Sector', 'Product', 'Name']}
                        columnLinks={[]}
                    />
                </div>
                <div className={`tab-pane fade ${activeTab === 'tab3' ? 'show active' : ''}`} id="tab3">
                    <Table
                        apiUrl="/data/api/securities/government/"
                        columnHeaders={['Models', 'Ticker', 'Sector', 'Industry', 'Products', 'P/E', 'P/S', 'IR']}
                        columnLinks={['Models', 'IR']}
                    />
                </div> */}
            
            </div>
            <h6 className='text-center p-1'>*** DISCLAIMER MODELS ARE FOR RESEARCH PURPOSES ONLY ***</h6>

        </div>
    );
};
  
ReactDOM.render(<App />, document.getElementById('root'));
  

ReactDOM.render(
  <Table
    apiUrl="/data/api/securities/"
    columnHeaders={['Models', 'Ticker', 'Sector', 'Industry', 'Products', 'P/E', 'P/S', 'IR']}
    columnLinks={['Models', 'IR']}
  />,
  document.getElementById('r')
);
