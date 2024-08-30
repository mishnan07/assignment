import React, { useState } from 'react';
import SideItems from './SideItems';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(!open);
  };

  return (
    <div className='w-[18%]'>
      <aside className="flex-shrink-0 hidden w-full h-screen  bg-white border-r dark:border-primary-darker dark:bg-darker md:block">
        <div className="flex flex-col h-full">
          <nav aria-label="Main" className="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">
            {/* Rest of your code */}
            <SideItems />

          </nav>

          <div className="flex-shrink-0 px-2 py-4 space-y-2">

            <button
              onClick={() => {
                // Define your openSettingsPanel function here
              }}
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 text-sm text-black rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-dark focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
            >
              <span aria-hidden="true">
                {/* Insert SVG for the icon */}
              </span>
              <span>Customize</span>
            </button>


          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
