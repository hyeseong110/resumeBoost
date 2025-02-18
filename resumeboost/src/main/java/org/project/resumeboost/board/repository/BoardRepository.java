package org.project.resumeboost.board.repository;

import org.project.resumeboost.board.entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

  Page<BoardEntity> findByTitleContaining(Pageable pageable, String search);

  Page<BoardEntity> findByContentContaining(Pageable pageable, String search);

  Page<BoardEntity> findByCategoryContaining(Pageable pageable, String search);

  Page<BoardEntity> findByWriterContaining(Pageable pageable, String search);

  @Query("SELECT b FROM BoardEntity b WHERE " +
      "b.title LIKE %:search% OR " +
      "b.content LIKE %:search% OR " +
      "b.memberEntity.nickName LIKE %:search%")
  Page<BoardEntity> findByTitleOrContentOrWriterContaining(Pageable pageable, @Param("search") String search);

}
