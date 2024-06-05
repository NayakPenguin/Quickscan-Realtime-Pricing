import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import img1 from "../Assets/Images/img1.png"

// Material Ui Icons
import CallMadeIcon from '@material-ui/icons/CallMade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const LandingPage = () => {
  // const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let prevScrollPos = 0;
  
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    prevScrollPos = currentScrollPos;
  };

  const screensData = [
    {
      "backgroundColor": "#dfe6c6",
      "title": "Easy Setup!",
      "description": "Get your restaurant up and running in minutes.",
      "link": "https://example.com/screen5",
      // "imageUrl": "https://mittenimseminar.de/wp-content/uploads/2021/08/figures-5695819_1920.jpg"
    },
    {
      "backgroundColor": "#dfe6c6",
      "title": "Effortless Ordering",
      "description": "Make ordering a breeze for your customers.",
      "link": "https://example.com/screen1",
      // "imageUrl": "https://limerrs.com/wp-content/uploads/2023/02/QR-code-technology-in-your-restaurant.jpg"
    },
    {
      "backgroundColor": "#dfe6c6",
      "title": "100% Uptime",
      "description": "Enjoy uninterrupted service, always.",
      "link": "https://example.com/screen2",
      // "imageUrl": "https://wallpapercave.com/wp/wp1874155.jpg"
    },
    {
      "backgroundColor": "#dfe6c6",
      "title": "Direct Kitchen Orders",
      "description": "Send orders straight to the kitchen, no delays.",
      "link": "https://example.com/screen3",
      // "imageUrl": "https://i.pinimg.com/originals/f9/d7/e4/f9d7e45e2c6c4334549dcdcd8aca14bf.jpg"
    },
    {
      "backgroundColor": "#dfe6c6",
      "title": "No Waiting in Queues",
      "description": "Skip the lines with our efficient ordering process.",
      "link": "https://example.com/screen4",
      // "imageUrl": "https://png.pngtree.com/thumb_back/fw800/background/20220218/pngtree-ordering-and-pickup-sign-in-restaurant-begin-queue-here-photo-image_29767000.jpg"
    },
    {
      "backgroundColor": "#dfe6c6",
      "title": "Secure Payments",
      "description": "Make payments securely online.",
      "link": "https://example.com/screen6",
      // "imageUrl": "https://etimg.etb2bimg.com/photo/98538141.cms"
    },
    {
      "backgroundColor": "#dfe6c6",
      "title": "Real-Time Updates",
      "description": "Stay updated and manage your restaurant in real-time.",
      "link": "https://example.com/screen7",
      // "imageUrl": "https://restaurants.yelp.com/wp-content/uploads/2022/10/cafe-owners-using-a-laptop-1296x729.jpeg"
    }
  ];


  const Screen = ({ backgroundColor, title, description, link, imageUrl }) => {
    return (
      <ScreenContainer style={{ backgroundColor }} imageUrl={imageUrl}>
        <Overlay />
        <Content>
          <div className="text">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="circle">
            <CallMadeIcon />
          </div>
        </Content>
        {imageUrl && <ScreenImage src={imageUrl} alt="" />}
      </ScreenContainer>
    );
  };

  const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0); /* Adjust darkness here */
    border-radius: 28px;
    z-index: 1;
  `;

  const Content = styled.div`
    position: relative;
    z-index: 2;
    padding: 10px;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .text{
      h2 {
        color: black; /* Changed default text color to white */
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 10px;
      }

      p {
        color: black; /* Changed default text color to white */
        font-size: 1.5rem;
        font-weight: 500;
      }
    }

    .circle {
      /* position: absolute; */
      height: 50px;
      aspect-ratio: 1/1;
      border-radius: 50%;
      background-color: black;
      /* bottom: 0px; */
      /* right: 0px; */

      display: grid;
      place-items: center;

      svg{
        fill: white;
      }
    }

    @media screen and (max-width: 720px) {
      .text{
        p{
          font-size: 1.25rem;
        }
      }

      .circle{
        height: 30px;
        margin-left: 5px;

        svg{
          font-size: 1rem;
        }

      }
    }

    @media screen and (max-width: 500px) {
    }

    @media screen and (max-width: 350px) {
    }
  `;

  const ScreenImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    opacity: 0;
  `;

  const ScreenContainer = styled.div`
    /* height: 350px; */
    /* aspect-ratio: 1.5/1; */
    width: 100%;
    border-radius: 28px;
    /* margin-right: 15px; */
    margin-bottom: 15px;
    padding: 20px;
    color: white;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    background-color: yellow; /* Set default background color */

    &:hover {
      ${Overlay} {
        background-color: rgba(0, 0, 0, 1); 
        transition-duration: 350ms;
      }

      ${Content} {
        h2 {
          color: white;
          transition-duration: 350ms;
        }

        p {
          color: white;
          transition-duration: 350ms;
        }

        .circle {
          background-color: white;
          transition-duration: 350ms;

          svg {
            fill: black;
            transition-duration: 350ms;
          }
        }
      }

      ${ScreenImage}{
        opacity: 1;
        transition-duration: 350ms;
      }
    }

    @media screen and (max-width: 720px) {
      padding: 60px;
    }

    @media screen and (max-width: 500px) {
      padding: 30px;
    }

    @media screen and (max-width: 350px) {
      padding: 20px;
    }
  `;

  return (
    <Container>
      <PreMenu>
        <p><b>New</b> Create a digital menu for your Restaurant or Bar. Engage more with your Customers.</p>
        <a className="learn-more" href="/">Learn More {">"} </a>
      </PreMenu>
      <Navbar visible={visible}>
        <div className="left">
          <img src="https://live.staticflickr.com/65535/49816898282_e611b8f730_b.jpg" alt="" />
        </div>
        <div className="right">
          <a href="/restaurant-login" className="login-btn">Restaurant Login <CallMadeIcon /></a>
        </div>
      </Navbar>
      <Page>
        <div className="left">
          <h1>Instant cloud development</h1>
          <p>CodeSandbox gives you 24/7 collaborative cloud development environments (CDEs) that resume in 2 seconds.</p>
          <img className="only-phone-image" src={img1} alt="" />
          <div className="btns">
            <div className="join-us-btn">
              Contact Sales
            </div>
            <div className="demo-btn">
              Schedule a demo {">"}
            </div>
          </div>
        </div>
        <div className="right">
          {/* <img src="https://qrfy.com/static/media/concepts.326302a8a527031eb92b.webp" alt="" /> */}
          <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3210540/qrcode-icon-md.png" alt="" />
        </div>
        <div className="downarrowdancer">
          <ExpandMoreIcon />
        </div>
      </Page>
      <Page2>
        <h1>Slurp Features</h1>
        <div className="super-screen-holder">
          <div className="screens-holder">
            {screensData.map((screen, index) => (
              <Screen key={index} {...screen} />
            ))}
          </div>
        </div>
      </Page2>
      <Page3>
          {/* <div className="circle">
              <p>Over <b>80,420</b> orders successfully done!</p>
          </div> */}
          <div className="text">
            Effortlessly handle increased traffic. 
            <div className="val">Let's connect!</div>
          </div>
      </Page3>
      <Footer>
          <div className="caution-text">
            *Our advanced QR technology ensures a safe and secure dining experience for your patrons, with encrypted data transmission and robust security measures in place. With Slurp, prioritize both efficiency and peace of mind, knowing that your customers' safety is always our top priority.
          </div>
          <div className="bottom">
            <div className="links">
              <a href="">About Us</a>
              <a href="">Privacy Policy</a>
              <a href="">Terms and conditions</a>
              <a href="">Contact us</a>
            </div>
            <div className="copyright">
              All commercial rights reserved 2024
            </div>
          </div>
      </Footer>
    </Container>
  )
}

export default LandingPage

const Container = styled.div`
  position: relative;
  /* background-color: #fff6e659; */
`

const Navbar = styled.div`
  z-index: 99;
  position: fixed;
  top: ${({ visible }) => (visible ? '50px' : '-120px')}; /* Hides navbar by moving it out of viewport */
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 25px 100px;
  transition: top 500ms; /* Smooth transition effect */

  .left{
    display: flex;
    align-items: center;
    
    img{
      height: 60px;
    }
  }

  .right{
    display: flex;
    align-items: center;
    
    a{
      color: #333;
      font-size: 1rem;
      margin: 0 10px;
      text-decoration: none;

      font-weight: 500;

      svg{
        font-size: 1rem;
        margin-left: 2.5px;
        margin-bottom: -2.5px;
      }
    }

    .normal-link{
      display: flex;
      align-items: center;
    }

    .login-btn{
      /* padding: 10px 20px; */
      /* background-color: #97daa7; */
      border-radius: 5px;
    }
  }

  @media screen and (max-width: 720px) {
    display: none;
  }
`

const Page = styled.div`
    width: 100vw;
    min-height: 100vh;
    padding: 100px;
    padding-top: 150px;
    background-color: #fff;
    position: relative;

    display: flex;
    /* display: none; */
    justify-content: space-between;
    flex-wrap: wrap-reverse;

    .left{
        flex: 1;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
    
        h1{
            /* text-align: center; */
            /* max-width: 700px; */
            font-size: 5rem;
            font-weight: 500;
            z-index: 1;
            line-height: 6.25rem;
        }
    
        p{
            /* text-align: center; */
            max-width: 500px;
            font-size: 1.25rem;
            font-weight: 200;
            z-index: 1;
            margin: 20px 0px 50px 0px;
        }

        .only-phone-image{
            display: none;
        }
    
        .btns{
            display: flex;
            align-items: center;

            .join-us-btn{
                padding: 10px 30px; 
                border-radius: 100px;
                background-color: black;
                color: white;
                font-size: 0.85rem;
                font-weight: 300;
            }

            .demo-btn{
                margin-left: 20px;
                font-size: 0.85rem;
                
            }
        }
    }

    .right{
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-direction: column;

        img{
            height: 400px;
            margin-left: -50px;
        }
    }
    
    .downarrowdancer {
        position: absolute;
        left: 0;
        bottom: 20px;
        width: 100vw;
        display: flex;
        justify-content: center;
        animation: bounce 500ms infinite alternate; /* Apply the animation */
    }

    .downarrowdancer svg {
        font-size: 2rem;
    }

    @keyframes bounce {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-20px); /* Adjust this value for the desired bounce range */
        }
    }

    @media screen and (max-width: 720px) {
      padding: 100px 60px;

      flex-direction: column;
      justify-content: center;
      align-items: center;

      .left{
        justify-content: center;
        align-items: center;
        
        h1{
          font-size: 2.5rem;
          line-height: 3.25rem;
          text-align: center;
        }

        p{
          text-align: center;
          font-size: 0.85rem;
          max-width: 300px;
        }

        .only-phone-image{
            display: block;
            width: 200px;
            margin-top: -30px;
            margin-bottom: 30px;
            border-radius: 1000px;
        }

        .btns{
            display: flex;
            align-items: center;

            .join-us-btn{
                padding: 7.5px 15px; 
                border-radius: 100px;
                background-color: black;
                color: white;
                font-size: 0.85rem;
                font-weight: 300;
            }

            .demo-btn{
                margin-left: 20px;
                font-size: 0.85rem;
                
            }
        }
      }

      .right{
        img{
          display: none;
          height: 200px;
        }
      }
    }

    @media screen and (max-width: 500px) {
      padding: 120px 30px;

      .left{
        justify-content: center;
        align-items: center;
        
        h1{
          font-size: 2.65rem;
          line-height: 3.15rem;
          text-align: center;
          font-weight: 500;
        }

        p{
          text-align: center;
          font-size: 0.9rem;
          max-width: 300px;
        }

        .only-phone-image{
            display: block;
            width: 200px;
            margin-top: -30px;
            margin-bottom: 30px;
            border-radius: 1000px;
        }

        .btns{
            display: flex;
            align-items: center;

            .join-us-btn{
                padding: 7.5px 15px; 
                border-radius: 100px;
                background-color: black;
                color: white;
                font-size: 0.85rem;
                font-weight: 300;
            }

            .demo-btn{
                margin-left: 20px;
                font-size: 0.85rem;
                
            }
        }
      }
    } 
`

const Page2 = styled.div`
    width: 100vw;
    padding: 100px;
    background-color: #f1f1f150;
    position: relative;

    h1{
      font-size: 3.25rem;
      font-weight: 500;
      margin-bottom: 30px;
    }

    ::-webkit-scrollbar {
      display: none;
    }

    .super-screen-holder{
      overflow-x: scroll;

      .screens-holder{
        display: flex;
        flex-wrap: wrap;
        /* width: 300px; */
      }
    }

    @media screen and (max-width: 720px) {
      padding: 60px;
      h1{
        font-size: 2rem;
      }
    }

    @media screen and (max-width: 500px) {
      padding: 30px;
    }

    @media screen and (max-width: 350px) {
      padding: 20px;
    }
`

const Page3 = styled.div`
    width: 100vw;
    padding: 100px;
    position: relative;

    .circle {
      display: flex; 
      justify-content: center;
      align-items: center;

      height: 320px;
      border-radius: 100%;
      aspect-ratio: 1/1;
      background-color: #dcff51;
      padding: 10px;
      margin-right: 10px;

      p {
        font-size: 2rem;
        font-weight: 600;
        text-align: center;
        color: black;

        b {
          color: #eb5858;
          font-weight: 600;
        }
      }
    }

    .text {
      font-size: 6rem;
      font-weight: 500;
      
      .val {
        margin-left: 20px;
        display: inline;
        color: cornflowerblue;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    @media screen and (max-width: 720px) {
      padding: 60px;
      .text {
        font-size: 4rem;
      }

      .circle p {
        font-size: 1.5rem;
      }
    }

    @media screen and (max-width: 500px) {
      padding: 30px;
      .text {
        font-size: 3rem;
      }

      .circle p {
        font-size: 1.2rem;
      }
    }

    @media screen and (max-width: 350px) {
      padding: 20px;
      .text {
        font-size: 2rem;
      }

      .circle p {
        font-size: 1.2rem;
      }
    }
`

const PreMenu = styled.div`
    z-index: 100;
    height: 50px;
    width: 100vw;
    background-color: #dcff51;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 100px;
    
    p{
        font-size: 0.8rem;
        font-weight: 300;

        b{
            border-radius: 100px;
            margin-right: 5px;
        }
    }

    b{
        background-color: black;
        padding: 5px 10px;
        font-size: 0.7rem;
        font-weight: 300;
        color: white;
    }

    .learn-more{
        background-color: black;
        padding: 5px 10px;
        font-size: 0.7rem;
        font-weight: 300;
        color: white;
    }

    @media screen and (max-width: 720px) {
        height: auto;
        background-color: #dcff51;

        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;

        padding: 10px 20px;
        
        p{
            font-size: 0.8rem;
            font-weight: 300;

            b{
                border-radius: 100px;
                margin-right: 2.5px;
                padding: 3px 10px;
                /* display: none; */
            }
        }

        b{
            background-color: black;
            padding: 5px 10px;
            font-size: 0.7rem;
            font-weight: 300;
            color: white;
        }

        .learn-more{
            margin-top: 10px;
        }        
    }
`

const Footer = styled.div`
  background-color: #eee;

  padding: 30px 100px 20px 100px;

  .caution-text{
    font-weight: 300;
    font-size: 0.85rem;
    padding-bottom: 30px;
    border-bottom: 1px solid black;
  }

  .bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;

    .links{
      display: flex;
      align-items: center;
      
      a{
        color: #333;
        text-decoration: none;
        font-size: 0.85rem;
        margin-right: 10px;
        font-weight: 500;
      }
    }

    .copyright{
      font-size: 0.85rem;
      font-weight: 500;
    }
  }

  @media screen and (max-width: 720px) {
    padding: 60px;
    .bottom {
      flex-direction: column;
      align-items: flex-start;

      .links{
        flex-direction: column;
        align-items: flex-start;
        
        padding-bottom: 20px;
        border-bottom: 1px solid black;
        width: 100%;
      }

    }

    .copyright{
      padding-top: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }

  }

  @media screen and (max-width: 500px) {
    padding: 30px;
  }

  @media screen and (max-width: 350px) {
    padding: 20px;
  }
`