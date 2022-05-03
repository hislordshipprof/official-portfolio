import "./about.css";
import Award from '../../img/award.png'
import Me from "../../img/his.jpg";

import { AppWrap, MotionWrap } from "../../wrapper";
const Abouts = () => {
  return (
    <div className="a">
      <div className="a-left">
        <div className="a-card bg"></div>
        <div className="a-card">
          <img src={Me} alt="" className="a-img" />
        </div>
      </div>
      <div className="a-right">
        <h1 className="a-title">About Me</h1>
        <p className="a-sub">
          I believe in Innovation as an Outcome of habbit not a random act It's
          not a faith in technology. It's faith in people.
        </p>
        <p className="a-desc">
          “If future generations are to remember us more with gratitude than
          sorrow, we must achieve more than just the miracles of technology. We
          must also leave them a glimpse of the world as it was created, not
          just as it looked when we got through with it.”
        </p>
        <div className="a-award">
          <img src={Award} alt="" className="a-award-img" />
          <div className="a-award-texts">
            <h4 className="a-award-title">Best Personality Awards 2022</h4>
            <p className="a-award-desc">
              People we offer services to are the ones we gain recorgnitions
              from.<br></br> My Passion has always being Humanity first above
              all things
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
// export default Abouts

export default AppWrap(
  MotionWrap(Abouts, "app__abouts"),
  "abouts",
  "app__primarybg"
);