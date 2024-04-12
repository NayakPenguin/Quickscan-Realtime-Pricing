import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import img1 from "../Assets/img1.png"
import img2 from "../Assets/img2.png"

// Material Ui Icons
import CallMadeIcon from '@material-ui/icons/CallMade';

const LandingPage = () => {
  return (
    <Container>
      <Navbar >
        <div className="left">
          <img src="https://live.staticflickr.com/65535/49816898282_e611b8f730_b.jpg" alt="" />
        </div>
        <div className="right">
          <a href="/" className="normal-link">Demo Explaination Video <CallMadeIcon/></a>
          <a href="/" className="login-btn">Login</a>
        </div>
      </Navbar>
      <Pages>
        <div className="page1">
          <div className="left">
            <img src={img1} alt="" />
          </div>
          <div className="right">
            <h1>Contact-less QR Digital Menu</h1>
            <p>Create a digital menu for your Restaurant or Bar. Engage more with your Customers.</p>

            <b>Their mobile phone is now your menu!</b>
            
            <div className="bottom">
              <input type="text" placeholder="Restaurant or bar name"/>
              <input type="text" placeholder="Your email"/>
              <input type="text" placeholder="+91 93061-91179"/>
              <div className="submit-btn">Contact Now!</div>
            </div>
          </div>
        </div>
        <div className="page2 bg-2">
          <h3>What do you get as a Restaurant</h3>
          <div className="desc">Zomato Partner Platform helps you take your business to new heights instantly with no hassle and 100% transparency!</div>
          <div className="features">
            <div className="feature">
              <div className="feat-num">1</div>
              <div className="feat-info">
                <h4>Restaurant Partner app</h4>
                <p>Manage all your orders on your smartphone with our Android app</p>
              </div>
            </div>
            <div className="feature">
              <div className="feat-num">2</div>
              <div className="feat-info">
                <h4>Restaurant Partner app</h4>
                <p>Manage all your orders on your smartphone with our Android app</p>
              </div>
            </div>
            <div className="feature">
              <div className="feat-num">3</div>
              <div className="feat-info">
                <h4>Restaurant Partner app</h4>
                <p>Manage all your orders on your smartphone with our Android app</p>
              </div>
            </div>
            <div className="feature">
              <div className="feat-num">4</div>
              <div className="feat-info">
                <h4>Restaurant Partner app</h4>
                <p>Manage all your orders on your smartphone with our Android app</p>
              </div>
            </div>
            <div className="feature">
              <div className="feat-num">5</div>
              <div className="feat-info">
                <h4>Restaurant Partner app</h4>
                <p>Manage all your orders on your smartphone with our Android app</p>
              </div>
            </div>
          </div>
        </div>
        <div className="page2">
          <h3>What features users get</h3>
          <div className="desc">Zomato Partner Platform helps you take your business to new heights instantly with no hassle and 100% transparency!</div>
          <div className="features">
            <div className="feature">
              <div className="feat-num">1</div>
              <div className="feat-info">
                <h4>Restaurant Partner app</h4>
                <p>Manage all your orders on your smartphone with our Android app</p>
              </div>
            </div>
            <div className="feature">
              <div className="feat-num">2</div>
              <div className="feat-info">
                <h4>Restaurant Partner app</h4>
                <p>Manage all your orders on your smartphone with our Android app</p>
              </div>
            </div>
            <div className="feature">
              <div className="feat-num">3</div>
              <div className="feat-info">
                <h4>Restaurant Partner app</h4>
                <p>Manage all your orders on your smartphone with our Android app</p>
              </div>
            </div>
          </div>
        </div>
      </Pages>
      <Footer>
        <div className="left">
          <h1>SLURP</h1>
          <div className="desc">A complete food order management solution for restaurants, hotels, cafes, bars, food courts, and corporates in one application.</div>
          <div className="contact">
            <div className="title">Contact</div>
            <a href="/">nayak@slurp.in</a>
            <a href="/">(+91) 93061-91179</a>
          </div>
        </div>
        <div className="right">
          <h1>Pages</h1>
          <div className="links">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms and Conditions</a>
            <a href="/">Cookie Policy</a>
            <a href="/">Refund and Cancellation</a>
            <a href="/">Support Policy</a>
            <a href="/">Careers</a>
          </div>
        </div>
      </Footer>
    </Container>
  )
}

export default LandingPage

const Container = styled.div`
  position: relative;
  background-color: #fff6e659;
`

const Navbar = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border-bottom: 1px solid black; */
  background-color: white;
  border-bottom: 1px solid #e8e1d6;
  padding: 25px 50px;

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
      font-size: 0.9rem;
      margin: 0 10px;
      text-decoration: none;

      font-weight: 500;
    }

    .normal-link{
      display: flex;
      align-items: center;

      svg{
        font-size: 1rem;
        margin-left: 5px;
      }
    }

    .login-btn{
      padding: 10px 20px;
      background-color: #97daa7;
      border-radius: 5px;
    }
  }
`

const Pages = styled.div`
  /* padding: 0 50px; */
  padding-top: 130px;

  .page1{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 130px);

    .left{
      width: 500px;
      
      img{
        width: 100%;
        border-radius: 5px;
      }
    }

    .right{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      width: 500px;
      height: 500px;
      margin-left: 100px;
      padding-bottom: 5px;
      

      h1{
        font-size: 2.75rem;
        line-height: 4rem;
        font-weight: 500;
      }

      p{
        font-size: 0.9rem;
      }

      b{
        font-size: 0.9rem;
        font-weight: 500;
      }

      .bottom{
        input{
          width: 100%;
          margin-top: 10px;
          padding: 12.5px 17.5px;
          box-shadow: rgba(28, 28, 28, 0.1) 0px 4px 16px;
          border: 1px solid #d8d8d8;
          border-radius: 5px;
          font-size: 0.85rem;
        }
  
        .submit-btn{
          padding: 10px 20px;
          background-color: #97daa7;
          border-radius: 5px;
          border: none;
          box-shadow: rgba(28, 28, 28, 0.1) 0px 4px 16px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-top: 20px;
          width: 100%;
          text-align: center;
          border: 1px solid #a3a2a2;
        }
      }

    }
  }

  .page2{
    padding: 75px calc(50vw - 550px);
    
    h3{
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .desc{
      font-size: 0.9rem;
      margin: 10px 0;
    }

    .features{
      display: flex;
      flex-direction: column;
      padding-top: 50px;

      .feature{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 400px;
        margin: 25px 0;
        
        .feat-num{
          height: 40px;
          width: 40px;
          border-radius: 50%;
          /* border: 1px solid black; */
          background-color: #ffefd0;
          display: grid;
          place-items: center;
        }
        
        .feat-info{
          width: calc(100% - 60px);
          
          h4{
            font-size: 0.95rem;
            font-weight: 400;
          }
  
          p{
            font-size: 0.8rem;
            font-weight: 200;
          }
        }
      }
    }
  }

  .bg-2{
    background-color: white;
  }
`

const Footer = styled.div`
  padding: 75px 100px;
  background-color: #25454b;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .left{
    width: 350px;

    h1{
      color: white;
      font-weight: 500;
      font-size: 3.25rem;
      letter-spacing: 0.5rem;
    }

    .desc{
      color: #f5f5f5b0;
      font-size: 0.85rem;
      font-weight: 200;
      line-height: 1.5rem;
      letter-spacing: 0.03rem;
    }

    .contact{
      margin-top: 20px;

      .title{
        font-size: 0.95rem;
        font-weight: 500;
        color: white;
      }

      a{
        font-size: 0.85rem;
        font-weight: 200;
        display: block;
        text-decoration: none;
        margin-top: 10px;
        color: #a7adff;
        letter-spacing: 0.07rem;
      }
    }
  }

  .right{
    h1{
      color: white;
      font-weight: 500;
      font-size: 1rem;
      letter-spacing: 0.15rem;
      text-align: right;
      margin-bottom: 20px;
    }

    .links{
      display: flex;  
      flex-direction: column;

      a{
        margin-top: 10px;
        color: #f5f5f5b0;
        font-size: 0.85rem;
        font-weight: 200;
        line-height: 1.5rem;
        letter-spacing: 0.03rem;
        text-decoration: none;
        text-align: right;
      }
    }
  }
`