package org.project.resumeboost.review.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.project.resumeboost.review.dto.ReviewDto;
import org.project.resumeboost.review.service.impl.ReviewServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
  private final ReviewServiceImpl reviewServiceImpl;

  @GetMapping("/reviewList")
  public ResponseEntity<?> getMethodName() {

    Map<String, List<ReviewDto>> map = new HashMap<>();

    List<ReviewDto> reviewDtos = reviewServiceImpl.reviewList();

    map.put("reviewList", reviewDtos);

    return ResponseEntity.status(HttpStatus.OK).body(map);
  }

}
