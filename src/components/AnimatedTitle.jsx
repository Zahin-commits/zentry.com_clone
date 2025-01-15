import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

const AnimatedTitle = ({title,containerClass}) => {
  const contRef = useRef(null);

  useEffect(()=>{
   const ctx = gsap.context(()=>{
     const titleAnimation = gsap.timeline({
      scrollTrigger:{
        trigger: contRef.current,
        start: '100 bottom',
        end: 'center bottom',
        toggleActions:'play none none reverse'

      }
     })

     titleAnimation.to(".animated-word",{
      opacity:1,
      transform:'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
      ease:'power2.inOut',
      stagger:0.02
     })
   },contRef);

   return ()=> ctx.revert();
  },[])
  return (
   <div 
   ref={contRef}
    // className="mt-5 text-4xl text-center uppercase leading-[0.8] sm:text-[6rem]"
    className={`animated-title ${containerClass}`}
   >
    {title.split('<br/>').map((item,index)=>(
      <div key={index} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
        {item.split(' ').map((word,i)=>(
          <span key={i} className='animated-word' dangerouslySetInnerHTML={{__html:word}} />
        ))}
      </div>
    ))}
    {/* Disc<b>o</b>ver the world's <br /> largest sh<b>a</b>red adventure */}
</div>
  )
}

export default AnimatedTitle