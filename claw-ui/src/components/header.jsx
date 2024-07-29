import axios from 'axios';
import { Link } from 'react-router-dom';

const Header = () => {
  const login = async () => {
    const payload = {
      email: "ankit@mail.com",
      password: "123456"
    };
    const response = await axios.post('https://claw-assignment.onrender.com/login', payload);
    const token = response.data.token.token;
    sessionStorage.setItem('token', token);
  };

  return (
    <nav style={{ marginRight: "10px" }}>
      <Link to="/">Products</Link>
      <br />
      <Link to="/cart">Cart</Link>
      <br />
      <Link to="/orders">Orders</Link>
      <br />
      <button onClick={login}>LogIn</button>
    </nav>
  );
};

export default Header;
