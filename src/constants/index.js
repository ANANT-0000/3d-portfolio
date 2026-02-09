export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
];

export const clientReviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    position: 'Marketing Director at GreenLeaf',
    img: 'assets/review1.png',
    review:
      'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
  },
  {
    id: 2,
    name: 'Mark Rogers',
    position: 'Founder of TechGear Shop',
    img: 'assets/review2.png',
    review:
      'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
  },
  {
    id: 3,
    name: 'John Dohsas',
    position: 'Project Manager at UrbanTech ',
    img: 'assets/review3.png',
    review:
      'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
  },
  {
    id: 4,
    name: 'Ether Smith',
    position: 'CEO of BrightStar Enterprises',
    img: 'assets/review4.png',
    review:
      'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
  },
];

export const myProjects = [
  {
    title: '3D Airplane Game - BMU Expo',
    desc: 'An immersive 3D airplane game built for the BMU Expo, featuring realistic flight mechanics and interactive gameplay. Players navigate through challenging environments with smooth controls and stunning visuals.',
    subdesc:
      'Built with React.js and React Three Fiber, this project showcases advanced 3D rendering capabilities and game development skills using modern web technologies.',
    href: '#',
    texture: '/textures/project/project1.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'Three.js',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'React Three Fiber',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'JavaScript',
        path: '/assets/framer.png',
      },
    ],
  },
  {
    title: 'Code Medic - Hackathon Project',
    desc: 'An AI-powered code assistant developed during a hackathon. Code Medic helps developers debug, optimize, and understand code through intelligent analysis powered by OpenAI.',
    subdesc:
      'Built with React for the frontend and Express.js for the backend, integrated with OpenAI APIs to provide smart code suggestions and explanations.',
    href: '#',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#13202F',
      border: '0.2px solid #17293E',
      boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'Express.js',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'OpenAI',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Node.js',
        path: '/assets/framer.png',
      },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) =>
{
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'NexGen Club',
    pos: 'Team Lead of BMU',
    duration: '2024 - Present',
    title: "Leading the NexGen Club at Bhagwan Mahavir University, organizing tech events and mentoring fellow students in web development and programming.",
    icon: '/assets/framer.svg',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'InnovationX Hackathon',
    pos: 'Hackathon Champion',
    duration: '2024',
    title: "Led my team to victory at the InnovationX Hackathon, showcasing my ability to deliver innovative solutions under pressure with Code Medic project.",
    icon: '/assets/figma.svg',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Bhagwan Mahavir University',
    pos: 'Diploma in Computer Engineering',
    duration: '2023 - 2026',
    title: "Pursuing diploma in Computer Engineering with CGPA 9.1. Building strong foundation in programming (JavaScript, Python, C, C++, Java) and web development.",
    icon: '/assets/bmu_logo.jpg',
    animation: 'salute',
  },
];