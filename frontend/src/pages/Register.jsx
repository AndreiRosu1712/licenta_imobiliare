import React, { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Link,
  InputAdornment,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Email, Lock } from "@mui/icons-material";
import axios from "axios";

// IMPORTĂ IMAGINEA
import backgroundImage from "../assets/images/luxury-apartment.jpg";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      alert("Cont creat cu succes");
    } catch {
      alert("Eroare la creare cont");
    }
  };

  return (
    <Box sx={{ 
      height: "100vh", // Fixat la înălțimea viewport-ului
      width: "100vw",
      display: "grid", 
      placeItems: "center", 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden', // Previne scroll-ul nedorit
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Overlay */}
      <Box sx={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundColor: 'rgba(0,0,0,0.35)', 
        backdropFilter: 'blur(2px)',
        zIndex: 0
      }} />

      <Paper sx={{ 
        width: { xs: '92%', sm: 560 },
        maxHeight: '95vh', // Se asigură că încape pe ecrane mici
        p: { xs: 3, sm: 5 }, 
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(30px) saturate(160%)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        zIndex: 1,
        textAlign: 'center',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5 // Spațiere compactă
      }}>
        
        <Box>
          <Typography variant="h3" sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            mb: 0.5,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            letterSpacing: '-0.02em',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Creează Cont
          </Typography>

          <Typography variant="body2" sx={{ mb: 2, opacity: 0.8, fontWeight: 300 }}>
            Alătură-te comunității Smart Urban Living.
          </Typography>
        </Box>

        <Box
          component="form"
          noValidate
          sx={{
            width: "100%",
            maxWidth: 480,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <TextField
              name="lastName"
              placeholder="Nume"
              onChange={handleChange}
              sx={{ ...inputStyles, flex: 0.42 }}
            />

            <TextField
              name="firstName"
              placeholder="Prenume"
              onChange={handleChange}
              sx={{ ...inputStyles, flex: 0.58 }}
            />
          </Box>

          <TextField
            fullWidth
            name="email"
            placeholder="Email"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          <TextField
            fullWidth
            name="password"
            placeholder="Parolă"
            type="password"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          <Button 
            fullWidth 
            variant="contained" 
            size="large" 
            onClick={handleRegister}
            sx={{ 
              mt: 1, 
              py: 1.8,
              borderRadius: 3,
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.2s'
            }}
          >
            Înregistrează-te
          </Button>
        </Box>

        <Typography sx={{ mt: 2, fontSize: '0.85rem', opacity: 0.9 }}>
          Ai deja cont?{" "}
          <Link 
            component={RouterLink} 
            to="/" 
            sx={{ 
              color: '#fff', 
              fontWeight: 700, 
              textDecoration: 'underline',
              '&:hover': { opacity: 0.8 }
            }}
          >
            Autentifică-te
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 3,
    fontSize: '0.9rem',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#fff' },
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(255,255,255,0.5)',
    opacity: 1,
  }
};