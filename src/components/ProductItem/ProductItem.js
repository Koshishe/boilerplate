import React from 'react';
import pt from 'prop-types';
import cx from 'classnames';
import s from './ProductItem.module.css';

const range = to => [...Array(to).keys()].map(i => i + 1)

function ProductItem(
  {
    isInStock,
    img,
    title,
    price,
    subPriceContent,
    maxRating,
    rating,
    ratingComponent,
    discount,
    category
  }) {
  return (
    <li className={cx(s.goods, { [s.goodsNone]: !isInStock })}>
      <div className={cx(s.goodsType, { [s.goodsTypeNone]: !isInStock })}>
        {isInStock ? 'В наличии' : 'Недоступен'}
      </div>
      <div
        className={cx(s.goodsImg, { [s.goodsImgNone]: !isInStock })}
        style={{
          width: '224px',
          height: '200px',
          backgroundImage: 'url(' + img + ')'
        }}
      >
        {Number(discount) > 0 && (
          <div className={s.discount}>
            {`${discount}%`}
          </div>
        )}
      </div>
      {category.length &&
        <div className={s.categories}>
          {category.map((item) => <div key={item} className={s.category}>{item}</div>)}
        </div>
      }
      <div className={s.goodsName}>{title}</div>
      <div>
        {
          range(maxRating).map(i => React.createElement(ratingComponent, { key: i, isFilled:  i <= rating }))
        }
      </div>
      <div className={s.goodsPrise}>
        {price}{subPriceContent}
      </div>
    </li>
  )
}

ProductItem.propTypes = {
  title: pt.node.isRequired,
  img: pt.string.isRequired,
  price: pt.node.isRequired,
  rating: pt.number.isRequired,
  maxRating: pt.number.isRequired,
  subPriceContent: pt.node.isRequired,
  ratingComponent: pt.func.isRequired,
  isInStock: pt.bool.isRequired,
  discount: pt.number,
  category: pt.array
};

export default ProductItem;
