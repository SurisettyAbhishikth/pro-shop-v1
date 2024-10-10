import React from 'react'

import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button, ListGroupItem } from 'react-bootstrap'

import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productApiSlice'
const ProductScreen = () => {
   


    const  { id: productId } = useParams();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

   
   
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>
    Go  Back
    
    </Link>
    {isLoading ? (
        <h2>Loading...</h2>
    ):error ? (
        <div>error?.data?.message||console.error(.error);
        </div>
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
                 Price: ${product.price}
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
                        <strong>${product.price}</strong> 
                         </Col>
                     </Row>
                 </ListGroup.Item>
                 <ListGroup.Item>
                     <Row>
                         <Col>Status:</Col>
                         <Col>{product.countInStock>0 ? 'Instock':'Out of Stock'}</Col>
                     </Row>
                 </ListGroup.Item>
                 <ListGroupItem>
                     <Button className='btn-block' type='button' disabled={product.countInStock===0}>
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