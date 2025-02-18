// Portfolio content and security challenges
export const portfolioData = {
  introductions: {
    description: 'Personal Introduction and Background',
    content: {
      'about-me.txt': `<section style="background: rgba(0, 255, 0, 0.05); border-radius: 8px; border: 1px solid rgba(0, 255, 0, 0.15); padding: 1.2rem; margin-bottom: 1.5rem;">
          <h2 style="color: #00ff00; font-size: 1.6rem; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">Education</h2>
          <p style="color: #00ff00; font-size: 1.1rem; line-height: 1.6;">I am a dedicated secondary school student at the School of Science and Technology (SST), taking the Engineering+ subject combination, which includes applied subjects in Computing+ and Electronics. As part of the Integrated Diploma Programme (IDP), a through-train pathway to Ngee Ann Polytechnic, I am working towards joining the Cybersecurity & Digital Forensics course at the School of ICT.</p>
        </section>

        <section style="background: rgba(0, 255, 0, 0.05); border-radius: 8px; border: 1px solid rgba(0, 255, 0, 0.15); padding: 1.2rem; margin-bottom: 1.5rem;">
          <h2 style="color: #00ff00; font-size: 1.6rem; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">Aspiration</h2>
          <p style="color: #00ff00; font-size: 1.1rem; line-height: 1.6;">I am an aspiring Cybersecurity professional, specifically in the field of penetration testing. Driven by curiosity and a passion for problem-solving, I am eager to contribute to the ever-evolving landscape of digital security. My commitment to cybersecurity is reflected in my continuous pursuit of knowledge and practical skills in this field.</p>
        </section>

        <section style="background: rgba(0, 255, 0, 0.05); border-radius: 8px; border: 1px solid rgba(0, 255, 0, 0.15); padding: 1.2rem;">
          <h2 style="color: #00ff00; font-size: 1.6rem; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);">Plans</h2>
          <p style="color: #00ff00; font-size: 1.1rem; line-height: 1.6;">Currently preparing for the eJPT (eLearnSecurity Junior Penetration Tester) certification. My future goals include obtaining the eCPPT (eLearnSecurity Certified Professional Penetration Tester) and OSCP (Offensive Security Certified Professional) certifications to further my expertise in offensive security techniques.</p>
        </section>`
    }
  },

  certifications: {
    description: 'Professional Certifications and Achievements',
    content: {
      'cisco-cybersecurity.txt': {
        name: 'Cisco Cybersecurity Essentials',
        issuer: 'Cisco',
        year: 2024,
        status: 'Completed',
        image: '../assets/Cisco.png',
        writeup: 'Successfully completed the Cisco Cybersecurity Essentials certification, gaining expertise in fundamental cybersecurity concepts and practices.',
        skills: ['Network Security', 'Cryptography', 'Threat Detection', 'Security Protocols']
      },
      'nus-cs0.txt': {
        name: 'NUS SoC CS0',
        issuer: 'National University of Singapore',
        year: 2024,
        status: 'Completed',
        image: '../assets/cs0.png',
        writeup: 'Mastered fundamental programming concepts and computational thinking through NUS School of Computing\'s foundational course.',
        skills: ['Programming Fundamentals', 'Problem Solving', 'Computational Thinking']
      },
      'nus-cs1.txt': {
        name: 'NUS SoC CS1',
        issuer: 'National University of Singapore',
        year: 2024,
        status: 'Completed',
        image: '../assets/cs1.png',
        writeup: 'Advanced programming course focusing on data structures, algorithms, and software development principles.',
        skills: ['Data Structures', 'Algorithms', 'Software Development', 'Code Optimization']
      }
    }
  },
  competitions: {
    description: 'Competition Achievements and Participations',
    content: [
      {
        name: 'Seibersecc CTF 2024',
        achievement: '4th Place',
        type: 'Team Competition'
      }
    ]
  },
  leadership: {
    description: 'Leadership Roles and Responsibilities',
    content: [
      {
        name: 'House Leadership',
        description: 'Blue House Captain (2024-2025)',
        details: 'Leading and organizing house events, motivating members, and coordinating activities.'
      },
      {
        name: 'Junior House Leadership',
        description: 'Junior House Leader (2023-2024)',
        details: 'Assisted in house management and event coordination under Adele Lim.'
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
  idp: {
    description: 'IDP Experiences and Achievements',
    content: {
      'stmicro-attachment.txt': {
        name: 'STMicroelectronics Work Attachment',
        year: '2024',
        status: 'Completed',
        writeup: 'Industry exposure and hands-on experience in microelectronics. Gained practical experience in semiconductor industry, working with cutting-edge technology and industry professionals.',
        skills: ['Microelectronics', 'Semiconductor Technology', 'Industry Experience', 'Technical Skills']
      },
      'capstone-project.txt': {
        name: 'Capstone Project',
        year: '2024',
        status: 'In Progress',
        writeup: 'Final year project implementation focusing on real-world applications. Applied technical skills in project development and demonstrated problem-solving capabilities.',
        skills: ['Project Management', 'Technical Implementation', 'Problem Solving', 'Documentation']
      },
      'big-d-camp.txt': {
        name: 'Big D Camp',
        year: '2024',
        status: 'Completed',
        writeup: 'Intensive leadership development program enhancing team management and leadership capabilities. Participated in workshops and practical exercises to develop essential leadership skills.',
        skills: ['Leadership', 'Team Management', 'Communication', 'Strategic Planning']
      },
      'artc-camp.txt': {
        name: 'ARTC Camp',
        year: '2024',
        status: 'Completed',
        writeup: 'Advanced technology and research camp exploring cutting-edge technologies and research methodologies. Gained exposure to latest technological trends and research practices.',
        skills: ['Research Methodology', 'Advanced Technology', 'Innovation', 'Technical Analysis']
      }
    }
  },
  files: {
    'readme.txt': 'Welcome to my Interactive Portfolio!\n\nThis terminal contains information about my:\n- Overview\n- Certifications\n- Competitions\n- Leadership Experience\n- IDP Achievements\n\nUse "ls" to list directories and "cd" to navigate.\nType "help" for more commands.',
    'contact.txt': 'Feel free to reach out!\nEmail: adriel.rivera@student.example.com\nGitHub: github.com/adriel-rivera\nLinkedIn: linkedin.com/in/adriel-rivera'
  }
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