import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

function Navbar() {
  return (
    <Wrapper>
      <div className="nav-center">
        <span className="logo">MixMaster</span>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/newsletter" className="nav-link">
            Newsletter
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  background-color: var(--white);

  .nav-center {
    width: var(--view-width);
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 2.2rem;
    color: var(--primary-500);
    font-weight: 700;
    letter-spacing: 2px;
  }

  .nav-links {
    display: flex;
    gap: 0.5rem;
  }

  .nav-link {
    color: var(--grey-900);
    padding: 0.5rem 0.5rem 0.5rem 0;
    transition: var(--transition);
    letter-spacing: 2px;
    font-weight: 500;
  }

  .active,
  .nav-link:hover {
    color: var(--primary-500);
  }

  @media (max-width: 768px) {
    .logo {
      font-size: 1.8rem;
    }

    .nav-center {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .nav-links {
      flex-direction: column;
      margin-top: 0.8rem;
    }
  }
`;

export default Navbar;
