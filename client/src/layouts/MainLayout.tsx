import React from 'react';
import { PropsWithChildren } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const DEFAULT_TITLE = "Main Layout";

interface MainLayoutProps {
  title?: string;

}

const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = ({ title = DEFAULT_TITLE, children }) => {
 return (
 <>
  <Header title={title} />

  <main>
    {children}
  </main>

  <Footer />
 </>
 );
};
export default MainLayout;