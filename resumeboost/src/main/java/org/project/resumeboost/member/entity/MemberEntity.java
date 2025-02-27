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
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@ToString(exclude = { "boardEntities", "replyEntities", "itemEntities", "payEntities", "memberImgEntities",
    "memberPtEntities" })
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

  // ?‚˜?´
  @Column(nullable = false)
  private int age;

  // ì§??—­
  @Column(nullable = false)
  private String address;

  // ë³„ëª…
  @Column(nullable = false, unique = true)
  private String nickName;

  // ?‹¤? œ ?´ë¦?
  @Column(nullable = false)
  private String userName;

  // ?ƒ?„¸?„¤ëª? ? œëª?
  private String detailTitle;

  // ?ƒ?„¸?„¤ëª?
  @Column(length = 5000)
  private String detail;

  // ë¦¬ë·°?ˆ˜
  @Column(nullable = true, columnDefinition = "int default 0")
  private int replyCount;

  @Column(nullable = true, columnDefinition = "int default 0")
  private int viewCount;

  // ?‚´ê°? ?‘?„±?•œ ?Œ“ê¸? ?ˆ˜
  @Column(nullable = true, columnDefinition = "int default 0")
  private int myReplyCount;

  // ?‚´ê°? ?‘?„±?•œ ê²Œì‹œê¸? ?ˆ˜
  @Column(nullable = true, columnDefinition = "int default 0")
  private int myPostCount;

  // ê²½ë ¥
  private String career;

  // ê¶Œí•œ MEMBER(?¼ë°˜íšŒ?›), MENTOR(ë©˜í† ?šŒ?›), ADMIN
  @Enumerated(EnumType.STRING)
  private Role role;

  // ?”„ë¡œí•„ ?‚¬ì§? ?œ ë¬?
  @Column(nullable = false)
  private int attachFile;

  // ?¬?Š¸?´ë¦¬ì˜¤ ?œ ë¬?
  @Column(nullable = false)
  private int portfolioFile;

  @Column(nullable = false)
  private String phone;

  // ?†Œ?…œë¡œê·¸?¸
  @Column(columnDefinition = "boolean default false")
  private Boolean social;

  // ê²Œì‹œ?Œ
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<BoardEntity> boardEntities;

  // ë¦¬ë·°
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<ReplyEntity> replyEntities;

  // ?ƒ?’ˆ
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  @JsonIgnore
  private List<ItemEntity> itemEntities;

  // ê²°ì œ
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<PayEntity> payEntities;

  // ?”„ë¡œí•„?‚¬ì§? ?ŒŒ?¼
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<MemberImgEntity> memberImgEntities;

  // ?´?Š¸?´ë¦¬ì˜¤ ?ŒŒ?¼
  @JsonIgnore
  @OneToMany(mappedBy = "memberEntity", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private List<MemberPtEntity> memberPtEntities;
}
