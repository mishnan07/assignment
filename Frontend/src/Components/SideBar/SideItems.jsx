import React, { useState } from 'react';

const SidebarItem = ({ title, subItems }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className={`flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary ${
          open ? 'bg-primary-100 dark:bg-primary' : ''
        }`}
        onClick={() => setOpen(!open)}
        aria-expanded={open ? 'true' : 'false'}
      >
        {/* Your icon here */}
        <span className="ml-2 text-sm">{title}</span>
        <span className="ml-auto">
          <svg
            className={`"w-4  h-4 transition-transform transform ${open} ? 'rotate-180' : ''`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Your SVG path here */}
          </svg>
        </span>
      </button>
      {open && (
        <div className="mt-2 space-y-2 px-7" aria-label={title}>
          {subItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              role="menuitem"
              className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:text-gray-400 dark:hover:text-light hover:text-gray-700"
            >
              {item.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const SideItems = () => {
  const menuItems = [
    {
      title: 'Dashboards',
      subItems: [
        { text: 'Default', link: '../index.html' },
        { text: 'Project Management (soon)', link: '#' },
        { text: 'E-Commerce (soon)', link: '#' },
      ],
    },
    {
        title: 'FrontPages',
        subItems: [
          { text: 'Default', link: '../index.html' },
          { text: 'Project Management (soon)', link: '#' },
          { text: 'E-Commerce (soon)', link: '#' },
        ],
      },
   
    // Add other menu items similarly
  ];

  return (
    <div>
      <nav aria-label="Main" className="px-2 py-4 space-y-2 ">
        {menuItems.map((menuItem, index) => (
            <div className=''>
          <SidebarItem  key={index} title={menuItem.title} subItems={menuItem.subItems} />
            </div>
        ))}

      </nav>
    </div>
  );
};

export default SideItems;
