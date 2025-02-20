package org.project.resumeboost.member.repository;

import org.project.resumeboost.member.entity.MemberPtEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberPtRepository extends JpaRepository<MemberPtEntity, Long> {

}
