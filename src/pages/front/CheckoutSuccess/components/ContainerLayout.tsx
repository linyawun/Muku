const ContainerLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='my-7' style={{ minHeight: 'calc((100vh - 70px) - 350px)' }}>
    {children}
  </div>
);

export default ContainerLayout;
