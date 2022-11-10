import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./../redux/actions/productActions";
import { readCategory } from "./../redux/actions/categoryActions";
import CardOne from './CardOne';
import { getProductsByFilter } from "../redux/actions/filterActions";

const Shop = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(readCategory());
  }, [dispatch]);

  const handleSearch = (e) => {
    setText(e.target.value);
    
    setCategoryIds([]); //reset category state

    dispatch(getProductsByFilter({ type: 'text', query: e.target.value }));
  }

  const handleCategory = e => {
    setText(''); // reset the text state...

    const currentCategoryChecked = e.target.value;
    const allCategoriesChecked = [...categoryIds];
    const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

    let updatedCategoryIds;
    if (indexFound === -1) {
        updatedCategoryIds = [...categoryIds, currentCategoryChecked];
        setCategoryIds(updatedCategoryIds);
    } else {
      updatedCategoryIds = [...categoryIds];
      updatedCategoryIds.splice(indexFound,1)
      setCategoryIds(updatedCategoryIds);
    }

    dispatch(getProductsByFilter({ type: 'category', query: updatedCategoryIds }));
  }

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  return (
    <section className=" shop-page m-4">
      <div className="jumbotron">
        <h1 className=" display-4"> Shop </h1>
      </div>
      <div className="row">
        <div className="col-lg-3 border-right">
          <div className="text-muted mb-2">
            Filters <span className="fas fa-sliders-h"></span>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <form className="form-inline w-100 my-2 my-lg-0">
              <input
                style={{ width: "100%" }}
                className="form-control mr-sm-2"
                type="search"
                onChange={handleSearch}
                name='search'
                value={text}
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </nav>
          <div className="border-top border-bottom bg-light p-3">
            {categories &&
              categories.map((c) => (
                <div key={c._id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="category"
                    value={c._id}
                    id="flexCheckDefault"
                    onChange={handleCategory}
                    checked={categoryIds.includes(c._id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {c.category}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div className="col-lg-9 p-0">
          <div className="d-flex flex-wrap justify-content-center mt-2">
            {products && products.map((p) => (
              <CardOne key={p._id} product={p} homePage={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
