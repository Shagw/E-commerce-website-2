import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../Screens/Rating';

function HomeComponent(props){
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));


    return () => {
      //
    };
  }, [category])
    console.log(category);

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(listProducts(category, searchKeyword, sortOrder))
    }
    const sortHandler = (e) => {
      setSortOrder(e.target.value);
      dispatch(listProducts(category, searchKeyword, sortOrder))
    }

    return <>
    {category &&
      <h2>{category}</h2>}

    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </li>
      <li>
        Sort By {' '}
        <select name="sortOrder" onChange={sortHandler}>
          <option value="">Newest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </li>
    </ul>
    {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <ul className="products">
    {
    products.map(product =>
      <li key={product._id}>
          <div className="product">
                  <Link to={'/product/'+product._id}>
                    <img className="products-image" src={product.image} alt="Product"/>
                  </Link>
                  <div className="products-name">
                    <Link to={'/product/'+product._id}>{product.name}</Link>
                  </div>
            <div className="products-brand">{product.brand}</div>
            <div className="products-price">${product.price}</div>
            <div className="products-rating">
              <Rating value={product.rating} text={product.numReviews+' reviews'}/>
              </div>
          </div>
        </li>
        )
    }
    
  </ul>
}
  </>
}
export default HomeComponent;