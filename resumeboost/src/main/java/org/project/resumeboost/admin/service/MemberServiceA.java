package org.project.resumeboost.admin.service;

import java.io.IOException;
import java.util.List;

import org.project.resumeboost.member.dto.MemberDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface MemberServiceA {
  

  Page<MemberDto> ListAll(Pageable pageable);

  MemberDto memberDetail(Long id);

  void memberDelete(Long id);

  void memberUpdate(MemberDto memberDto) throws IllegalStateException, IOException;

}
