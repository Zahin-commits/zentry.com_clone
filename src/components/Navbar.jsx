import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const navItems = ["Nexus","Vault","Prologue","About","Contact"]

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndActive, setIsIndActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true);
    
    const {y:currentScrollY} = useWindowScroll();

    useEffect(()=>{
      if(currentScrollY===0){
        setIsNavVisible(true);
        navRef.current.classList.remove('floating-nav');
      }else if(currentScrollY > lastScrollY){
        setIsNavVisible(false);
        navRef.current.classList.add('floating-nav')
      }else if(currentScrollY < lastScrollY){
        setIsNavVisible(true);
        navRef.current.classList.add('floating-nav')
      }
      setLastScrollY(currentScrollY);
    },[currentScrollY])

    useGSAP(()=>{
       gsap.to(navRef.current,{
        y: isNavVisible? 0 : -100,
        opacity: isNavVisible? 1 : 0,
        duration: 0.2
       })
    },[isNavVisible]);

    const navRef = useRef(null);
    const audioRef = useRef(null)

    const toggleAudioInd = ()=>{
      setIsAudioPlaying((prev)=>!prev);
      setIsIndActive((prev)=>!prev);
    }

    useEffect(()=>{
      if(isAudioPlaying){
        audioRef.current.play();
      }else{
        audioRef.current.pause();
      }
    },[isAudioPlaying])
  return (
    <div ref={navRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6' >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full justify-between items-center p-4">
            <div className="flex items-center gap-7">
                <img src="/img/logo.png" alt="logo" className='w-10' />
                <Button 
                 id={'product-btn'}
                 title={'Products'}
                 rightIcon={<TiLocationArrow/>}
                 containerClass={'bg-blue-50 md:flex hidden items-center justify-center gap-1'}
                />
            </div>

            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item,index)=>(
                  <a key={index} href={`#${item.toLocaleLowerCase()}`} className='nav-hover-btn'>
                    {item}
                  </a>
                ))}
              </div>

              <button className="ml-10 flex items-center space-x-0.5"
               onClick={toggleAudioInd}
              >
                <audio src="/audio/loop.mp3" ref={audioRef} className='hidden' loop/>
                  {[1,2,3,4].map(bar=>(
                    <div key={bar} className={`indicator-line ${isIndActive ? 'active':''}`} style={{animationDelay:`${bar*0.1}s`}}/>
                  ))}
              </button>
            </div>
          </nav>
        </header>
    </div>
  )
}

export default Navbar