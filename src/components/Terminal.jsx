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
  const [cursorVisible, setCursorVisible] = useState(true);
  const [securityLevel, setSecurityLevel] = useState(0);
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
      setSecurityLevel(1);
      return 'Access Granted - Welcome to the portfolio! Type "help" to see what you can do here.';
    } else {
      setLoginAttempts((prev) => prev - 1);
      if (loginAttempts <= 1) {
        return 'Too many incorrect attempts. Please refresh the page to try again.';
      }
      return `Incorrect password. ${loginAttempts - 1} attempts remaining. Hint: Try using "adriel"'`;
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
          ? `<div class="help-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 30px; border-radius: 12px; background-color: rgba(0, 0, 0, 0.85); box-shadow: 0 8px 32px rgba(0, 255, 0, 0.15); margin: 25px 0; backdrop-filter: blur(12px); transition: all 0.3s ease-in-out;">
              <h2 style="color: #00ff00; font-size: 1.6rem; margin-bottom: 1.5rem; text-align: center; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">Available Commands</h2>
              <div style="margin: 1.5rem 0; background: rgba(0, 255, 0, 0.05); padding: 1.5rem; border-radius: 8px;">
                <p style="margin-bottom: 1rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">📂 <span style="color: #00ff00; font-weight: bold;">ls</span> - Show what files and folders are here</p>
                <p style="margin-bottom: 1rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">📂 <span style="color: #00ff00; font-weight: bold;">cd</span> &lt;folder&gt; - Open a folder (use "cd .." to go back)</p>
                <p style="margin-bottom: 1rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">📄 <span style="color: #00ff00; font-weight: bold;">cat</span> &lt;file&gt; - Read a file</p>
                <p style="margin-bottom: 1rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">🔍 <span style="color: #00ff00; font-weight: bold;">clear</span> - Clean up the screen</p>
                <p style="margin-bottom: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">🚪 <span style="color: #00ff00; font-weight: bold;">logout</span> - Exit the system</p>
              </div>
              <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(0, 255, 0, 0.2);">
                <p style="text-align: center; font-style: italic; font-size: 1.1rem; color: rgba(0, 255, 0, 0.8);">TL;DR: Use "ls" to look around, "cd" to move around, and "cat" to investigate!</p>
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
          const filteredEntries = entries.filter(([key]) => {
            if (key === 'secure' && securityLevel < 2) return false;
            if (['projects', 'skills', 'contact'].includes(key) && securityLevel < 1) return false;
            return true;
          });
          
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
                  if (key === 'skills') {
                    return Object.entries(value)
                      .map(([skill, level]) => `${skill}: [${'■'.repeat(Math.floor(level/10))}${'□'.repeat(10-Math.floor(level/10))}] ${level}%`)
                      .join('\n');
                  }
                  return Object.keys(value).join('\n');
                }
                return key + '/';
              }
              if (key === 'description') return null;
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
              <div style="white-space: pre-wrap; font-family: 'Share Tech Mono', monospace; color: #00ff00; line-height: 1.8; font-size: 1.1rem;">
                <div style="border-bottom: 1px solid rgba(0, 255, 0, 0.2); margin-bottom: 20px; padding-bottom: 15px;">
                  <h3 style="color: #00ff00; font-size: 1.4rem; margin: 0 0 10px 0; letter-spacing: 1.5px; text-transform: uppercase;">${args[0]}</h3>
                  <span style="color: rgba(0, 255, 0, 0.7); font-size: 0.9rem;">File Content</span>
                </div>
                <div style="padding: 10px; background-color: rgba(0, 255, 0, 0.05); border-radius: 8px;">${content}</div>
              </div>
            </div>` : JSON.stringify(content, null, 2);
          }
        }
        
        const fileContent = getFileContent(args[0]);
        if (fileContent) {
          return `<div class="text-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 30px; border-radius: 12px; background-color: rgba(0, 0, 0, 0.85); box-shadow: 0 8px 32px rgba(0, 255, 0, 0.15); margin: 25px 0; backdrop-filter: blur(12px); transition: all 0.3s ease-in-out;">
            <div style="white-space: pre-wrap; font-family: 'Share Tech Mono', monospace; color: #00ff00; line-height: 1.8; font-size: 1.1rem;">
              <div style="border-bottom: 1px solid rgba(0, 255, 0, 0.2); margin-bottom: 20px; padding-bottom: 15px;">
                <h3 style="color: #00ff00; font-size: 1.4rem; margin: 0 0 10px 0; letter-spacing: 1.5px; text-transform: uppercase;">${args[0]}</h3>
                <span style="color: rgba(0, 255, 0, 0.7); font-size: 0.9rem;">File Content</span>
              </div>
              <div style="padding: 10px; background-color: rgba(0, 255, 0, 0.05); border-radius: 8px;">${fileContent}</div>
            </div>
          </div>`;
        }
        
        return 'File not found';


      case 'clear':
        setCommandHistory([]);
        return '';
      case 'logout':
        setIsAuthenticated(false);
        setSecurityLevel(0);
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
          <Typography variant="body2" sx={{ color: '#00ff00', mb: 2 }}>
            <div className="welcome-card" style={{
              border: '1px solid rgba(0, 255, 0, 0.3)',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              boxShadow: '0 4px 16px rgba(0, 255, 0, 0.1)',
              marginBottom: '20px'
            }}>
              <h1 style={{ 
                color: '#00ff00', 
                fontSize: '1.5rem', 
                marginBottom: '1rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>Adriel Rivera</h1>
              
              <p style={{ marginBottom: '1rem' }}>Welcome to my interactive portfolio! This is a fun way to explore my achievements and experiences. It's super easy:</p>
              
              <ol style={{ 
                listStyle: 'none', 
                padding: 0,
                margin: '1rem 0'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>1. Just type 'login adriel' and press Enter</li>
                <li style={{ marginBottom: '0.5rem' }}>2. Then type 'help' to see what you can do</li>
                <li style={{ marginBottom: '0.5rem' }}>3. Want to see my projects? Type 'ls' to look around</li>
                <li style={{ marginBottom: '0.5rem' }}>4. Type 'cd projects' to check out my work</li>
                <li style={{ marginBottom: '0.5rem' }}>5. See a file you want to read? Type 'cat filename'</li>
              </ol>
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
            <Typography variant="body2" sx={{ mb: 1 }}>
              {item.type === 'output' && item.text.includes('<div') ? (
                <div dangerouslySetInnerHTML={{ __html: item.text }} />
              ) : (
                item.text.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))
              )}
            </Typography>
          </motion.div>
        ))}
      </AnimatePresence>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" component="span">
          {isAuthenticated ? `[Level ${securityLevel}]$ ` : '$ '}
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
          }}
        />
        <Typography
          variant="body2"
          component="span"
          sx={{ opacity: cursorVisible ? 1 : 0 }}
        >
          ▊
        </Typography>
      </Box>
    </Box>
  );
};

export default Terminal;