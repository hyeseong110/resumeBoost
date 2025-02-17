package org.project.resumeboost.board.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.project.resumeboost.board.dto.BoardDto;
import org.project.resumeboost.board.service.impl.BoardServiceImpl;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardComtroller {

  private final BoardServiceImpl boardServiceImpl;

  @PostMapping("/insert")
  public ResponseEntity<?> boardInsert(@RequestBody BoardDto boardDto) throws IOException {

    Map<String, String> map = new HashMap<>();

    boardServiceImpl.boardInsert(boardDto);

    map.put("boardInsert", "성공");

    return ResponseEntity.status(HttpStatus.OK).body(map);
  }

  @PutMapping("/update")
  public ResponseEntity<?> boardUpdate(@RequestBody BoardDto boardDto) throws IOException {

    Map<String, String> map = new HashMap<>();

    boardServiceImpl.boardUpdate(boardDto);

    map.put("boardUpdate", "성공");

    return ResponseEntity.status(HttpStatus.OK).body(map);
  }

}
