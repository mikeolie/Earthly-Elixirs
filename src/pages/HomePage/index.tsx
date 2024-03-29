import Menu from "../../components/AdminMenu";

function HomePage(): JSX.Element {
  return (
    <div>
      <Menu />
      <div>
        <h3>Unlock the Power of CBD & Elevate Your Wellness Journey!</h3>
        <button>Shop</button>
      </div>
      <div>
        <header>Discover</header>
        <input type="text" />
        <section>
          <h4>Shop By</h4>
        </section>
        <section>
          <h4>Categories</h4>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
