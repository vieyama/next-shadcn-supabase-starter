export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  salary: number;
  avatar: string;
}

const firstNames = [
  'Alexander',
  'Emma',
  'Michael',
  'Olivia',
  'William',
  'Sophia',
  'James',
  'Isabella',
  'Benjamin',
  'Charlotte',
  'Lucas',
  'Amelia',
  'Henry',
  'Mia',
  'Sebastian',
  'Harper',
  'Jackson',
  'Evelyn',
  'Aiden',
  'Abigail',
  'Matthew',
  'Emily',
  'Samuel',
  'Elizabeth',
  'David',
  'Sofia',
  'Joseph',
  'Avery',
  'Carter',
  'Ella',
  'Owen',
  'Madison',
  'Wyatt',
  'Scarlett',
  'John',
  'Victoria',
  'Jack',
  'Aria',
  'Luke',
  'Grace',
  'Jayden',
  'Chloe'
];

const lastNames = [
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Wilson',
  'Anderson',
  'Thomas',
  'Taylor',
  'Moore',
  'Jackson',
  'Martin',
  'Lee',
  'Perez',
  'Thompson',
  'White',
  'Harris',
  'Sanchez',
  'Clark',
  'Ramirez',
  'Lewis',
  'Robinson',
  'Walker',
  'Young',
  'Allen',
  'King',
  'Wright',
  'Scott',
  'Torres',
  'Nguyen',
  'Hill',
  'Flores',
  'Green'
];

const roles = [
  'Software Engineer',
  'Senior Developer',
  'Product Manager',
  'UX Designer',
  'Data Scientist',
  'DevOps Engineer',
  'Marketing Manager',
  'Sales Representative',
  'Customer Success',
  'HR Specialist',
  'Finance Analyst',
  'Operations Manager',
  'Quality Assurance',
  'Technical Writer',
  'Business Analyst',
  'Project Manager'
];

const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Customer Success',
  'Human Resources',
  'Finance',
  'Operations',
  'Data & Analytics'
];

const avatarColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-cyan-500'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(
  startYear: number = 2020,
  endYear: number = 2024
): string {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
}

function generateSalary(role: string): number {
  const baseSalaries: Record<string, [number, number]> = {
    'Software Engineer': [70000, 120000],
    'Senior Developer': [100000, 180000],
    'Product Manager': [90000, 160000],
    'UX Designer': [65000, 110000],
    'Data Scientist': [80000, 150000],
    'DevOps Engineer': [85000, 140000],
    'Marketing Manager': [70000, 130000],
    'Sales Representative': [50000, 100000],
    'Customer Success': [55000, 95000],
    'HR Specialist': [50000, 85000],
    'Finance Analyst': [60000, 100000],
    'Operations Manager': [75000, 130000],
    'Quality Assurance': [55000, 90000],
    'Technical Writer': [60000, 95000],
    'Business Analyst': [65000, 110000],
    'Project Manager': [70000, 125000]
  };

  const [min, max] = baseSalaries[role] || [50000, 100000];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDummyData(count: number): Employee[] {
  return Array.from({ length: count }, (_, index) => {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const role = getRandomElement(roles);
    const department = getRandomElement(departments);

    return {
      id: index + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      role,
      department,
      status: Math.random() > 0.15 ? 'Active' : 'Inactive',
      joinDate: generateRandomDate(),
      salary: generateSalary(role),
      avatar: `${firstName[0]}${lastName[0]}`
    };
  });
}
