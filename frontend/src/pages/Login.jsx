import React, { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Link,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import axios from "axios";

// IMPORTĂ IMAGINEA
import backgroundImage from "../assets/images/luxury-apartment.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Login reușit");
    } catch {
      alert("Email sau parolă greșită");
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      display: "grid", 
      placeItems: "center", 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Overlay pentru a face textul mai lizibil */}
      <Box sx={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundColor: 'rgba(0,0,0,0.3)', 
        backdropFilter: 'blur(2px)',
        zIndex: 0
      }} />

      <Paper sx={{ 
        width: { xs: '90%', sm: 420 }, 
        p: { xs: 4, sm: 6 }, 
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.12)', // Transparența pentru Glassmorphism
        backdropFilter: 'blur(25px) saturate(150%)', // Efectul de sticlă
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        textAlign: 'center',
        color: '#fff'
      }}>
        
        <Typography variant="h3" sx={{ 
          fontFamily: '"Playfair Display", serif', // Font premium (asigură-te că e importat în index.html sau via CSS)
          fontWeight: 700,
          mb: 1,
          letterSpacing: '-0.02em',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Smart Urban Living
        </Typography>

        <Typography variant="body1" sx={{ mb: 5, opacity: 0.8, fontWeight: 300 }}>
          Arhitectură vizionară pentru viitorul tău.
        </Typography>

        <Box component="form" noValidate>
          <TextField
            fullWidth
            placeholder="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: 'rgba(255,255,255,0.7)' }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          <TextField
            fullWidth
            placeholder="Parolă"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: 'rgba(255,255,255,0.7)' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ ...inputStyles, mt: 2 }}
          />

          <Button 
            fullWidth 
            variant="contained" 
            size="large" 
            onClick={handleLogin}
            sx={{ 
              mt: 4, 
              py: 1.5,
              borderRadius: 2,
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Autentificare
          </Button>
        </Box>

        <Typography sx={{ mt: 4, fontSize: '0.9rem', opacity: 0.9 }}>
          Nu ai cont?{" "}
          <Link 
            component={RouterLink} 
            to="/register" 
            sx={{ 
              color: '#fff', 
              fontWeight: 700, 
              textDecoration: 'underline',
              '&:hover': { opacity: 0.8 }
            }}
          >
            Înregistrează-te
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

// Stiluri reutilizabile pentru Input-uri
const inputStyles = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
    '&.Mui-focused fieldset': { borderColor: '#fff' },
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(255,255,255,0.5)',
    opacity: 1,
  }
};