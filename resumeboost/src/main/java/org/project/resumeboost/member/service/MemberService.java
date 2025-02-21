package org.project.resumeboost.member.service;

import java.io.IOException;

import org.project.resumeboost.member.dto.MemberDto;

public interface MemberService {
  public void joinOk(MemberDto memberDto);

  public MemberDto mentorDetail(Long mentorId, Long myId);

  public MemberDto memberDetail(Long mentorId);
}
