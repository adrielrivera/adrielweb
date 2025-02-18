import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentDirectory, isValidPath, getFileContent, portfolioData } from '../data/portfolioData';

const formatCertification = (cert) => {
  if (!cert) return 'Invalid certificate file';
  
  const border = '+='.repeat(40);
  const separator = '-'.repeat(80);
  
  const formatSection = (title, content) => {
    return `\n│ ${title}\n${separator}\n${content}\n`;
  };

  const imageDisplay = cert.image
    ? `\n[Image Available]: ${cert.image}\n`
    : '\n[No Image Available]\n';

  return `\n${border}\n║ ${cert.name.toUpperCase()}\n${border}${imageDisplay}\n${formatSection('DETAILS', `Issuer: ${cert.issuer}\nYear: ${cert.year}\nStatus: ${cert.status}`)}${formatSection('DESCRIPTION', cert.writeup)}${formatSection('SKILLS', cert.skills.map(skill => `• ${skill}`).join('\n'))}\n${border}`;
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
          ? `Here are the commands you can use:

📂 ls - Show what files and folders are here
📂 cd <folder> - Open a folder (use "cd .." to go back)
📄 cat <file> - Read a file
🔍 clear - Clean up the screen
🚪 logout - Exit the system`
          : `Just type "login adriel" to start exploring my portfolio!
Need help? Type "help" anytime to see this message again.`;
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
          
          // Check if the file exists in the current directory's content
          if (dirContent.content && typeof dirContent.content === 'object') {
            const content = dirContent.content[args[0]];
            if (content) return typeof content === 'string' ? content : JSON.stringify(content, null, 2);
          }
        }
        
        const fileContent = getFileContent(args[0]);
        if (fileContent) return fileContent;
        
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
        backgroundColor: '#1a1a1a',
        color: '#00ff00',
        padding: 2,
        borderRadius: 1,
        fontFamily: '"Share Tech Mono", "Fira Code", "Source Code Pro", monospace',
        height: '80vh',
        overflow: 'auto',
        '& *': {
          fontFamily: '"Share Tech Mono", "Fira Code", "Source Code Pro", monospace !important'
        }
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="body2" sx={{ color: '#00ff00', mb: 2 }}>
            {`Hey there! 👋 Welcome to my Interactive Portfolio!

This is a fun way to explore my work and experience. It's super easy:

1. Just type 'login adriel' and press Enter
2. Then type 'help' to see what you can do
3. Want to see my projects? Type 'ls' to look around
4. Type 'cd projects' to check out my work
5. See a file you want to read? Type 'cat filename'

Don't worry about making mistakes - just have fun exploring! 😊`}
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
              {item.text.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
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