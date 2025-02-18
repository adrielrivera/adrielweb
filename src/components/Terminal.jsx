import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentDirectory, isValidPath, getFileContent, portfolioData } from '../data/portfolioData';
import ciscoImage from '../assets/Cisco.png';
import cs0Image from '../assets/cs0.png';
import cs1Image from '../assets/cs1.png';

const formatCertification = (cert) => {
  if (!cert) return 'Invalid certificate file';
  
  return (
    `<div class="certificate-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 25px; border-radius: 12px; background-color: rgba(0, 0, 0, 0.85); box-shadow: 0 8px 32px rgba(0, 255, 0, 0.15); margin: 25px 0; backdrop-filter: blur(12px); transition: all 0.3s ease-in-out;">
      <h1 style="color: #00ff00; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1.5px; font-size: 1.8rem; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">${cert.name}</h1>
      ${cert.image ? `<img src="${cert.image === '../assets/Cisco.png' ? ciscoImage : cert.image === '../assets/cs0.png' ? cs0Image : cs1Image}" alt="${cert.name} Certificate" style="max-width: 100%; margin: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 16px rgba(0, 255, 0, 0.2);" />` : ''}
      
      <h2 style="color: #00ff00; margin: 1.5rem 0; font-size: 1.4rem; letter-spacing: 1px;">DETAILS</h2>
      <p style="color: #00ff00; font-size: 1.1rem; margin-bottom: 0.8rem;"><strong>Issuer:</strong> ${cert.issuer}</p>
      <p style="color: #00ff00; font-size: 1.1rem; margin-bottom: 0.8rem;"><strong>Year:</strong> ${cert.year}</p>
      <p style="color: #00ff00; font-size: 1.1rem; margin-bottom: 0.8rem;"><strong>Status:</strong> ${cert.status}</p>
      
      <h2 style="color: #00ff00; margin: 1.5rem 0; font-size: 1.4rem; letter-spacing: 1px;">DESCRIPTION</h2>
      <p style="color: #00ff00; font-size: 1.1rem; line-height: 1.8;">${cert.writeup}</p>
      
      <h2 style="color: #00ff00; margin: 1.5rem 0; font-size: 1.4rem; letter-spacing: 1px;">SKILLS</h2>
      <ul style="color: #00ff00; list-style-position: inside; padding-left: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.8rem;">
        ${cert.skills.map(skill => `<li style="margin-bottom: 0.3rem; font-size: 1.1rem; padding: 0.4rem 0.8rem; background: rgba(0, 255, 0, 0.1); border-radius: 4px; transition: all 0.3s ease;">${skill}</li>`).join('')}
      </ul>
    </div>`
  );
};

const formatLeadershipEntry = (entry) => {
  return `<div class="content-card leadership-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 25px; border-radius: 12px; background-color: rgba(0, 0, 0, 0.85); box-shadow: 0 8px 32px rgba(0, 255, 0, 0.15); margin: 25px 0; backdrop-filter: blur(12px); transition: all 0.3s ease-in-out;">
    <h2 style="color: #00ff00; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1.5px; font-size: 1.6rem; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">${entry.name}</h2>
    <p class="role" style="color: #00ff00; font-size: 1.2rem; margin-bottom: 1rem; letter-spacing: 0.5px;">${entry.description || entry.role}</p>
    ${entry.details ? `<p class="details" style="color: #00ff00; font-size: 1.1rem; line-height: 1.8; margin: 1rem 0; padding: 1rem; background: rgba(0, 255, 0, 0.05); border-radius: 8px;">${entry.details}</p>` : ''}
    ${entry.year ? `<p class="year" style="color: #00ff00; font-size: 1.1rem; margin-top: 1rem; opacity: 0.8;">Year: ${entry.year}</p>` : ''}
  </div>`;
};

const formatIDPEntry = (entry) => {
  return `<div class="content-card idp-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 25px; border-radius: 12px; background-color: rgba(0, 0, 0, 0.85); box-shadow: 0 8px 32px rgba(0, 255, 0, 0.15); margin: 25px 0; backdrop-filter: blur(12px); transition: all 0.3s ease-in-out;">
    <h2 style="color: #00ff00; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1.5px; font-size: 1.6rem; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">${entry.name}</h2>
    <div style="display: flex; gap: 1.5rem; margin-bottom: 1.5rem;">
      <p class="status" style="color: #00ff00; font-size: 1.1rem; padding: 0.5rem 1rem; background: rgba(0, 255, 0, 0.1); border-radius: 4px;">Status: ${entry.status}</p>
      <p class="year" style="color: #00ff00; font-size: 1.1rem; padding: 0.5rem 1rem; background: rgba(0, 255, 0, 0.1); border-radius: 4px;">Year: ${entry.year}</p>
    </div>
    <div class="description" style="margin: 1.5rem 0;">
      <h3 style="color: #00ff00; margin-bottom: 1rem; font-size: 1.3rem; letter-spacing: 1px;">Overview</h3>
      <p style="color: #00ff00; font-size: 1.1rem; line-height: 1.8; padding: 1rem; background: rgba(0, 255, 0, 0.05); border-radius: 8px;">${entry.writeup}</p>
    </div>
    <div class="skills" style="margin-top: 1.5rem;">
      <h3 style="color: #00ff00; margin-bottom: 1rem; font-size: 1.3rem; letter-spacing: 1px;">Key Skills</h3>
      <ul style="color: #00ff00; list-style-position: inside; padding-left: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.8rem;">
        ${entry.skills.map(skill => `<li style="margin-bottom: 0.3rem; font-size: 1.1rem; padding: 0.4rem 0.8rem; background: rgba(0, 255, 0, 0.1); border-radius: 4px; transition: all 0.3s ease;">${skill}</li>`).join('')}
      </ul>
    </div>
  </div>`;
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(3);
  const [currentPath, setCurrentPath] = useState('');
  const inputRef = React.useRef(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleAuthentication = (password) => {
    if (password === 'adriel') {
      setIsAuthenticated(true);
      return 'Access Granted - Welcome to the portfolio! Type "help" to see what you can do here.';
    } else {
      setLoginAttempts((prev) => prev - 1);
      if (loginAttempts <= 1) {
        return 'Too many incorrect attempts. Please refresh the page to try again.';
      }
      return `Incorrect password. ${loginAttempts - 1} attempts remaining. Hint: Try using "adriel"`;
    }
  };

  const handleCommand = (command) => {
    const [cmd, ...args] = command.toLowerCase().split(' ');

    if (!isAuthenticated && cmd !== 'login') {
      return 'Please log in first! Use "login adriel" to begin.';
    }

    switch (cmd) {
      case 'help':
        return isAuthenticated
          ? `<div class="help-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 30px; border-radius: 12px; background-color: rgba(0, 0, 0, 0.85); box-shadow: 0 8px 32px rgba(0, 255, 0, 0.15); margin: 25px 0; backdrop-filter: blur(12px); display: flex; flex-direction: column; gap: 25px;">
              <div style="padding: 20px; border-bottom: 1px solid rgba(0, 255, 0, 0.2); margin-bottom: 20px;">
                <h2 style="color: #00ff00; font-size: 1.6rem; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">Command Center</h2>
                <p style="color: rgba(0, 255, 0, 0.9); font-size: 1.1rem; line-height: 1.8; margin-bottom: 1rem;">Navigate through my portfolio using these simple commands:</p>
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                <div style="background: rgba(0, 255, 0, 0.05); padding: 15px; border-radius: 8px; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: space-between;">
                  <p style="margin-bottom: 0.8rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">📂 <span style="color: #00ff00; font-weight: bold;">ls</span></p>
                  <p style="color: rgba(0, 255, 0, 0.8); font-size: 0.9rem;">Show what files and folders are here</p>
                </div>
                <div style="background: rgba(0, 255, 0, 0.05); padding: 15px; border-radius: 8px; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: space-between;">
                  <p style="margin-bottom: 0.8rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">📂 <span style="color: #00ff00; font-weight: bold;">cd</span></p>
                  <p style="color: rgba(0, 255, 0, 0.8); font-size: 0.9rem;">Open a folder (use "cd .." to go back)</p>
                </div>
                <div style="background: rgba(0, 255, 0, 0.05); padding: 15px; border-radius: 8px; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: space-between;">
                  <p style="margin-bottom: 0.8rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">📄 <span style="color: #00ff00; font-weight: bold;">cat</span></p>
                  <p style="color: rgba(0, 255, 0, 0.8); font-size: 0.9rem;">Read a file's contents</p>
                </div>
                <div style="background: rgba(0, 255, 0, 0.05); padding: 15px; border-radius: 8px; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: space-between;">
                  <p style="margin-bottom: 0.8rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">🔍 <span style="color: #00ff00; font-weight: bold;">clear</span></p>
                  <p style="color: rgba(0, 255, 0, 0.8); font-size: 0.9rem;">Clean up the screen</p>
                </div>
                <div style="background: rgba(0, 255, 0, 0.05); padding: 15px; border-radius: 8px; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: space-between;">
                  <p style="margin-bottom: 0.8rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">🚪 <span style="color: #00ff00; font-weight: bold;">logout</span></p>
                  <p style="color: rgba(0, 255, 0, 0.8); font-size: 0.9rem;">Exit the system</p>
                </div>
              </div>
            </div>`
          : `<div class="login-help-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 30px; border-radius: 12px; background-color: rgba(0, 0, 0, 0.85); box-shadow: 0 8px 32px rgba(0, 255, 0, 0.15); margin: 25px 0; backdrop-filter: blur(12px); transition: all 0.3s ease-in-out;">
              <h2 style="color: #00ff00; font-size: 1.6rem; margin-bottom: 1.5rem; text-align: center; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">Welcome!</h2>
              <p style="text-align: center; font-size: 1.2rem; margin-bottom: 1rem;">Just type "login adriel" to start exploring my portfolio!</p>
              <p style="text-align: center; margin-top: 1rem; font-style: italic; font-size: 1.1rem; color: rgba(0, 255, 0, 0.8);">Need help? Type "help" anytime to see this message again.</p>
            </div>`;
      case 'login':
        return handleAuthentication(args[0]);
      case 'ls':
        if (!isAuthenticated) return 'Access Denied - Authentication required';
        const currentDir = getCurrentDirectory(currentPath);
        if (!currentDir) return 'Invalid directory';
        
        if (typeof currentDir === 'object') {
          const entries = Object.entries(currentDir);
          const filteredEntries = entries.filter(([key]) => key !== 'description');
          
          if (filteredEntries.length === 0) return 'No accessible items in this directory';
          
          return filteredEntries
            .map(([key, value]) => {
              if (key === 'content' && Array.isArray(value)) {
                return value.map(item => {
                  const border = '•'.repeat(40);
                  return `\n${border}\n${item.name}\n${item.description || ''}\n${item.details || ''}\n${border}`;
                }).join('\n');
              }
              if (typeof value === 'object' && !Array.isArray(value)) {
                if (key === 'content') {
                  return Object.keys(value).join('\n');
                }
                return key + '/';
              }
              return key;
            })
            .filter(Boolean)
            .join('\n');
        }
        return 'Not a directory';
      case 'cd':
        if (!isAuthenticated) return 'Access Denied - Authentication required';
        if (!args[0]) return 'Please specify a directory';
        
        const newPath = args[0] === '..' 
          ? currentPath.split('/').slice(0, -1).join('/') 
          : currentPath ? `${currentPath}/${args[0]}` : args[0];
        
        if (isValidPath(newPath)) {
          setCurrentPath(newPath);
          return `Changed directory to ${newPath || '/'}`;
        }
        return 'Invalid directory';

      case 'cat':
        if (!isAuthenticated) return 'Access Denied - Authentication required';
        if (!args[0]) return 'Please specify a file';
        
        const dirContent = getCurrentDirectory(currentPath);
        if (!dirContent) return 'File not found';
        
        if (typeof dirContent === 'object') {
          // Check if we're in the certifications directory
          if (currentPath === 'certifications' && dirContent.content && dirContent.content[args[0]]) {
            return formatCertification(dirContent.content[args[0]]);
          }
          
          // Check if we're in the IDP directory
          if (currentPath === 'idp' && dirContent.content && dirContent.content[args[0]]) {
            return formatIDPEntry(dirContent.content[args[0]]);
          }
          
          // Check if the file exists in the current directory's content
          if (dirContent.content && typeof dirContent.content === 'object') {
            const content = dirContent.content[args[0]];
            if (content) return typeof content === 'string' ? `<div class="text-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 30px; border-radius: 12px; background-color: rgba(0, 0, 0, 0.85); box-shadow: 0 8px 32px rgba(0, 255, 0, 0.15); margin: 25px 0; backdrop-filter: blur(12px); transition: all 0.3s ease-in-out;">
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; font-family: 'Share Tech Mono', monospace; color: #00ff00;">
                <div style="padding: 20px; border-right: 1px solid rgba(0, 255, 0, 0.2);">
                  <h3 style="color: #00ff00; font-size: 1.6rem; margin: 0 0 15px 0; letter-spacing: 1.5px; text-transform: uppercase; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">${args[0]}</h3>
                  <span style="color: rgba(0, 255, 0, 0.7); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">File Content</span>
                </div>
                <div style="padding: 20px;">
                  <div style="white-space: pre-wrap; line-height: 1.8; font-size: 1.1rem; padding: 15px; background-color: rgba(0, 255, 0, 0.05); border-radius: 8px; border: 1px solid rgba(0, 255, 0, 0.1); box-shadow: inset 0 0 15px rgba(0, 255, 0, 0.05);">${content}</div>
                </div>
              </div>
            </div>` : JSON.stringify(content, null, 2);
          }
        }
        
        const fileContent = getFileContent(args[0]);
        if (fileContent) {
          return `<div class="text-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 30px; border-radius: 12px; background-color: rgba(0, 0, 0, 0.85); box-shadow: 0 8px 32px rgba(0, 255, 0, 0.15); margin: 25px 0; backdrop-filter: blur(12px); transition: all 0.3s ease-in-out;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; font-family: 'Share Tech Mono', monospace; color: #00ff00;">
              <div style="padding: 20px; border-right: 1px solid rgba(0, 255, 0, 0.2);">
                <h3 style="color: #00ff00; font-size: 1.6rem; margin: 0 0 15px 0; letter-spacing: 1.5px; text-transform: uppercase; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">${args[0]}</h3>
                <span style="color: rgba(0, 255, 0, 0.7); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">File Content</span>
              </div>
              <div style="padding: 20px;">
                <div style="white-space: pre-wrap; line-height: 1.8; font-size: 1.1rem; padding: 15px; background-color: rgba(0, 255, 0, 0.05); border-radius: 8px; border: 1px solid rgba(0, 255, 0, 0.1); box-shadow: inset 0 0 15px rgba(0, 255, 0, 0.05);">${fileContent}</div>
              </div>
            </div>
          </div>`;
        }
        
        return 'File not found';


      case 'clear':
        setCommandHistory([]);
        return '';
      case 'logout':
        setIsAuthenticated(false);
        setLoginAttempts(3);
        return 'Logged out successfully.';
      default:
        return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const output = handleCommand(input);
      setCommandHistory([...commandHistory, 
        { type: 'input', text: `$ ${input}` }, 
        { type: 'output', text: output }
      ]);
      setInput('');
    }
  };

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    // Refocus input when clicking anywhere in the terminal
    inputRef.current?.focus();
  };

  return (
    <Box
      onClick={handleTerminalClick}
      sx={{
        backgroundColor: 'rgba(26, 26, 26, 0.97)',
        color: '#00ff00',
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: 3,
        fontFamily: '"Share Tech Mono", "Fira Code", "Source Code Pro", monospace',
        height: '80vh',
        overflow: 'auto',
        boxShadow: '0 12px 40px rgba(0, 255, 0, 0.15)',
        border: '1px solid rgba(0, 255, 0, 0.25)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        '& *': {
          fontFamily: '"Share Tech Mono", "Fira Code", "Source Code Pro", monospace !important'
        },
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 16px 48px rgba(0, 255, 0, 0.2)',
          border: '1px solid rgba(0, 255, 0, 0.4)',
          transform: 'translateY(-2px)'
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, rgba(0,255,0,0) 0%, rgba(0,255,0,0.6) 50%, rgba(0,255,0,0) 100%)',
          animation: 'scanline 2.5s linear infinite'
        },
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px'
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0, 255, 0, 0.05)',
          borderRadius: '4px'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 255, 0, 0.2)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(0, 255, 0, 0.3)'
          }
        }
      }}
    >
      <Box sx={{ position: 'absolute', top: 2, right: 2, display: 'flex', gap: 1 }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c941' }} />
      </Box>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="body2" sx={{ color: '#00ff00', mb: 2, textAlign: 'left' }}>
            <div className="welcome-card" style={{
              border: '1px solid rgba(0, 255, 0, 0.3)',
              padding: '30px',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              boxShadow: '0 8px 32px rgba(0, 255, 0, 0.15)',
              marginBottom: '25px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px'
            }}>
              <div style={{
                padding: '20px',
                borderRight: '1px solid rgba(0, 255, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h1 style={{ 
                  color: '#00ff00', 
                  fontSize: '2rem', 
                  marginBottom: '1rem',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
                }}>Adriel Rivera</h1>
                
                <p style={{ 
                  marginBottom: '1.5rem',
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                  color: 'rgba(0, 255, 0, 0.9)',
                  textAlign: 'left'
                }}>Welcome to my interactive portfolio! This is a fun way to explore my achievements and experiences. It's super easy:</p>
              </div>
              
              <div style={{
                padding: '20px',
                backgroundColor: 'rgba(0, 255, 0, 0.05)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <ol style={{ 
                  listStyle: 'none', 
                  padding: 0,
                  margin: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  <li style={{ 
                    padding: '12px',
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ 
                      backgroundColor: 'rgba(0, 255, 0, 0.2)',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem'
                    }}>1</span>
                    Just type 'login adriel' and press Enter
                  </li>
                  <li style={{ 
                    padding: '12px',
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ 
                      backgroundColor: 'rgba(0, 255, 0, 0.2)',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem'
                    }}>2</span>
                    Then type 'help' to see what you can do
                  </li>
                </ol>
              </div>
            </div>
          </Typography>
        </motion.div>

        {commandHistory.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="body2" sx={{ mb: 1, textAlign: item.type === 'output' && !item.text.includes('<div') ? 'left' : 'inherit' }}>
              {item.type === 'output' && item.text.includes('<div') ? (
                <div dangerouslySetInnerHTML={{ __html: item.text }} />
              ) : (
                item.text.split('\n').map((line, i) => (
                  <div key={i} style={{ textAlign: 'left', fontFamily: '"Share Tech Mono", "Fira Code", "Source Code Pro", monospace' }}>{line}</div>
                ))
              )}
            </Typography>
          </motion.div>
        ))}
      </AnimatePresence>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" component="span">
          {isAuthenticated ? '$ ' : '$ '}
        </Typography>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#00ff00',
            outline: 'none',
            fontFamily: '"Share Tech Mono", "Fira Code", "Source Code Pro", monospace',
            fontSize: '1rem',
            width: '100%',
            direction: 'ltr',
            textAlign: 'left'
          }}
        />
      </Box>
    </Box>
  );
};

export default Terminal;