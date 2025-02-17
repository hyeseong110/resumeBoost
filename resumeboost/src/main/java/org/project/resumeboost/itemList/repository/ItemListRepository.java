package org.project.resumeboost.itemList.repository;

import org.project.resumeboost.itemList.entity.ItemListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemListRepository extends JpaRepository<ItemListEntity,Long>{
  
}
