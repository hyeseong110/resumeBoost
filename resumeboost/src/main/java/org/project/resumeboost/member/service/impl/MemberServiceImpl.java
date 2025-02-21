package org.project.resumeboost.member.service.impl;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Member;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.project.resumeboost.basic.common.Role;
import org.project.resumeboost.member.dto.MemberDto;
import org.project.resumeboost.member.entity.MemberEntity;
import org.project.resumeboost.member.repository.MemberImgRepository;
import org.project.resumeboost.member.repository.MemberPtRepository;
import org.project.resumeboost.member.repository.MemberRepository;
import org.project.resumeboost.member.service.MemberService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

  private final MemberRepository memberRepository;
  private final MemberImgRepository memberImgRepository;
  private final MemberPtRepository memberPtRepository;
  private final PasswordEncoder passwordEncoder;

  @Value("${file.path}")
  String saveFile;

  @Override
  public void joinOk(MemberDto memberDto) {

    Optional<MemberEntity> email = memberRepository.findByUserEmail(memberDto.getUserEmail());
    Optional<MemberEntity> nickName = memberRepository.findByNickName(memberDto.getNickName());

    if (email.isPresent()) {
      throw new IllegalArgumentException("이미 존재하는 아이디 입니다.");
    } else if (nickName.isPresent()) {
      throw new IllegalArgumentException("이미 존재하는 닉네임 입니다.");
    }

    memberRepository.save(MemberEntity.builder()
        .userEmail(memberDto.getUserEmail())
        .userPw(passwordEncoder.encode(memberDto.getUserPw()))
        .userName(memberDto.getUserName())
        .address(memberDto.getAddress())
        .age(memberDto.getAge())
        .role(memberDto.getRole())
        .phone(memberDto.getPhone())
        .career(memberDto.getCareer())
        .attachFile(0) // 이미지는 회원정보 수정에서 추가
        .portfolioFile(0)
        .nickName(memberDto.getNickName())
        .build());

  }

  @Override
  public MemberDto mentorDetail(Long mentorId, Long myId) {
    if (mentorId != myId) {
      mentorViewCount(mentorId);
    }
    MemberEntity mentorEntity = memberRepository.findById(mentorId).orElseThrow(IllegalArgumentException::new);
    return MemberDto.toMemberDto(mentorEntity);
  }

  public void mentorViewCount(Long id) {
    memberRepository.MentorViewCount(id);
  }

  @Override
  public MemberDto memberDetail(Long mentorId) {
    MemberEntity memberEntity = memberRepository.findById(mentorId).orElseThrow(IllegalArgumentException::new);
    return MemberDto.toMemberDto(memberEntity);
  }

}
