import { FC, PropsWithChildren } from 'react';

const Layout:FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className='my-12 mx-auto max-w-3xl'>
      {children}
    </main>
  );
};
export default Layout;
