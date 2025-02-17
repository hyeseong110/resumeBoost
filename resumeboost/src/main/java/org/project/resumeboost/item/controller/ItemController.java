package org.project.resumeboost.item.controller;

import org.project.resumeboost.item.dto.ItemDto;
import org.project.resumeboost.item.service.impl.ItemServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {
  private final ItemServiceImpl itemServiceImpl;

  @PostMapping("/insert")
  public ResponseEntity<?> itemInsert(ItemDto itemDto){
    itemServiceImpl.itemInsert(itemDto);
    return ResponseEntity.status(HttpStatus.OK).body(null);
  }

}
