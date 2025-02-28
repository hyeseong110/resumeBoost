import React from "react"

const MyItems = ({ items }) => {
  return (
    <div className='myItemContainer'>
      <div className='myItemHeader'>
        <h3>내가 등록한 상품</h3>
      </div>
      {items.length > 0 ? (
        <ul className='myItemList'>
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => console.log(`상품 ID: ${item.id}`)}
            >
              <p>
                <span>카테고리:</span> {item.category}
              </p>
              <p>{item.itemPrice}원</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='noItemText'>등록된 상품이 없습니다.</p>
      )}
    </div>
  )
}

export default MyItems
