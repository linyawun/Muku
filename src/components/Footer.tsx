import { NavLink } from 'react-router-dom';
import mukuLogo from '../assets/mukuLogo-03.svg';

const footerLinks = [
  {
    title: '商店資訊',
    links: [
      { name: '關於我們', to: '/aboutUs' },
      { name: '購物須知', to: '/shoppingNotice' },
    ],
  },
  {
    title: '關注我們',
    links: [
      { name: 'Facebook', href: 'https://www.facebook.com/', external: true },
      { name: 'Instagram', href: 'https://www.instagram.com/', external: true },
    ],
  },
  {
    title: '後台管理',
    links: [{ name: '管理者登入', to: '/login' }],
  },
];

function Footer() {
  return (
    <footer className='bg-light'>
      <div className='container'>
        <div className='row py-5 justify-content-lg-between justify-content-start align-items-center'>
          <div className='col-md-5'>
            <div className='d-flex flex-md-row flex-column align-items-center mb-lg-0 mb-md-6 mb-4'>
              <img src={mukuLogo} alt='muku logo' style={{ height: '80px' }} />
              <div>
                <p className='h5 text-primary mb-0'>Muku</p>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='row justify-content-center'>
              {footerLinks.map((section, index) => (
                <div key={index} className='col-md-4'>
                  <p className='mb-1'>{section.title}</p>
                  <ul className='ps-0'>
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        {'to' in link ? (
                          <NavLink className='link' to={link.to}>
                            {link.name}
                          </NavLink>
                        ) : (
                          <a
                            className='link'
                            href={link.href}
                            target='_blank'
                            rel='noreferrer'
                            aria-label={`Go to ${link.name}`}
                          >
                            {link.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-center text-primary py-3'>
          <p className='mb-0'>
            <small>{`© ${new Date().getFullYear()} Muku All Rights Reserved.`}</small>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
