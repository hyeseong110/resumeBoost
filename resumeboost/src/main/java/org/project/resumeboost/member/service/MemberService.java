package org.project.resumeboost.member.service;

import java.io.IOException;

import org.project.resumeboost.member.dto.MemberDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberService {
  public void joinOk(MemberDto memberDto);

  public MemberDto mentorDetail(Long mentorId, Long myId);

  public MemberDto memberDetail(Long mentorId);

  public Page<MemberDto> memberList(Pageable pageable, String subject, String search);

  public Page<MemberDto> mentorList(Pageable pageable, String subject, String search);

  public MemberDto getKakaoMember(String accessToken);

  public void modifyOk(MemberDto memberDto);
}
