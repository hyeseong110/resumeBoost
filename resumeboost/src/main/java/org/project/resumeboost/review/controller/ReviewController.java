package org.project.resumeboost.review.controller;

import org.project.resumeboost.review.service.impl.ReviewServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
  private final ReviewServiceImpl reviewServiceImpl;
}
