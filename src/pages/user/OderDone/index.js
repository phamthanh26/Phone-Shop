import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Steps } from 'antd';

import 'moment/locale/vi'
import history from '../../../utils/history';
import './style.css'




function OderDone({

}) {
    const { Step } = Steps;
  return (
    <>
      <div style={{ backgroundColor: 'white' }}>
        <div style={{ margin: '0px 50px 0px 50px' }}>
        <div className="oder-steps-pay" >
        <Steps current={2} percent={60} >
          <Step />
          <Step />
          <Step />
        </Steps>   
        </div>
        <div  className="done-main">
        <div style={{fontSize : '30px' ,textAlign : 'center', marginTop : '100px'}}> Cảm ơn bạn đã mua hàng của cửa hàng chúng tôi.  </div>
        {/* <div style={{fontSize : '25px' ,textAlign : 'center', marginTop : '10px'}}>Bạn có thể theo dõi đơn hàng của bạn tại đây</div> */}
        <button className="done-btn" onClick={() => history.push('/orderUser')} >Xem đơn hàng</button>
        </div>
      </div>
</div>
    </>
  )
}

export default(OderDone);