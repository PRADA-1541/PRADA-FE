import React from 'react';
import './Footer.scss';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const developers = ['공명규', '김준하', '나주영', '유정호', '조완식', '홍다연'];

  return (
    <footer className='footerContainer'>
      <div className='projectInfo'>
        <span>Email</span>
        <div className='developerEmail'>junhakjh@ajou.ac.kr</div>
        <span>Developers</span>
        <div className='developerName'>
          {developers.map((name, idx) => {
            return (
              <span key={idx} className='developers'>
                {name}
              </span>
            );
          })}
        </div>
        <span>Copyright</span>
        <div className='developer'>이건 머해야되지</div>
      </div>
      <div className='guide'>
        19세 이상의 법적 음주 허용 소비자를 위한 콘텐츠입니다.
        {!isMobile && <br />}
        지나친 음주는 뇌졸중, 기억력 손상이나 치매를 유발합니다. 임신 중 음주는 기형아 출산 확률을 높입니다.
      </div>
    </footer>
  );
};

export default Footer;
