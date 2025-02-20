package org.project.resumeboost.member.entity;

import java.util.List;

import org.project.resumeboost.basic.common.BasicTime;
import org.project.resumeboost.basic.common.Role;
import org.project.resumeboost.board.entity.BoardEntity;
import org.project.resumeboost.item.entity.ItemEntity;
import org.project.resumeboost.member.dto.MemberDto;
import org.project.resumeboost.pay.entity.PayEntity;
import org.project.resumeboost.reply.entity.ReplyEntity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "member_tb")
public class MemberEntity extends BasicTime {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "member_id")
  private Long id;

  @Column(nullable = false, unique = true)
  private String userEmail;

  @Column(nullable = false)
  private String userPw;

  // 나이
  @Column(nullable = false)
  private int age;

  // 지역
  @Column(nullable = false)
  private String address;

  // 별명
  @Column(nullable = false, unique = true)
  private String nickName;

  // 실제 이름
  @Column(nullable = false)
  private String userName;

  // 상세설명 제목
  private String detailTitle;

  // 상세설명
  private String detail;

  // 리뷰수
  @Column(nullable = true, columnDefinition = "int default 0")
  private int replyCount;

  @Column(nullable = true, columnDefinition = "int default 0")
  private int viewCount;

  // 내가 작성한 댓글 수
  @Column(nullable = true, columnDefinition = "int default 0")
  private int myReplyCount;

  // 내가 작성한 게시글 수
  @Column(nullable = true, columnDefinition = "int default 0")
  private int myPostCount;

  // 경력
  private String career;

  // 권한 MEMBER(일반회원), MENTOR(멘토회원), ADMIN
  @Enumerated(EnumType.STRING)
  private Role role;

  // 프로필 사진 유무
  @Column(nullable = false)
  private int attachFile;

  // 포트폴리오 유무
  @Column(nullable = false)
  private int portfolioFile;

  @Column(nullable = false)
  private String phone;

  // 게시판
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<BoardEntity> boardEntities;

  // 리뷰
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<ReplyEntity> replyEntities;

  // 상품
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<ItemEntity> itemEntities;

  // 결제
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<PayEntity> payEntities;

  // 프로필사진 파일
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<MemberImgEntity> memberImgEntities;

  // 폴트폴리오 파일
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<MemberPtEntity> memberPtEntities;
}
