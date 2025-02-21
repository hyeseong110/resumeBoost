package org.project.resumeboost.itemList.repository;

import java.util.List;

import org.project.resumeboost.cart.entity.CartEntity;
import org.project.resumeboost.item.entity.ItemEntity;
import org.project.resumeboost.itemList.entity.ItemListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemListRepository extends JpaRepository<ItemListEntity,Long>{

  List<ItemListEntity> findByCartEntityAndItemEntity(CartEntity cartEntity, ItemEntity itemEntity);

  List<ItemListEntity> findAllByCartEntityId(Long cartId);
  
}
