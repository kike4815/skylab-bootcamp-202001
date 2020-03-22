import React, { useEffect } from 'react'
import BikeExp from '../img/bh_aerolight_disc.jpg'
import './Search.sass'
import { withRouter } from 'react-router-dom'
import { Context } from './ContextProvider'


export default function ({ onMount, _sails }) {

debugger
    return <>
        <div className="future-breadcramp">Hola</div>
        <div className="body-search">
            <aside className='filters'>
                <div className="col-lg-3 col-sm-4 sidebars">
                    <aside className="widget">
                        <h3 className="widgetTitle">categories</h3>
                        <span className="secbar"></span>
                        <div className="categoryAccordion">
                            <div className="panel-group" id="accordion">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <div className="titleBorderBottom">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion" href="#men" aria-expanded="false" className="collapsed">
                                                    Men
                                    <i className="rt-plus3"></i></a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div id="men" className="panel-collapse collapse" aria-expanded="false" >
                                        <ul className="productCategories">
                                            <li><a href="#">Bag &amp; Luggage</a></li>
                                            <li><a href="#">Eyewear2</a></li>
                                            <li><a href="#">Jewelry</a></li>
                                            <li><a href="#">Shoes</a></li>
                                            <li><a href="#">Skyrts</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="panel">
                                    <div className="panel-heading">
                                        <div className="titleBorderBottom">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion" href="#woman" aria-expanded="false" className="collapsed">
                                                    Women
                                    <i className="rt-plus3"></i></a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div id="woman" className="panel-collapse collapse" aria-expanded="false" >
                                        <ul className="productCategories">
                                            <li><a href="#">Bag &amp; Luggage</a></li>
                                            <li><a href="#">Eyewear2</a></li>
                                            <li><a href="#">Jewelry</a></li>
                                            <li><a href="#">Shoes</a></li>
                                            <li><a href="#">Skyrts</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="panel">
                                    <div className="panel-heading">
                                        <div className="titleBorderBottom">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion" href="#kids" className="collapsed" aria-expanded="false">
                                                    Kids
                                    <i className="rt-plus3"></i></a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div id="kids" className="panel-collapse collapse" aria-expanded="false">
                                        <ul className="productCategories">
                                            <li><a href="#">Bag &amp; Luggage</a></li>
                                            <li><a href="#">Eyewear2</a></li>
                                            <li><a href="#">Jewelry</a></li>
                                            <li><a href="#">Shoes</a></li>
                                            <li><a href="#">Skyrts</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="panel">
                                    <div className="panel-heading">
                                        <div className="titleBorderBottom">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion" href="#allProducts" className="collapsed" aria-expanded="false">
                                                    All Products
                                    <i className="rt-plus3"></i></a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div id="allProducts" className="panel-collapse collapse" aria-expanded="false">
                                        <ul className="productCategories">
                                            <li><a href="#">Adidas</a></li>
                                            <li><a href="#">Nike</a></li>
                                            <li><a href="#">Converse</a></li>
                                            <li><a href="#">Chanel</a></li>
                                            <li><a href="#">Gucci </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <aside className="widget">
                        <h3 className="widgetTitle">Shop by</h3>
                        <span className="secbar"></span>
                        <div className="singleWidgetItem">
                            <div className="panel-heading">
                                <div className="titleBorderBottom">
                                    <h4 className="panel-title">
                                        <a href="#">Manufacturer</a>
                                    </h4>
                                </div>
                            </div>
                            <ul className="productCategories">
                                <li><a href="#">Adidas</a><span className="count">(15)</span></li>
                                <li><a href="#">Nike</a><span className="count">(09)</span></li>
                                <li><a href="#">Converse</a><span className="count">(12)</span></li>
                                <li><a href="#">Chanel</a><span className="count">(16)</span></li>
                                <li><a href="#">Gucci </a><span className="count">(05)</span></li>
                            </ul>
                        </div>
                        <div className="singleWidgetItem">
                            <div className="panel-heading">
                                <div className="titleBorderBottom">
                                    <h4 className="panel-title priceTitle">
                                        <a href="#">Price</a>
                                    </h4>
                                </div>
                            </div>
                            <form action="#" method="get">
                                <div className="price_slider_wrapper">
                                    <div id="slider-range" className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div className="ui-slider-range ui-widget-header ui-corner-all"></div><span className="ui-slider-handle ui-state-default ui-corner-all LEFt" tabIndex="0"></span><span className="ui-slider-handle ui-state-default ui-corner-all" tabIndex="0" ></span></div>
                                    <p id="minamount" className="amount">$10</p>
                                    <span>&gt;</span>
                                    <p id="maxamount" className="amount">$250</p>
                                    <button className="searchamount" type="submit">Search</button>
                                </div>
                            </form>
                        </div>
                        <div className="singleWidgetItem">
                            <div className="panel-heading">
                                <div className="titleBorderBottom">
                                    <h4 className="panel-title">
                                        <a href="#">color options</a>
                                    </h4>
                                </div>
                            </div>
                            <ul className="productCategories">
                                <li><a href="#">Black</a><span className="count">(15)</span></li>
                                <li><a href="#">White</a><span className="count">(09)</span></li>
                                <li><a href="#">Blue</a><span className="count">(12)</span></li>
                                <li><a href="#">Red</a><span className="count">(16)</span></li>
                                <li><a href="#">Screen</a><span className="count">(05)</span></li>
                            </ul>
                        </div>
                        <div className="singleWidgetItem">
                            <div className="panel-heading">
                                <div className="titleBorderBottom">
                                    <h4 className="panel-title">
                                        <a href="#">Subcategory</a>
                                    </h4>
                                </div>
                            </div>
                            <ul className="productCategories">
                                <li><a href="#">Materlal Bag</a><span className="count">(15)</span></li>
                                <li><a href="#">Arreglos</a><span className="count">(09)</span></li>
                                <li><a href="#">Dresses</a><span className="count">(12)</span></li>
                                <li><a href="#">Headphone</a><span className="count">(16)</span></li>
                            </ul>
                        </div>
                        <div className="singleWidgetItem">
                            <div className="panel-heading">
                                <div className="titleBorderBottom">
                                    <h4 className="panel-title">
                                        <a href="#">Size options</a>
                                    </h4>
                                </div>
                            </div>
                            <ul className="productCategories">
                                <li><a href="#">L</a><span className="count">(15)</span></li>
                                <li><a href="#">M</a><span className="count">(09)</span></li>
                                <li><a href="#">S</a><span className="count">(12)</span></li>
                                <li><a href="#">XL</a><span className="count">(16)</span></li>
                            </ul>
                        </div>
                    </aside>
                    <aside className="widget">
                        <h3 className="widgetTitle">compare</h3>
                        <span className="secbar"></span>
                        <div className="compareContent">
                            <p>You have no item to compare.</p>
                        </div>
                    </aside>
                </div>
            </aside>
            <section className='results-container'>
                <div className="results-container__sponsor">
                    <img src={BikeExp} alt="" />
                </div>
                <div className="results-container__elements">
                    hola
                    {_sails && _sails.map((sail, index) => <img key={index} src={sail.image}/>)}
        </div>
            </section>
        </div>
    </>
}