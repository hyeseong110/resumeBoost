package org.project.resumeboost.item.repository;

import org.project.resumeboost.item.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<ItemEntity,Long>{
  
}
