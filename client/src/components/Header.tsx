interface HeaderProps {
  title?: string;
}

function Header({ title = "Page Header" }: HeaderProps) {
  return (
  <header className=" relative shadow-lg px-3 py-2 bg-dark-color">
    <nav className="flex justify-center">
      <div>
        <h1 className="text-white">{title}</h1>
      </div>
    </nav>
  </header>
  );
}

export default Header;