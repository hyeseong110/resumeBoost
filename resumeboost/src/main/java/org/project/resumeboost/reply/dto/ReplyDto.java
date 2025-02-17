package org.project.resumeboost.reply.dto;

import java.time.LocalDateTime;

import org.project.resumeboost.board.entity.BoardEntity;
import org.project.resumeboost.member.entity.MemberEntity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReplyDto {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String content;

  private MemberEntity memberEntity;

  private BoardEntity boardEntity;

  private LocalDateTime createTime;
  private LocalDateTime updateTime;
}
