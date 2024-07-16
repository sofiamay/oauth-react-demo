import React from 'react';
import { PropsWithChildren } from 'react';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
 return (
 <div>
  <header>
    {/* Header content goes here */}
  </header>

  <main>
    {children}
  </main>

  <footer>
    {/* Footer content goes here */}
  </footer>
 </div>
 );
};
export default MainLayout;