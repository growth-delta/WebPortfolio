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
    <div className='card p-2'>
      <div className='overflow-auto' style={{ height: '315px' }}>
        <table className="table table-sm table-striped table-hover">
          <thead className="bg-white sticky-top">
            <tr>
              {columnHeaders.map(header => (
                <th className='text-nowrap' key={header} onClick={() => handleSort(header)}>
                  {header} <i className="fa-solid fa-filter fa-2xs"></i>
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

ReactDOM.render(
  <Table
    apiUrl="/data/api/ai/product/"
    columnHeaders={['Owner', 'Value', 'Products', 'Documentation']}
    columnLinks={['Products', 'Documentation']}
  />,
  document.getElementById('root')
);
