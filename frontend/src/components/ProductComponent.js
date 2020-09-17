import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {detailsProduct, saveProductReview} from '../actions/productActions';
import Rating from '../Screens/Rating';
import {Form,FormGroup,Label,Col,Input,Card,CardBody,CardTitle, Button,Table} from 'reactstrap';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';


function ProductComponent(props){
    const [qty,setQty]=useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const productReviewSave = useSelector((state) => state.productReviewSave);
    const { success: productSaveSuccess } = productReviewSave;
    const dispatch = useDispatch();
    
    const userSignIn = useSelector(state=>state.userSignIn)
    const {userInfo} = userSignIn;

    useEffect(() => {
        if (productSaveSuccess) {
          alert('Review submitted successfully.');
          setRating(0);
          setComment('');
          dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
        }
        dispatch(detailsProduct(props.match.params.id));
        return () => {
          //
        };
      }, [productSaveSuccess]);

  
      const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(
          saveProductReview(props.match.params.id, {
            name: userInfo.name,
            rating: rating,
            comment: comment,
          })
        );
      };
  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
  }

    return(
        <div>
            <div className="back-to-results">
                <Link to='/'>Back to result</Link>
            </div>
            {loading?<div>Loading....</div>:
            error?<div>{error}</div>:
            (<>
            <div className='details'>

                <div className='details-image'>
                    <img src={product.image} alt="Product"/>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            <a href="#reviews">
                            <Rating value={product.rating} text={product.numReviews+' reviews'}/>
                            </a>
                        </li>
                        <li>
                            Price: <b>${product.price}</b>
                        </li>
                        <li>        
                            Description:
                            <div>
                                {product.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                     <ul>
                         <li>
                             Price : ${product.price}
                         </li>
                         <li>
                             Status : {product.status}
                         </li>
                         <li>
                             Qty :<select value={qty} onChange={e=>{setQty(e.target.value)}}>
                             {[...Array(product.countInStock).keys()].map(x =>
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    )}
                             </select>
                         </li>
                         <li>
                         {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary" >Add to Cart</button>
                  }
                         </li>
                     </ul>
                </div>
            </div>
           { <div className="content-margined">
                <h2>Reviews</h2>
                {/* {!product.reviews.length && <div>There is no review</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))} */}
                    <li>
                        <div className="row">
                            <div className="col-4">
                            <Card className="review-card">
                        <CardTitle style={{margin:"10px"}}>
                            <h1>Write a Customer Review.</h1>
                        </CardTitle>
                        <CardBody>
                            {userInfo?
                            <Form onSubmit={submitHandler}>
                                <FormGroup>
                                    <Label htmlFor="rating" >Rating</Label>
                                    <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="comment" md={{size:2}}>Comment</Label>
                                    <Col md={8} >
                                        <Input type="textarea" id="comment" name="comment" value={comment}
                          onChange={(e) => setComment(e.target.value)}
                                            />
                                    </Col>                        
                                </FormGroup>
                                <FormGroup >
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </FormGroup>
                            </Form>:<div>Please <Link to="/signin">Sign-in</Link> to write a review.</div>}
                            
                        </CardBody>
                    </Card>
                            </div>
                        </div>
                    </li>
                {/* </ul> */}
           </div>}
           </> )
        }
        </div>
    )    
}

export default ProductComponent;