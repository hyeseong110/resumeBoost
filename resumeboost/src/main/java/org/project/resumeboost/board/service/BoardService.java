package org.project.resumeboost.board.service;

import java.io.IOException;

import org.project.resumeboost.board.dto.BoardDto;

public interface BoardService {
  public void boardInsert(BoardDto boardDto) throws IOException;

  public void boardUpdate(BoardDto boardDto) throws IOException;
}
