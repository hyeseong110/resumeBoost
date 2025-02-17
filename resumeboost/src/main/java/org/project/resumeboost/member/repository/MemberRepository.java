package org.project.resumeboost.member.repository;

import org.project.resumeboost.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity,Long>{

  
}
