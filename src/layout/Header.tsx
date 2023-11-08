import TopMenu from './TopMenu';
import MidMenu from './MidMenu';
import MainMenu from './MainMenu';
export default function Header() {
  return (
    <div className="kl-header-layout">
      <div className="icon -bottom"></div>
      <div className="icon -top"></div>
      <div className="kl-container">
        <TopMenu />
        <MidMenu />
        <MainMenu />
      </div>
    </div>
  );
}
