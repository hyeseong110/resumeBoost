package org.project.resumeboost.pay.repository;

import org.project.resumeboost.pay.entity.PayEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PayRepository extends JpaRepository<PayEntity,Long>{
  
}
