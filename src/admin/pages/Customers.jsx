import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useAllCustomer } from "../../hooks/useAllCustomer";

const Customers = () => {
  const { data: response, isLoading, error } = useAllCustomer();
  const [filterText, setFilterText] = useState('');

  // Safely extract the customer array whether response is direct array or paginated object
  const customers = useMemo(() => {
    if (Array.isArray(response)) return response;
    if (response && Array.isArray(response.data)) return response.data;
    return [];
  }, [response]);

  // Expanded global search logic checking user & address fields
  const filteredItems = useMemo(() => {
    return customers.filter((item) => {
      const searchStr = filterText.toLowerCase();
      const phone = item.phone?.toLowerCase() || '';
      const addressObj = item.addresses?.[0] || {};
      
      const customerName = (item.name || addressObj.name || '').toLowerCase();
      const addressLine = (addressObj.address_line1 || '').toLowerCase();
      const city = (addressObj.city || '').toLowerCase();
      const status = (item.status || '').toLowerCase();

      return (
        customerName.includes(searchStr) ||
        phone.includes(searchStr) ||
        addressLine.includes(searchStr) ||
        city.includes(searchStr) ||
        status.includes(searchStr)
      );
    });
  }, [customers, filterText]);

  const columns = [
    { 
      name: 'Name', 
      selector: row => row.name || row.addresses?.[0]?.name || "Unknown", 
      sortable: true,
      grow: 1,
      minWidth: '150px'
    },
    { 
      name: 'Phone', 
      selector: row => row.phone || row.addresses?.[0]?.phone || 'N/A',
      grow: 1,
      minWidth: '130px'
    },
    { 
      name: 'Address', 
      selector: row => {
        const addr = row.addresses?.[0];
        return addr ? `${addr.address_line1}, ${addr.city}` : 'N/A';
      },
      wrap: true,
      grow: 2,
      minWidth: '220px'
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
          color: row.status === 'active' ? '#166534' : '#991b1b',
          display: 'inline-block',
          textAlign: 'center'
        }}>
          {row.status?.toUpperCase() || 'N/A'}
        </span>
      ),
      grow: 1,
      minWidth: '100px'
    },
  ];

  if (error) return <div style={{ padding: '20px', color: '#991b1b' }}>Error: {error.message}</div>;

  return (
    <div style={{ 
      padding: 'clamp(12px, 3vw, 24px)', 
      backgroundColor: '#f9fafb', 
      borderRadius: '8px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Header & Search Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <h1 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 'bold', margin: 0 }}>
          All Customers ({filteredItems.length})
        </h1>
        
        <input
          type="text"
          placeholder="Search by name, phone, city, status..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ 
            padding: '8px 16px', 
            borderRadius: '6px', 
            border: '1px solid #d1d5db',
            width: '100%',
            maxWidth: '300px',
            outline: 'none',
            fontSize: '0.9rem',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Responsive DataTable Container */}
      <div style={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 25, 50]}
          progressPending={isLoading}
          highlightOnHover
          responsive
          striped
          noDataComponent={
            <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
              No customer records found.
            </div>
          }
          customStyles={{
            headCells: { 
              style: { 
                backgroundColor: '#f3f4f6', 
                fontWeight: 'bold',
                fontSize: '0.85rem'
              } 
            },
            cells: {
              style: {
                fontSize: '0.85rem',
                paddingTop: '10px',
                paddingBottom: '10px'
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Customers;