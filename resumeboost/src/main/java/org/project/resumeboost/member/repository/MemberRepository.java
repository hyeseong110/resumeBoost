package org.project.resumeboost.member.repository;

import java.util.Optional;

import org.project.resumeboost.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

  Optional<MemberEntity> findByUserEmail(String userEmail);

  Optional<MemberEntity> findByNickName(String nickName);

  // 멘토 조회수
  @Modifying // JPQL
  @Query("update MemberEntity m set m.viewCount = m.viewCount + 1 where m.id = :id")
  void MentorViewCount(@Param("id") Long id);

  @Modifying // JPQL
  @Query("update MemberEntity m set m.myPostCount = m.myPostCount + 1 where m.id = :id")
  void myPostCount(@Param("id") Long memberId);

  @Modifying // JPQL
  @Query("update MemberEntity m set m.myPostCount = m.myPostCount - 1 where m.id = :id")
  void myPostCountDelete(@Param("id") Long id);

  @Modifying // JPQL
  @Query("update MemberEntity m set m.myReplyCount = m.myReplyCount + 1 where m.id = :id")
  void myReplyCount(@Param("id") Long memberId);

  @Modifying // JPQL
  @Query("update MemberEntity m set m.myReplyCount = m.myReplyCount - 1 where m.id = :id")
  void myReplyCountDelete(@Param("id") Long id);

}