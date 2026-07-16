import React, { useState } from 'react';
import { useRegisterAgent } from "../../../hooks/useRegisterAgent";

const RegisterDeliveryAgent = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    vehicle_type: '',
    vehicle_number: '',
    license_number: '',
    front_image: null,
    back_image: null
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const { mutate, isPending } = useRegisterAgent();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0] 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (formData.password !== formData.password_confirmation) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('password', formData.password);
    payload.append('password_confirmation', formData.password_confirmation);
    payload.append('phone', formData.phone);
    payload.append('vehicle_type', formData.vehicle_type);
    payload.append('vehicle_number', formData.vehicle_number);
    payload.append('license_number', formData.license_number);
    
    
    if (formData.front_image) {
      payload.append('front_image', formData.front_image);
    }
    if (formData.back_image) {
      payload.append('back_image', formData.back_image);
    }

    
    mutate(payload, {
      onSuccess: (data) => {
        setMessage({ text: "Delivery Agent Registered Successfully!", type: "success" });
      },
      onError: (error) => {
        setMessage({ text: error.message || "Failed to register agent.", type: "error" });
      }
    });
  };

  const styles = {
    container: {
      width: '100%', 
      // maxWidth: '700px', 
      // margin: '40px auto',
      padding: '25px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      textAlign: 'center',
      marginBottom: '25px',
      color: '#333',
      fontSize: '24px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px'
    },
    label: {
      marginBottom: '8px',
      fontWeight: '600',
      color: '#444',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      fontSize: '15px',
      outline: 'none',
      transition: 'border-color 0.3s'
    },
    fileInput: {
      width: '100%',
      padding: '9px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      fontSize: '15px',
      backgroundColor: '#f8f9fa'
    },
    button: {
      width: '50%', 
      padding: '14px',
      margin: '20px auto 0',
      backgroundColor: isPending ? '#6c757d' : '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: isPending ? 'not-allowed' : 'pointer',
      marginTop: '15px',
      transition: 'background-color 0.3s'
    },
    message: {
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: 'bold',
      color: message.type === 'success' ? '#155724' : '#721c24',
      backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
      border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap', 
      gap: '20px'
    },
    col: {
      flex: '1 1 300px', 
      boxSizing: 'border-box'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register Delivery Agent</h2>

      {message.text && <div style={styles.message}>{message.text}</div>}

      <form onSubmit={handleSubmit}>
        
        <div style={styles.row}>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} placeholder="Enter full name" />
            </div>
          </div>

          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} placeholder="Enter email address" />
            </div>
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required style={styles.input} placeholder="Enter password" />
            </div>
          </div>

          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password:</label>
              <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required style={styles.input} placeholder="Confirm password" />
            </div>
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={styles.input} placeholder="Enter 10-digit number" />
            </div>
          </div>

          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Vehicle Type:</label>
              <select name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} style={styles.input} required>
                <option value="" disabled>Select Vehicle</option>
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="van">Van</option>
              </select>
            </div>
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Vehicle Number:</label>
              <input type="text" name="vehicle_number" value={formData.vehicle_number} onChange={handleChange} required style={styles.input} placeholder="e.g. MH12AB1234" />
            </div>
          </div>

          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>License Number:</label>
              <input type="text" name="license_number" value={formData.license_number} onChange={handleChange} required style={styles.input} placeholder="Enter driving license" />
            </div>
          </div>
        </div>

        {/* Naye Image Upload Fields */}
        <div style={styles.row}>
          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Front Image:</label>
              {/* Note: onChange me handleFileChange ka use kiya hai */}
              <input type="file" accept="image/*" name="front_image" onChange={handleFileChange} required style={styles.fileInput} />
            </div>
          </div>

          <div style={styles.col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Back Image (Optional):</label>
              <input type="file" accept="image/*" name="back_image" onChange={handleFileChange} style={styles.fileInput} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={isPending} style={styles.button}>
          {isPending ? 'Registering...' : 'Register Agent'}
        </button>

      </form>
    </div>
  );
};

export default RegisterDeliveryAgent;