import chefClaudeLogo from "../images/chef-claude-icon.png";

function Header() {
  return (
    <header className="header-container">
      <img className="logo" src={chefClaudeLogo} alt="Chef Claude icon" />
      <h1 className="logo-title">Chef Claude</h1>
    </header>
  );
};

export { Header }