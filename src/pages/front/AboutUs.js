function AboutUs() {
  return (
    <div className='container'>
      <div className='row justify-content-center mb-6'>
        <div className='col-lg-7 col-12'>
          <h2 className='text-primary text-center mt-4 mb-4'>關於我們</h2>
          <img
            src='https://i.imgur.com/xJWaghG.jpg'
            alt=''
            className='img-fluid mb-3'
          />
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
