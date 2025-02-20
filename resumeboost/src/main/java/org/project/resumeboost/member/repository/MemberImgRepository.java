package org.project.resumeboost.member.repository;

import org.project.resumeboost.member.entity.MemberImgEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberImgRepository extends JpaRepository<MemberImgEntity, Long> {

}
