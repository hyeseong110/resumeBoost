package org.project.resumeboost.member.repository;

import java.util.Optional;

import org.project.resumeboost.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

  Optional<MemberEntity> findByUserEmail(String userEmail);

  Optional<MemberEntity> findByNickName(String nickName);

}