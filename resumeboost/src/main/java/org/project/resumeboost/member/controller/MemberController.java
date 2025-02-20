package org.project.resumeboost.member.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.project.resumeboost.basic.common.Role;
import org.project.resumeboost.member.dto.MemberDto;
import org.project.resumeboost.member.entity.MemberEntity;
import org.project.resumeboost.member.repository.MemberRepository;
import org.project.resumeboost.member.service.impl.MemberServiceImpl;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
  private final MemberServiceImpl memberServiceImpl;
  private final MemberRepository memberRepository;

  @PostMapping("/insert")
  public ResponseEntity<?> join(@RequestBody MemberDto memberDto) {

    Map<String, String> map = new HashMap<>();

    memberDto.setRole(Role.MEMBER);

    memberServiceImpl.joinOk(memberDto);

    map.put("member", "성공");

    return ResponseEntity.status(HttpStatus.OK).body(map);
  }

  @PostMapping("/insert/mentor")
  public ResponseEntity<?> joinT(@RequestBody MemberDto memberDto) {

    Map<String, String> map = new HashMap<>();

    memberDto.setRole(Role.MENTOR);

    memberServiceImpl.joinOk(memberDto);

    map.put("member", "성공");

    return ResponseEntity.status(HttpStatus.OK).body(map);
  }

  @PostMapping("/checkEmail")
  public ResponseEntity<?> checkEmail(@RequestBody MemberDto memberDto) {
    Optional<MemberEntity> existingEmail = memberRepository.findByUserEmail(memberDto.getUserEmail());
    Map<String, Boolean> response = new HashMap<>();
    response.put("exists", existingEmail.isPresent());
    return ResponseEntity.ok(response);
  }

  @PostMapping("/checkNickName")
  public ResponseEntity<?> checkNickName(@RequestBody MemberDto memberDto) {
    Optional<MemberEntity> existingNickName = memberRepository.findByNickName(memberDto.getNickName());
    Map<String, Boolean> response = new HashMap<>();
    response.put("exists", existingNickName.isPresent());
    return ResponseEntity.ok(response);
  }

}
