import { FC, ComponentType } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';

import { LayoutProps } from './Layout.props';

export const Layout: FC<LayoutProps> = ({
  children,
  ...props
}: LayoutProps) => {
  return (
    <div className="flex h-full min-h-screen flex-col bg-slate-50" {...props}>
      <Header />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export const withLayout = <P extends object>(Component: ComponentType<P>) => {
  return function WithLayoutComponent(props: P) {
    return (
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    );
  };
};
