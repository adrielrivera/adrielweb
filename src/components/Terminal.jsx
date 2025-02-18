import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentDirectory, isValidPath, getFileContent, portfolioData } from '../data/portfolioData';

const formatCertification = (cert) => {
  if (!cert) return 'Invalid certificate file';
  
  return (
    `<div class="certificate-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 20px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.8); box-shadow: 0 4px 16px rgba(0, 255, 0, 0.1); margin-bottom: 20px;">
      <h1 style="color: #00ff00; margin-bottom: 1rem; text-transform: uppercase;">${cert.name}</h1>
      ${cert.image ? `<img src="${cert.image}" alt="${cert.name} Certificate" style="max-width: 100%; margin: 1rem 0;" />` : ''}
      
      <h2 style="color: #00ff00; margin: 1rem 0;">DETAILS</h2>
      <p style="color: #00ff00;"><strong>Issuer:</strong> ${cert.issuer}</p>
      <p style="color: #00ff00;"><strong>Year:</strong> ${cert.year}</p>
      <p style="color: #00ff00;"><strong>Status:</strong> ${cert.status}</p>
      
      <h2 style="color: #00ff00; margin: 1rem 0;">DESCRIPTION</h2>
      <p style="color: #00ff00;">${cert.writeup}</p>
      
      <h2 style="color: #00ff00; margin: 1rem 0;">SKILLS</h2>
      <ul style="color: #00ff00; list-style-position: inside; padding-left: 0;">
        ${cert.skills.map(skill => `<li style="margin-bottom: 0.3rem;">${skill}</li>`).join('')}
      </ul>
    </div>`
  );
};

const formatLeadershipEntry = (entry) => {
  return `<div class="content-card leadership-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 20px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.8); box-shadow: 0 4px 16px rgba(0, 255, 0, 0.1); margin-bottom: 20px;">
    <h2 style="color: #00ff00; margin-bottom: 1rem;">${entry.name}</h2>
    <p class="role" style="color: #00ff00;">${entry.description || entry.role}</p>
    ${entry.details ? `<p class="details" style="color: #00ff00; margin-top: 0.5rem;">${entry.details}</p>` : ''}
    ${entry.year ? `<p class="year" style="color: #00ff00; margin-top: 0.5rem;">Year: ${entry.year}</p>` : ''}
  </div>`;
};

const formatIDPEntry = (entry) => {
  return `<div class="content-card idp-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 20px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.8); box-shadow: 0 4px 16px rgba(0, 255, 0, 0.1); margin-bottom: 20px;">
    <h2 style="color: #00ff00; margin-bottom: 1rem;">${entry.name}</h2>
    <p class="status" style="color: #00ff00;">Status: ${entry.status}</p>
    <p class="year" style="color: #00ff00;">Year: ${entry.year}</p>
    <div class="description" style="margin-top: 1rem;">
      <h3 style="color: #00ff00; margin-bottom: 0.5rem;">Overview</h3>
      <p style="color: #00ff00;">${entry.writeup}</p>
    </div>
    <div class="skills" style="margin-top: 1rem;">
      <h3 style="color: #00ff00; margin-bottom: 0.5rem;">Key Skills</h3>
      <ul style="color: #00ff00; list-style-position: inside; padding-left: 0;">
        ${entry.skills.map(skill => `<li style="margin-bottom: 0.3rem;">${skill}</li>`).join('')}
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
          ? `<div class="help-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 20px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.5); box-shadow: 0 4px 16px rgba(0, 255, 0, 0.1); margin-bottom: 20px;">
              <h2 style="color: #00ff00; font-size: 1.3rem; margin-bottom: 1rem; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Available Commands</h2>
              <div style="margin: 1rem 0;">
                <p style="margin-bottom: 0.8rem;">📂 ls - Show what files and folders are here</p>
                <p style="margin-bottom: 0.8rem;">📂 cd &lt;folder&gt; - Open a folder (use "cd .." to go back)</p>
                <p style="margin-bottom: 0.8rem;">📄 cat &lt;file&gt; - Read a file</p>
                <p style="margin-bottom: 0.8rem;">🔍 clear - Clean up the screen</p>
                <p style="margin-bottom: 0.8rem;">🚪 logout - Exit the system</p>
              </div>
              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(0, 255, 0, 0.2);">
                <p style="text-align: center; font-style: italic;">TL;DR: Use "ls" to look around, "cd" to move around, and "cat" to investigate!</p>
              </div>
            </div>`
          : `<div class="login-help-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 20px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.5); box-shadow: 0 4px 16px rgba(0, 255, 0, 0.1); margin-bottom: 20px;">
              <h2 style="color: #00ff00; font-size: 1.3rem; margin-bottom: 1rem; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Welcome!</h2>
              <p style="text-align: center;">Just type "login adriel" to start exploring my portfolio!</p>
              <p style="text-align: center; margin-top: 0.5rem; font-style: italic;">Need help? Type "help" anytime to see this message again.</p>
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
            if (content) return typeof content === 'string' ? `<div class="text-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 20px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.8); box-shadow: 0 4px 16px rgba(0, 255, 0, 0.1); margin-bottom: 20px;"><div style="white-space: pre-wrap; font-family: 'Share Tech Mono', monospace; color: #00ff00; line-height: 1.5;">${content}</div></div>` : JSON.stringify(content, null, 2);
          }
        }
        
        const fileContent = getFileContent(args[0]);
        if (fileContent) {
          return `<div class="text-card" style="border: 1px solid rgba(0, 255, 0, 0.3); padding: 20px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.8); box-shadow: 0 4px 16px rgba(0, 255, 0, 0.1); margin-bottom: 20px;">
            <div style="white-space: pre-wrap; font-family: 'Share Tech Mono', monospace; color: #00ff00; line-height: 1.5;">${fileContent}</div>
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
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        color: '#00ff00',
        padding: 4,
        borderRadius: 3,
        fontFamily: '"Share Tech Mono", "Fira Code", "Source Code Pro", monospace',
        height: '70vh',
        overflow: 'auto',
        boxShadow: '0 8px 32px rgba(0, 255, 0, 0.1)',
        border: '1px solid rgba(0, 255, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        '& *': {
          fontFamily: '"Share Tech Mono", "Fira Code", "Source Code Pro", monospace !important'
        },
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(0, 255, 0, 0.15)',
          border: '1px solid rgba(0, 255, 0, 0.3)'
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, rgba(0,255,0,0) 0%, rgba(0,255,0,0.5) 50%, rgba(0,255,0,0) 100%)',
          animation: 'scanline 2s linear infinite'
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
              }}>Adriel Rivera's Interactive Portfolio!</h1>
              
              <p style={{ marginBottom: '1rem' }}>This is a fun way to explore my work and experience. It's super easy:</p>
              
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