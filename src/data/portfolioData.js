// Portfolio content and security challenges
export const portfolioData = {
  projects: {
    description: 'Project and Leadership Experience - Security Level 1 required',
    content: [
      {
        name: 'Recess Gym Booking System',
        description: 'Student-Initiated Project',
        details: 'Currently developing and maintaining a booking system for gym facilities (2024-Present).'
      },
      {
        name: 'House Leadership',
        description: 'Blue House Captain (2024-2025)',
        details: 'Leading and organizing house events, motivating members, and coordinating activities.'
      },
      {
        name: 'Junior House Leadership',
        description: 'Junior House Leader (2023-2024)',
        details: 'Assisted in house management and event coordination under Adele Lim.'
      }
    ]
  },
  skills: {
    description: 'Technical Skills and Certifications - Security Level 1 required',
    content: {
      'Cybersecurity': 95,
      'Project Management': 85,
      'Leadership': 90,
      'Event Planning': 88,
      'System Development': 85
    }
  },
  certifications: {
    description: 'Professional Certifications - Security Level 1 required',
    content: {
      'cisco-cybersecurity.txt': {
        name: 'Cisco Cybersecurity Essentials',
        issuer: 'Cisco',
        year: 2024,
        status: 'Completed',
        image: '/cisco-cybersecurity.png',
        writeup: 'Successfully completed the Cisco Cybersecurity Essentials certification, gaining expertise in fundamental cybersecurity concepts and practices. This certification validates my understanding of network security principles, threat detection methodologies, and cybersecurity best practices.',
        skills: ['Network Security', 'Cryptography', 'Threat Detection', 'Security Protocols']
      },
      'nus-cs0.txt': {
        name: 'NUS SoC CS0 Certificate',
        issuer: 'National University of Singapore',
        year: 2024,
        status: 'Completed',
        image: '/certificates/nus-cs0.png',
        writeup: 'Mastered fundamental programming concepts and computational thinking through NUS School of Computing\'s foundational course. Developed strong problem-solving skills and basic programming proficiency.',
        skills: ['Programming Fundamentals', 'Problem Solving', 'Computational Thinking']
      },
      'nus-cs1.txt': {
        name: 'NUS SoC CS1 Certificate',
        issuer: 'National University of Singapore',
        year: 2024,
        status: 'Completed',
        image: '/certificates/nus-cs1.png',
        writeup: 'Advanced programming course focusing on data structures, algorithms, and software development principles. Gained practical experience in building efficient and scalable solutions.',
        skills: ['Data Structures', 'Algorithms', 'Software Development', 'Code Optimization']
      },
      'google-cybersecurity.txt': {
        name: 'Google Cybersecurity Professional',
        issuer: 'Google',
        year: 2025,
        status: 'Planned',
        image: null,
        writeup: 'Upcoming certification focusing on advanced cybersecurity concepts, cloud security, and incident response. Will enhance expertise in modern security practices and tools.',
        skills: ['Cloud Security', 'Incident Response', 'Security Analysis', 'Risk Management']
      }
    }
  },
  achievements: {
    description: 'Competitions and Events - Security Level 1 required',
    content: [
      {
        name: 'Seibersecc CTF 2024',
        achievement: '4th Place',
        type: 'Team Competition'
      },
      {
        name: 'Expose Planning Committee',
        year: 2024,
        role: 'Committee Member'
      },
      {
        name: 'OEE Planning & Facilitation',
        year: 2024,
        role: 'Facilitator'
      },
      {
        name: 'Inter-House Games',
        year: 2024,
        role: 'Planning & Facilitation'
      },
      {
        name: 'S1 Orientation',
        year: 2025,
        role: 'Facilitator'
      }
    ]
  },
  contact: {
    description: 'Secure communication channels - Security Level 1 required',
    content: {
      email: 'encrypted:base64:YWRyaWVsQGV4YW1wbGUuY29t',
      linkedin: 'encrypted:base64:aHR0cHM6Ly9saW5rZWRpbi5jb20vaW4vYWRyaWVs',
      github: 'encrypted:base64:aHR0cHM6Ly9naXRodWIuY29tL2FkcmllbA=='
    }
  },
  secure: {
    description: 'Restricted Area - Security Level 2 required',
    content: {
      'mainframe.sys': 'Encrypted system files - Requires decryption key',
      'backdoor.exe': 'Binary analysis challenge - Find the hidden message'
    }
  },
  files: {
    'readme.txt': 'Welcome to my Interactive Portfolio!\n\nThis terminal contains information about my:\n- Projects and Leadership Experience\n- Technical Skills\n- Certifications\n- Achievements and Events\n\nUse "ls" to list directories and "cd" to navigate.\nType "help" for more commands.',
    'about.txt': 'I am a passionate student leader and tech enthusiast with experience in:\n- Cybersecurity and System Development\n- Project Management and Team Leadership\n- Event Planning and Coordination\n\nCurrently working on the Recess Gym Booking System and serving as Blue House Captain.',
    'contact.txt': 'Feel free to reach out!\nEmail: adriel.rivera@student.example.com\nGitHub: github.com/adriel-rivera\nLinkedIn: linkedin.com/in/adriel-rivera'
  },
  challenges: [
    {
      level: 1,
      name: 'Basic Access',
      hint: 'The password is encoded in base64 in encrypted.dat',
      solution: 'hacktheplanet'
    },
    {
      level: 2,
      name: 'Advanced Access',
      hint: 'Look for patterns in the Matrix',
      solution: 'matrix'
    },
    {
      level: 3,
      name: 'Root Access',
      hint: 'What was the name of the first computer virus?',
      solution: 'creeper'
    }
  ]
};

export const getCurrentDirectory = (path) => {
  if (!path) return portfolioData;
  
  const parts = path.split('/').filter(part => part.length > 0);
  let current = portfolioData;
  
  for (const part of parts) {
    if (current[part]) {
      current = current[part];
    } else {
      return null;
    }
  }
  
  return current;
};

export const isValidPath = (path) => {
  return getCurrentDirectory(path) !== null;
};

export const getFileContent = (filename) => {
  return portfolioData.files[filename] || null;
};