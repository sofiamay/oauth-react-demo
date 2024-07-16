import React from 'react';
import { PropsWithChildren } from 'react';

import Header from '../components/Header';

const DEFAULT_TITLE = "Main Layout";

interface MainLayoutProps {
  title?: string;

}

const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = ({ title = DEFAULT_TITLE, children }) => {
 return (
 <div>
  <Header title={title} />

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