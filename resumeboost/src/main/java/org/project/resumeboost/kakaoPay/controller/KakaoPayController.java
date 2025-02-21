package org.project.resumeboost.kakaoPay.controller;

import org.project.resumeboost.kakaoPay.dto.KakaoApproveResponse;
import org.project.resumeboost.kakaoPay.dto.ReadyResponse;
import org.project.resumeboost.kakaoPay.service.KakaoPayService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoPayController {
  private final KakaoPayService kakaoPayService;

  @PostMapping("/ready")
  public ReadyResponse readyToKakaoPay() {
    return kakaoPayService.kakaoPayReady();
  }

  @GetMapping("/success")
  public ResponseEntity<?> afterPayRequest(@RequestParam("pg_token") String pgToken) {

    KakaoApproveResponse kakaoApproveResponse = kakaoPayService.approveResponse(pgToken);

    return ResponseEntity.status(HttpStatus.OK).body(kakaoApproveResponse);
  }

  // @GetMapping("/cancel")
  // public void cancel(){

  // }
}
