import React, { useState } from 'react';
import { useRegisterAgent } from "../../../hooks/useRegisterAgent";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Added missing import

const RegisterDeliveryAgent = () => {
  const navigate = useNavigate();
  
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
    // wrapper: {
    //   width: '100%',
    //   minHeight: '100vh',
    //   backgroundColor: '#f4f6f8',
    //   padding: '20px',
    //   boxSizing: 'border-box',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'flex-start'
    // },
    container: {
      width: '100%', 
      // maxWidth: '100%', 
      margin: '20px auto',
      padding: '25px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    },
    headerWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      gap: '15px'
    },
    backButton: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      backgroundColor: '#f1f3f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.2s'
    },
    title: {
      margin: 0,
      color: '#333',
      fontSize: '22px',
      flexGrow: 1,
      textAlign: 'center'
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
      transition: 'border-color 0.3s',
      backgroundColor: '#fff'
    },
    fileInput: {
      width: '100%',
      padding: '9px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      fontSize: '14px',
      backgroundColor: '#f8f9fa'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    },
    button: {
      width: '100%', 
      maxWidth: '300px',
      padding: '14px',
      backgroundColor: isPending ? '#EF4444' : '#EF4444',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
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
      gap: '15px'
    },
    col: {
      flex: '1 1 280px', 
      boxSizing: 'border-box'
    }
  };

  return (
    // <div style={styles.wrapper}>
      <div style={styles.container}>
        
        <div style={styles.headerWrapper}>
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            style={styles.backButton}
            title="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 style={styles.title}>Register Delivery Agent</h2>
        </div>

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
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={styles.input} placeholder="Enter 10-digit number" maxLength={10} />
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

          <div style={styles.row}>
            <div style={styles.col}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Front Image:</label>
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

          <div style={styles.buttonContainer}>
            <button type="submit" disabled={isPending} style={styles.button}>
              {isPending ? 'Registering...' : 'Register Agent'}
            </button>
          </div>

        </form>
      </div>
    // </div>
  );
};

export default RegisterDeliveryAgent;