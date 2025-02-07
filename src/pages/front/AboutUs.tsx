import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function AboutUs() {
  return (
    <div className='container'>
      <div className='row justify-content-center mb-6'>
        <div className='col-lg-7'>
          <h2 className='text-primary text-center mt-4 mb-4'>關於我們</h2>
          <div className='mb-3'>
            <LazyLoadImage
              alt='about Muku'
              effect='blur'
              src='https://i.ibb.co/SQ55PmB/ayh1x-zzh7p.webp'
              className='w-100'
            />
          </div>
          <div className='mb-3'>
            <p>
              歡迎來到 Muku，Muku 成立於 2023
              年，是一間日系服飾選物店，主要販售日常、簡約、寬鬆自在的服飾，讓穿衣成為簡單、純粹無垢的日常。
            </p>
            <p>
              muku 在日文念作「むく」
              ，意思是「純淨」、「樸素」、「自然」，希望大家能藉由 Muku
              提供的一切事物， 找到屬於自己舒適放鬆的生活方式。
            </p>
            <p className='mb-0'>Muku 的三大特點：</p>
            <ol className='list-group list-group-numbered'>
              <li className='list-group-item border-0'>
                簡約選物風格：Muku
                的服飾設計簡單、大方，展現出日系風格的特色，適合穿搭於各種場合。Muku
                強調日常舒適感，主打寬鬆自在的穿著風格，讓人穿上後能感受到輕鬆舒適的感覺。
              </li>
              <li className='list-group-item border-0'>
                純淨自然的品牌理念：Muku
                的品牌理念為「純淨」、「樸素」、「自然」，這也是品牌名稱的意義所在。Muku
                希望透過商品的設計、選材、製作等方面，傳達出純淨自然的訴求，並引領消費者過一種舒適放鬆的生活方式。
              </li>
              <li className='list-group-item border-0'>
                注重品質與環保：Muku
                強調商品品質與環保議題，致力於選用高品質的面料，並且盡量減少對環境的影響，例如使用綠色材料、減少廢棄物產生等。同時，Muku
                也提倡可持續發展的生活方式，期望透過自身的努力，影響更多人對環境的關注與改變。
              </li>
            </ol>
          </div>
          <div className='mb-3'>
            <p className='mb-0'>
              ー <br />
              聯絡我們：
            </p>
            <p className='text-muted'>
              <small>有任何疑難雜症，歡迎聯繫我們</small>
            </p>
            <p>Facebook 🔍 muku</p>
            <p>Instagram 🔍 muku_daily</p>
            <p>官網客服 line 🔍 @muku_daily</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
