import React from 'react'
import { useState } from 'react';
import styles from './home.module.css'
import search from '../images/search.png';
import Tracking from '../images/Tracking.png';
import Tick from '../images/Tick Box.png';
import bur from '../images/bur.png';
import ph from '../images/ph.png';
import bell from '../images/bell.png';
import five from '../images/five.png';
import six from '../images/six.png';
import seven from '../images/seven.png';
import eight from '../images/eight.png';
import oline from '../images/oline.png';
import final from '../images/final.png'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const pizzaimg='https://res.cloudinary.com/dgkcgjcw5/image/upload/v1732124874/jcpughvsh7vrgzytjuwy.png'
  const noodle='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732125922/rfmdqxavq34qyvczkyp7.png'
  const orange='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732127051/myan3sehcoxfw9sl33bn.png'
  const messages='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732127813/jd0qihzlr8nirq2phl6j.png'
  const mess2="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732129941/sffedttusllktyqwtoip.png"
  const mess3="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732130709/z6clzlcew99y6ipffpdg.png"
  const mess4="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732130805/lwhevo0ejg52agyi89fx.png"
  const box2="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732134167/ovlapmvqwvfcfk673q1y.png"
  const box3="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732167652/i7v7nktxxtoetkl1pvad.png"
  const mc="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732168937/f8wzlrbubhdaftfzv6wl.png"
  const pj="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169051/bpbwgyfpqtlj81bgzrfz.png"
  const kf="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169073/vicjxosa0cxwzikn5ehn.png"
  const te="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169127/rdgawyjykuq77jhtlx9p.png"
  const bk="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169162/yaqkuqwnyqq58inqfgfd.png"
  const sh="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732169200/xgyshqqj4kou9uek0cdv.png"
  const b5="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732174658/lh1txtbiuyiuptwsh7pb.png"
  const part="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732175453/xcsfverrzegvskxqugny.png"
  const ride="http://res.cloudinary.com/dgkcgjcw5/image/upload/v1732175472/cxhb9uit6xlcrclaqrr9.png"
  const homing='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1733223541/acgqpsxu2twpfdqwydm6.png'
 
  const navigate=useNavigate() 
  const rester=()=>{
    navigate('/restaurants')
  }
  return (
<>
<div className={styles.hom}><img src={homing} className={styles.hm3}/></div>

<div className={styles.box1}>
<div className={styles.ps}>

<div className={styles.p1}>Order Restaurant food, takeaway and groceries.</div>
 <div className={styles.p2}>Feast Your Senses,</div>
 <div className={styles.p3}>Fast and Fresh</div>
 <div className={styles.me2}> We’ve Received your order!<div className={styles.m2}>Awaiting Restaurant acceptance</div>
 <div>
 <img src={Tracking} alt="track" className={styles.track} /></div>
  </div>
<div className={styles.me1}>Order Accepted! <div  className={styles.m1}>Your order will be delivered shortly</div>
<div> <img src={Tick} alt="Tick" className={styles.tick}/></div>
</div>
 <img src={search} alt="cart" className={styles.search} />
 <div>
 <div>
 <img src={mess4} alt="mess4" className={styles.mess4} />
 </div>
 <div>
 <img src={mess2} alt="mess2" className={styles.mess2} />
 </div>
 <div>
 <img src={mess3} alt="mess3" className={styles.mess3} />
 </div>
 <div className={styles.mess}>
 
 <img src={messages} alt="messages" className={styles.messages} />
 </div>
 <img src={pizzaimg} alt="pizza" className={styles.pizza} />
 </div>
 <div>
 <img src={noodle} alt="noodle" className={styles.noodle} />
 </div>
 <div>
 <img src={orange} alt="orange" className={styles.orange} />
 </div>

 
</div>
</div>
<div className={styles.boxtwo}> <img src={box2} alt="box2" className={styles.box2} />
</div>
<div className={styles.b3}> <img src={box3} alt="box3" className={styles.box3} />
</div>
<div className={styles.pr}>Popular Restaurants</div>



  
  <div className={styles.elem} >
 
  <div className={styles.mc1}>

  <div><img src={mc} alt="mc" className={styles.mc} onClick={rester} /></div>
  </div>
   
   <div className={styles.pj2}> 
    <div><img src={pj} alt="pj" className={styles.pj} onClick={rester}/></div>
    </div>

   <div className={styles.kf3}> 
    <div><img src={kf} alt="kf" className={styles.kf} onClick={rester}/></div>
   </div>
   
   <div className={styles.tx4}>
   <div><img src={te} alt="te" className={styles.te} onClick={rester}/></div>
   </div>
    
    <div className={styles.bk5}>
    <div><img src={bk} alt="bk" className={styles.bk} onClick={rester}/></div>
    </div>

  <div className={styles.sh6}>
  <div><img src={sh} alt="sh" className={styles.sh} onClick={rester}/></div>
  </div>
  </div>

  <div className={styles.box5}>
 
 <img src={b5} alt="b5" className={styles.b5} />
 </div>

 <div className={styles.part}>
 
 <img src={part} alt="part" className={styles.part} />
 </div>
 <div className={styles.part}>
 
 <img src={ride} alt="ride" className={styles.ride} />
 </div>


 < div className={styles.botm}>
 <div className={styles.nb1}>
 <p className={styles.know}>Know more about us!</p>

 <div className={styles.info}>
  <p>Frequent Questions </p>
  <p> Who we are?</p>
  <p>Partner Program </p>
  <p> Help & Support</p>
 </div>
  <div className={styles.nb2}>
    <div className={styles.lis}>
   
   <p className={styles.para1}> How does Order.UK work? </p>
 <p className={styles.para2}> What payment methods are accepted?</p>
    <p className={styles.para3}>Can I track my order in real-time?</p>
    <p className={styles.para4}>Are there any special discounts or </p><p className={styles.para6}>promotions available?</p>
    <p className={styles.para5}>Is Order.UK available in my area?</p>
  

    </div>
  
<div className={styles.nb6}>
<div className={styles.nb3}><p className={styles.orders}>Place an Order!</p> <img src={bell} alt="bell" className={styles.bell} /> 
<p className={styles.p5}>Place order through our </p><p className={styles.p6}>website or Mobile app</p></div>
<div className={styles.nb4}> <p  className={styles.orders}>Track Progress</p><img src={bur} alt="bur" className={styles.bur}/>
<p className={styles.p7}>Your can track your order status with delivery time</p></div>
<div className={styles.nb5}> <p  className={styles.orders}>Get your Order!</p><img src={ph} alt="ph" className={styles.ph}/>
<p className={styles.p9}>Receive your order at a </p><p className={styles.p10}>lighting fast speed!</p></div>
</div>
<div className={styles.op}>
<p className={styles.op1}>Order.UK simplifies the food ordering process. Browse through our diverse menu, </p>
<p className={styles.op2}>select your favorite dishes, and proceed to checkout. Your delicious meal will be </p>
<p className={styles.op3}>on its way to your doorstep in no time!</p>
</div>
  </div>
 </div>
 

 <div className={styles.orange3}>


  <div className={styles.oj3}>
  <p><img src={five} alt="five" className={styles.five} /><div className={styles.lines1}><img src={oline} alt="five" className={styles.oline1} /></div> </p>
  <p><img src={six} alt="five" className={styles.five} /><div className={styles.lines2}> <img src={oline} alt="five" className={styles.oline1} /></div></p>
  <p><img src={seven} alt="five" className={styles.five} /><div className={styles.lines3}> <img src={oline} alt="five" className={styles.oline1} /></div></p>
  <p><img src={eight} alt="five" className={styles.five} /></p>
  </div>
 </div>

 <div><img src={final} alt="final" className={styles.final} /></div>
 </div>
</>
   
  )
}

export default Home