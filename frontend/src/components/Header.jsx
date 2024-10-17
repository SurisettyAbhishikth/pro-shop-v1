import React from 'react'
import {Badge, Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart,FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import logo from '../assets/logo.png'


const Header = () => {
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const {userInfo} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
       
       try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        // NOTE: here we need to reset cart state for when a user logs out so the next
        // user doesn't inherit the previous users cart and shipping
        // dispatch(resetCart());
        navigate('/login');
      } catch (err) {
        console.error(err);
      }
      };

  return (
    <header>
        <Navbar bg='dark' varient='dark' expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>  
                <Navbar.Brand >
                <img src={logo} alt='Proshop'/>
                AbsolutePro</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer  to='/cart'>
                        <Nav.Link href="/cart">
                        <FaShoppingCart/>
                        Cart
                        {
                            cartItems.length>0 &&(
                                <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                    {cartItems.reduce((a,c)=>a+c.qty,0)}
                                </Badge>

                            )
                        }
                        </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <>
                             <NavDropdown title={userInfo.name} id='username'>
                             <NavDropdown.Item  to='/profile'>
                               Profile
                             </NavDropdown.Item>
                             <NavDropdown.Item onClick={logoutHandler}>
                               Logout
                             </NavDropdown.Item>
                           </NavDropdown>
                           </>
                        ) : ( <LinkContainer to='/login' >

<Nav.Link href='/login'>
    <FaUser/>
    Sign in
    </Nav.Link>
</LinkContainer>)}
                       
                    </Nav>


                </Navbar.Collapse>

            </Container>
        </Navbar>
    </header>
  )
}

export default Header