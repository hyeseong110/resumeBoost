package org.project.resumeboost.cart.repository;

import org.project.resumeboost.cart.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<CartEntity,Long>{
  
}
