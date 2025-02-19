package org.project.resumeboost.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.project.resumeboost.member.dto.MemberDto;
import org.project.resumeboost.member.service.impl.MemberServiceImpl;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
  private final MemberServiceImpl memberServiceImpl;

  @PostMapping("/insert")
  public ResponseEntity<?> join(MemberDto memberDto) {

    Map<String, String> map = new HashMap<>();

    memberServiceImpl.joinOk(memberDto);

    return ResponseEntity.status(HttpStatus.OK).body(null);
  }

}
