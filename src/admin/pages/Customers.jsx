import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useAllCustomer } from "../../hooks/useAllCustomer";

const Customers = () => {
  const { data: customers = [], isLoading, error } = useAllCustomer();
  const [filterText, setFilterText] = useState('');

  const filteredItems = useMemo(() => {
    return customers.filter((item) => 
      item.name?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [customers, filterText]);

  const columns = [
    { name: 'Name', selector: row => row.name || "Unknown", sortable: true },
    { name: 'Phone', selector: row => row.phone || 'N/A' },
    { 
      name: 'Address', 
      selector: row => row.addresses?.[0] ? `${row.addresses[0].address_line1}, ${row.addresses[0].city}` : 'N/A',
      wrap: true 
    },
    { 
      name: 'Status', 
      cell: row => (
        <span style={{ 
          padding: '4px 10px', 
          borderRadius: '20px', 
          fontSize: '0.75rem',
          fontWeight: '600',
          backgroundColor: row.status === 'active' ? '#dcfce7' : '#fee2e2',
          color: row.status === 'active' ? '#166534' : '#991b1b'
        }}>
          {row.status?.toUpperCase() || 'N/A'}
        </span>
      ),
    },
  ];

  if (error) return <div className="error-msg">Error: {error.message}</div>;

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>All Customers</h1>
        
        <input
          type="text"
          placeholder="Search customers..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ 
            padding: '8px 16px', 
            borderRadius: '6px', 
            border: '1px solid #d1d5db',
            width: '300px'
          }}
        />
      </div>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          paginationPerPage={10}
          progressPending={isLoading}
          highlightOnHover
          responsive
          striped
          customStyles={{
            headCells: { style: { backgroundColor: '#f3f4f6', fontWeight: 'bold' } }
          }}
        />
      </div>
    </div>
  );
};

export default Customers;