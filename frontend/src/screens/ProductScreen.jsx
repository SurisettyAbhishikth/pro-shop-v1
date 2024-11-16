import React from 'react'
import { useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form,Row,Col,Image,ListGroup,Card,Button, ListGroupItem } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { addToCart } from '../slices/cartSlice'
import { useGetProductDetailsQuery } from '../slices/productApiSlice'
const ProductScreen = () => {
   


    const  { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [qty,setQty]=useState(1);

  

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    const addToCartHandler=()=>
        {
            dispatch(
                addToCart({...product ,qty})
    
                
            );
            navigate('/cart');
        }

   
   
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>
    Go  Back
    
    </Link>
    {isLoading ? (
        <Loader />
    ):error ? (
        <Message variant='danger'>
        {error?.data?.message || error.error}
        </Message>
    ):(
         <Row>
         <Col  md={5}>
         <Image src={product.image} alt={product.name} fluid rounded />
         
         </Col>
         <Col md={4}>
         <ListGroup variant='flush'>
             <ListGroup.Item>
                 <h3>{product.name}</h3>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Rating value={product.rating} text={`${product.numReviews} reviews`} />
             </ListGroup.Item>
             <ListGroup.Item>
                 Price: ₹{product.price}
             </ListGroup.Item>
             <ListGroupItem>
                 Description: {product.description}
             </ListGroupItem>
         
 
         </ListGroup>
         
         </Col>
         <Col  md={3}>
         <Card>
             <ListGroup>
                 <ListGroup.Item>
                     <Row>
                         <Col>Price:</Col>
                         <Col>
                        <strong>₹{product.price}</strong> 
                         </Col>
                     </Row>
                 </ListGroup.Item>
                 <ListGroup.Item>
                     <Row>
                         <Col>Status:</Col>
                         <Col>{product.countInStock>0 ? 'Instock':'Out of Stock'}</Col>
                     </Row>
                 </ListGroup.Item>
                 {product.countInStock>0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Qty
                            </Col>
                            <Col>
                            <Form.Control as='select' value={qty} onChange={(e)=>setQty(Number(e.target.value))}>
                                {[...Array(product.countInStock).keys()].map((x)=>
                                <option key={x+1} value={x+1}>{x+1}</option>
                                )}


                            </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                 )}



                 <ListGroupItem>
                     <Button className='btn-block' type='button' disabled={product.countInStock===0}
                     onClick={addToCartHandler}>
                     
                         Add To Cart
                     </Button>
                 </ListGroupItem>
             </ListGroup>
         </Card>
 
         </Col>
     </Row>
    )}

    
    </>
  
  )
}

export default ProductScreen