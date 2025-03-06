package org.project.resumeboost.review.dto;

import org.project.resumeboost.member.entity.MemberEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewDto {

  private Long id;

  private String content;

  private Long mentorId;

  private String mentorNickName;

  private Long memberId;

  private MemberEntity memberEntity;

}
