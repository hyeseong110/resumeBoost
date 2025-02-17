package org.project.resumeboost.reply.service.impl;

import org.project.resumeboost.reply.repository.ReplyRepository;
import org.project.resumeboost.reply.service.ReplyService;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {
  private final ReplyRepository replyRepository;
}
