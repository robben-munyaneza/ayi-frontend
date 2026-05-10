// Default content – used when no admin has saved changes yet.
// Images are referenced by a key; the actual import is handled by each component.

export const defaultTeamMembers = [
  { id: '1', name: 'Paul HAKUZIMANA', role: 'Chief Executive Officer', email: 'hakuzapaul@gmail.com', phone: '+250782029528', imageKey: 'paul', image: null },
  { id: '2', name: 'ADRIEN NIYIBIGIRA', role: 'Chief Operations Officer', email: 'adrienniyibigira@gmail.com', phone: '+250787524578', imageKey: 'adrien', image: null },
  { id: '3', name: 'MURARA Geofrey', role: 'Administrative Manager', email: 'geofreymurara@gmail.com', phone: '+250780763207', imageKey: 'murara', image: null },
  { id: '4', name: 'Devotha IKUZWE', role: 'Finance Manager', email: 'devothaikuzwe2021@gmail.com', phone: '+250789899108', imageKey: 'devotha', image: null },
  { id: '5', name: 'HABIMANA Xavier', role: 'Dir. Customer Experience', email: 'xavierhabimana00@gmail.com', phone: '+250785510884', imageKey: 'xavier', image: null },
  { id: '6', name: 'DUSABE IHIRWE', role: 'Customer Support Officer', email: 'ihirweimmaculee@gmail.com', phone: '+250786074811', imageKey: 'immaculee', image: null },
  { id: '7', name: 'Jean Damour', role: 'Training & Capacity Dir.', email: 'tuyizerej92@yahoo.com', phone: '+250786960424', imageKey: 'tuyizere', image: null },
  { id: '8', name: 'Mugisha Gilbert', role: 'Dir. of AYI Capital', email: 'mugishagilbert41@gmail.com', phone: '+250786459304', imageKey: 'gilbert', image: null },
  { id: '9', name: 'Rukundo Dieudonne', role: 'AYI Group Director', email: 'rukudieu12@gmail.com', phone: '+250785063133', imageKey: 'rukundo', image: null },
  { id: '10', name: 'Mugemana Aime', role: 'Tourism & Hospitality', email: 'mugemandayishimiyeaime@gmail.com', phone: '+250787228096', imageKey: 'mugema', image: null },
];

export const defaultInsights = [
  { id: '1', title: 'Empowering Youth Through Financial Education', category: 'Education', date: 'Feb 12, 2025', link: '#', imageKey: 'invest', image: null },
  { id: '2', title: 'The Future of Youth-Driven Investments', category: 'Investment', date: 'Jan 25, 2025', link: '#', imageKey: 'invest1', image: null },
  { id: '3', title: 'How Innovation Drives People Empowerment', category: 'Innovation', date: 'Dec 15, 2024', link: '#', imageKey: 'people', image: null },
  { id: '4', title: 'Creating Sustainable Economic Opportunities', category: 'Sustainability', date: 'Nov 10, 2024', link: '#', imageKey: 'tree', image: null },
];

export const defaultObjectives = {
  mission: "Equipping young people with the financial tools, investment opportunities, and entrepreneurial support they need to build wealth. By fostering a culture of smart saving, we empower the next generation to shape Africa's economy.",
  vision: "A future where African youth lead the way in financial empowerment, turning dreams into thriving businesses through smart capital ventures, driving economic growth and creating widespread opportunity.",
  values: [
    { id: '1', title: 'Integrity', desc: 'Honesty and strong moral principles in all we do.' },
    { id: '2', title: 'Ambitious', desc: 'Driven to achieve excellence beyond expectations.' },
    { id: '3', title: 'Accountability', desc: 'Taking full responsibility for our actions.' },
    { id: '4', title: 'Collaboration', desc: 'Valuing teamwork to drive innovation.' },
  ],
  objectives: [
    { id: '1', title: 'Profitability', desc: 'Financing growth to provide robust investment resources.' },
    { id: '2', title: 'Customer First', desc: 'Delivering the highest quality and greatest possible value.' },
    { id: '3', title: 'Innovation (Tech)', desc: 'Building on our technology to enable continuous growth.' },
    { id: '4', title: 'Social Impact', desc: 'Acting as an economic, intellectual, and social asset.' },
  ],
};

export const defaultStats = [
  { id: '1', value: '6+', label: 'Services' },
  { id: '2', value: '10K+', label: 'Youth Members' },
  { id: '3', value: '5+', label: 'Countries' },
  { id: '4', value: '24/7', label: 'Support' },
];
