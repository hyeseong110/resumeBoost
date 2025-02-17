package org.project.resumeboost.item.service.impl;

import org.project.resumeboost.item.dto.ItemDto;
import org.project.resumeboost.item.entity.ItemEntity;
import org.project.resumeboost.item.repository.ItemRepository;
import org.project.resumeboost.item.service.ItemService;
import org.project.resumeboost.member.entity.MemberEntity;
import org.project.resumeboost.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{
  private final MemberRepository memberRepository;
  private final ItemRepository itemRepository;

  @Override
  public void itemInsert(ItemDto itemDto) {
    MemberEntity memberEntity=memberRepository.findById(itemDto.getMemberId()).orElseThrow(IllegalArgumentException::new);

    itemRepository.save(ItemEntity.builder()
    .category(itemDto.getCategory())
    .itemPrice(itemDto.getItemPrice())
    .memberEntity(memberEntity)
    .build());
  }
  
}
