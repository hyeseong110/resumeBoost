package org.project.resumeboost.board.service.impl;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.project.resumeboost.board.dto.BoardDto;
import org.project.resumeboost.board.entity.BoardEntity;
import org.project.resumeboost.board.entity.BoardImgEntity;
import org.project.resumeboost.board.repository.BoardImgRepository;
import org.project.resumeboost.board.repository.BoardRepository;
import org.project.resumeboost.board.service.BoardService;
import org.project.resumeboost.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {

  private final BoardRepository boardRepository;
  private final BoardImgRepository boardImgRepository;
  private final MemberRepository memberRepository;

  @Value("${file.path}")
  String saveFile;

  @Override
  public void boardInsert(BoardDto boardDto) throws IOException {

    // 1. member 있는지 확인
    memberRepository.findById(boardDto.getMemberId()).orElseThrow(
        IllegalArgumentException::new);

    // 2. 이미지 있는지 확인
    if (boardDto.getBoardImgFile().isEmpty()) {
      // int i = 1;
      // if (1 == 1) {
      boardRepository.save(BoardEntity.toNotFileInsert(boardDto));
    } else {
      MultipartFile boardFile = boardDto.getBoardImgFile();
      String oldImgName = boardFile.getOriginalFilename();
      // 암호화
      UUID uuid = UUID.randomUUID();
      String newImgName = uuid + "(ง •_•)ง" + oldImgName;
      String saveFilePath = saveFile + newImgName;
      boardFile.transferTo(new File(saveFilePath));
      BoardEntity boardEntity = BoardEntity.toYesFileInsert(boardDto);
      // 게시글 저장
      Long boardId = boardRepository.save(boardEntity).getId();
      BoardEntity entity = boardRepository.findById(boardId).orElseThrow(
          IllegalArgumentException::new);

      // 이미지 저장
      boardImgRepository.save(BoardImgEntity.builder()
          .newImgName(newImgName)
          .oldImgName(oldImgName)
          .boardEntity(entity)
          .build());
    }
  }

  @Override
  public void boardUpdate(BoardDto boardDto) throws IOException {

    boardRepository.findById(boardDto.getId()).orElseThrow(
        IllegalArgumentException::new);

    Optional<BoardImgEntity> optionalBoardImgEntities = boardImgRepository.findByBoardEntityId(boardDto.getId());
    if (optionalBoardImgEntities.isPresent()) {
      String newImgName = optionalBoardImgEntities.get().getNewImgName();
      String saveFilePath = saveFile + "/item/" + newImgName;
      File deleteFile = new File(saveFilePath);
      if (deleteFile.exists()) {
        deleteFile.delete();
      }
      boardImgRepository.deleteById(optionalBoardImgEntities.get().getId());
    }

    // 1. member 있는지 확인
    memberRepository.findById(boardDto.getMemberId()).orElseThrow(
        IllegalArgumentException::new);

    // 2. 이미지 있는지 확인
    if (boardDto.getBoardImgFile().isEmpty()) {
      boardRepository.save(BoardEntity.toNotFileUpdate(boardDto));
    } else {
      MultipartFile boardFile = boardDto.getBoardImgFile();
      String oldImgName = boardFile.getOriginalFilename();
      // 암호화
      UUID uuid = UUID.randomUUID();
      String newImgName = uuid + "(ง •_•)ง" + oldImgName;
      String saveFilePath = saveFile + newImgName;
      boardFile.transferTo(new File(saveFilePath));
      BoardEntity boardEntity = BoardEntity.toYesFileUpdate(boardDto);
      // 게시글 저장
      Long boardId = boardRepository.save(boardEntity).getId();
      BoardEntity entity = boardRepository.findById(boardId).orElseThrow(
          IllegalArgumentException::new);

      // 이미지 저장
      boardImgRepository.save(BoardImgEntity.builder()
          .newImgName(newImgName)
          .oldImgName(oldImgName)
          .boardEntity(entity)
          .build());
    }
  }

  @SuppressWarnings("null")
  @Override
  public Page<BoardDto> boardList(Pageable pageable, String subject, String search) {
    Page<BoardEntity> boardEntities = null;

    if (subject == null || search == null || search.trim().length() <= 0) {
      boardEntities = boardRepository.findAll(pageable);
    } else {
      if (subject.equals("title")) {
        boardEntities = boardRepository.findByTitleContaining(pageable, search);
      } else if (subject.equals("content")) {
        boardEntities = boardRepository.findByContentContaining(pageable, search);
      }
    }

    return boardEntities.map(BoardDto::toBoardDto);
  }

  @SuppressWarnings("null")
  @Override
  public Page<BoardDto> boardListLetter(Pageable pageable, String subject, String search) {
    Page<BoardEntity> boardEntities = null;

    if (subject == null || search == null || search.trim().length() <= 0) {
      boardEntities = boardRepository.findByCategoryContaining(pageable, "자기소개서");
    } else {
      if (subject.equals("title")) {
        boardEntities = boardRepository.findByTitleContaining(pageable, "자기소개서");
      } else if (subject.equals("content")) {
        boardEntities = boardRepository.findByContentContaining(pageable, "자기소개서");
      }
    }

    return boardEntities.map(BoardDto::toBoardDto);
  }

  @SuppressWarnings("null")
  @Override
  public Page<BoardDto> boardListResume(Pageable pageable, String subject, String search) {
    Page<BoardEntity> boardEntities = null;

    if (subject == null || search == null || search.trim().length() <= 0) {
      boardEntities = boardRepository.findByCategoryContaining(pageable, "이력서");
    } else {
      if (subject.equals("title")) {
        boardEntities = boardRepository.findByTitleContaining(pageable, "이력서");
      } else if (subject.equals("content")) {
        boardEntities = boardRepository.findByContentContaining(pageable, "이력서");
      }
    }

    return boardEntities.map(BoardDto::toBoardDto);
  }

  @SuppressWarnings("null")
  @Override
  public Page<BoardDto> boardListInterview(Pageable pageable, String subject, String search) {
    Page<BoardEntity> boardEntities = null;

    if (subject == null || search == null || search.trim().length() <= 0) {
      boardEntities = boardRepository.findByCategoryContaining(pageable, "면접");
    } else {
      if (subject.equals("title")) {
        boardEntities = boardRepository.findByTitleContaining(pageable, "면접");
      } else if (subject.equals("content")) {
        boardEntities = boardRepository.findByContentContaining(pageable, "면접");
      }
    }

    return boardEntities.map(BoardDto::toBoardDto);
  }

  @Override
  public void boardDelete(Long boardId) {

    boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 입니다."));

    boardRepository.deleteById(boardId);
  }

  @Override
  public BoardDto boardDetail(Long boardId) {

    BoardEntity boardEntity = boardRepository.findById(boardId).orElseThrow(IllegalArgumentException::new);

    return BoardDto.toBoardDto(boardEntity);
  }

}
