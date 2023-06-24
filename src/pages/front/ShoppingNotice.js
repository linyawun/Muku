function ShoppingNotice() {
  return (
    <div className='container'>
      <div className='row justify-content-center mb-6'>
        <div className='col-lg-7'>
          <h2 className='text-primary text-center mt-4 mb-4'>購物須知</h2>
          <div className='mb-5'>
            <h4>購物指南</h4>
            <p className='text-muted mb-3'>－お買い物ガイド－</p>
            <ul className='ps-0'>
              <li className='mb-3'>
                <i className='bi bi-suit-diamond me-1'></i>
                <span className='fw-bold'>商品下單後，幾天內會收到呢？</span>
                <ul>
                  <li>
                    現貨商品－將於　
                    <span className='fw-bold'>7工作天內(不含例假日)</span>　寄出
                  </li>
                  <li>
                    預購商品－約於收單日後　
                    <span className='fw-bold'>7-21個工作天(不含例假日)</span>
                    寄出
                  </li>
                  <li>
                    <span className='fw-bold'>
                      先到貨一定會先出貨給大家哦！
                    </span>
                  </li>
                </ul>
              </li>
              <li className='mb-3'>
                <i className='bi bi-suit-diamond me-1'></i>
                <span className='fw-bold'>Muku 提供之付款方式：</span>
                <ul>
                  <li>刷卡、ATM轉帳</li>
                </ul>
              </li>
              <li className='mb-3'>
                <i className='bi bi-suit-diamond me-1'></i>
                <span className='fw-bold'>Muku 提供之運送方式：</span>
                <ul>
                  <li>
                    超取－7-11、全家
                    <p className='mb-0'>
                      超取運費<span className='text-danger fw-bold'> $60 </span>
                      元
                    </p>
                    <p>
                      <span className='fw-bold'>
                        超取若無取貨，重新寄出將酌收運費與工本費共 $100 元
                      </span>
                    </p>
                  </li>
                  <li>
                    宅配－黑貓(常溫)
                    <p>
                      宅配運費
                      <span className='text-danger fw-bold'> $110 </span>元
                    </p>
                  </li>
                  <li className='text-danger'>
                    ＊單筆訂單滿 2500 元即可免運費
                  </li>
                </ul>
              </li>
              <li className='mb-3'>
                <i className='bi bi-suit-diamond me-1'></i>
                <span className='fw-bold'>商品是否有色差呢？</span>
                <ul>
                  <li>商品頁面的平拍圖皆有經過校色，盡量接近實品顏色哦！</li>
                  <li>
                    圖檔顏色會因不同廠牌的電腦、手機的螢幕顯示不同而有所差異，商品皆以實品為準。
                  </li>
                </ul>
              </li>
              <li className='mb-3'>
                <i className='bi bi-suit-diamond me-1'></i>
                <span className='fw-bold'>商品該如何好好保養、洗滌呢？</span>
                <ul>
                  <li>
                    衣料品皆建議乾洗或輕柔手洗，減少機洗次數才能好好保養衣服唷！
                  </li>
                  <li>
                    若需機洗，建議放入洗衣袋清洗，且深淺色衣物建議分開洗滌，避免染色。
                  </li>
                  <li>
                    不建議烘乾，避免衣物縮水。如需整燙，請以低溫墊布熨燙，溫度不可超過110℃。
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className='mb-5'>
            <h4>退換貨細則</h4>
            <p className='text-muted mb-3'>－商品の返品、交換について－</p>
            <ul className='ps-0'>
              <li className='mb-3'>
                <span className='fw-bold'>【 瑕疵退換 】</span>
                <ul>
                  <li>
                    － 如收到瑕疵或錯誤的商品內容，我們非常抱歉！請於收件日起
                    <span className='fw-bold'>三天內</span>
                    聯繫我們，並附上照片，我們會儘速處理！運費將由我們負擔。
                  </li>
                  <li>
                    － 退貨時，請
                    <span className='fw-bold'>務必保持商品及包裝完整。</span>
                  </li>
                  <li>
                    －
                    商品若因瑕疵退貨／斷貨，使原訂單未達促銷活動門檻，將不扣除原促銷活動優惠。
                  </li>
                </ul>
              </li>
              <li className='mb-3'>
                <span className='fw-bold'>【 無法退換貨之商品 】</span>
                <ul>
                  <li>－ 逾期申請換貨之訂單</li>
                  <li>－ 已拆除商品吊牌、備釦遺失</li>
                  <li>－ 下水清洗或穿著出門</li>
                  <li>－ 有明顯香水、菸味、殘妝等已使用過之味道或痕跡</li>
                  <li>
                    － 依台灣消費者保護法規定，貼身衣物（內衣褲、襪子、Bra
                    Top、背心、帽子等）與飾品（耳環、耳針、項鍊、戒指、手環等）屬個人衛生用品，基於個人衛生原則無法退換貨。
                  </li>
                </ul>
              </li>
              <li className='mb-3'>
                <span className='fw-bold'>
                  ※　以下情況非屬國際驗貨之瑕疵標準
                </span>
                <ul>
                  <li>－ ±2cm以內尺寸誤差</li>
                  <li>－ 直徑1cm以內輕微污損</li>
                  <li>－ 輕微脫線、線頭、未開釦、衣物壓痕，混線為正常現象</li>
                  <li>－ 冬季針織毛衣類正常摩擦起毬屬不可抗之變化</li>
                  <li>－ 毛料皮料及牛仔布料等商品原有之染色劑味道</li>
                  <li>－ 布料預想差異（花紋位置不同、格紋不對格等等）</li>
                </ul>
              </li>
              <li>
                <span className='fw-bold'>
                  ※　頻繁退貨多次，代表 Muku 的商品很可能不適合您！
                </span>
                <ul>
                  <li>
                    為避免浪費您的時間，未來將不再繼續交易，
                    也會視情況保留交易之權利。
                  </li>
                </ul>
              </li>
            </ul>
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
export default ShoppingNotice;
