import React, { FC } from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import FeaturedPlayer from '../../../Resources/images/featured_player.png'
export const Text: FC = () => {

    // eslint-disable-next-line no-lone-blocks
    {/** We need to convert it to loop */}
  const animateFirst = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: "503",
        y: "450"
      }}
      enter={{
        opacity: [1],
        x: [273],
        y: [450],
        timing: { duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            className="featured_first"
            style={{
              opacity,
              transform: `translate(${x}px,${y}px)`
            }}
          >
            League
          </div>
        );
      }}
    </Animate>
  );
  const animateNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: { duration: 1000, ease: easePolyOut }
      }}
    >
      {({ opacity, rotate }) => {
        return (
          <div
            className="featured_number"
            style={{
              opacity,
              transform: `translate(260px,170px) rotateY(${rotate}deg)`
            }}
          >
            3
          </div>
        );
      }}
    </Animate>
  );
  const animatePlayer = ():JSX.Element  => (
    <Animate
    show={true}
    start={{
        opacity:0,
    }}
    enter={{
        opacity:[1],
        timing:{delay:800,duration: 500, ease:easePolyOut}
    }}
>
    {({opacity})=>{
    return(
        <div className="featured_player"
                style={{
                    opacity,
                    background: `url(${FeaturedPlayer})`,
                    transform: `translate(550px,201px)`
                }}
        >
        </div>
    ) 
    }}
</Animate>
)
const animateSecond = ():JSX.Element => (
    <Animate
    show={true}
    start={{
        opacity:0,
        x:503,
        y:586
    }}
    enter={{
        opacity:[1],
        x:[273],
        y:[586],
        timing:{delay:300,duration: 500, ease:easePolyOut}
    }}
>
    {({opacity, x, y})=>{
    return(
        <div className="featured_second"
                style={{
                    opacity,
                    transform: `translate(${x}px,${y}px)`
                }}
        >
            Championships
        </div>
    ) 
    }}
</Animate>
)
  return <div className="featured_text">
      {animatePlayer()}
      {animateNumber()}
      {animateFirst()}
      {animateSecond()}
      </div>;
};
export default Text;
