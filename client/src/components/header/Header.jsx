import "./header.css";
import pesas from "../../assets/pesas.jpg"

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">The Muscle</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src={pesas}
        alt=""
      />
    </div>
  );
}
