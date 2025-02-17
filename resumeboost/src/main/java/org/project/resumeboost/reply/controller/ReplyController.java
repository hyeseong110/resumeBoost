package org.project.resumeboost.reply.controller;

import org.project.resumeboost.board.service.impl.BoardServiceImpl;
import org.project.resumeboost.reply.service.impl.ReplyServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/reply")
@RequiredArgsConstructor
public class ReplyController {
  private final ReplyServiceImpl replyServiceImpl;
  private final BoardServiceImpl boardServiceImpl;

  @PostMapping("/insert")
  public ResponseEntity<?> replyInsert() {

    return ResponseEntity.status(HttpStatus.OK).body(null);
  }

}
