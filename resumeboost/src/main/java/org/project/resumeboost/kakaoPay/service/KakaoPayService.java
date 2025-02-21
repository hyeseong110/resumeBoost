package org.project.resumeboost.kakaoPay.service;

import java.util.HashMap;
import java.util.Map;
import org.project.resumeboost.kakaoPay.dto.ReadyResponse;
import org.project.resumeboost.kakaoPay.dto.KakaoApproveResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class KakaoPayService {
  @Value("${kakaopay.secret-key}")
  String secretKey;

  @Value("${kakaopay.cid}")
  String cid;

  private ReadyResponse kakaoReady;

  // request header
  private HttpHeaders getHeaders() {
    HttpHeaders headers = new HttpHeaders();
    String auth = "SECRET_KEY " + secretKey;
    headers.set("Authorization", auth);
    headers.set("Content-Type", "application/json");
    return headers;
  }

  // 결제 요청
  public ReadyResponse kakaoPayReady() {
    Map<String, Object> parameters = new HashMap<>();

    parameters.put("cid", cid);
    parameters.put("partner_order_id", "1000");
    parameters.put("partner_user_id", "USER_ID");
    parameters.put("item_name", "자소서");
    parameters.put("quantity", "1");
    parameters.put("total_amount", "2200");
    parameters.put("tax_free_amount", "0");
    parameters.put("approval_url", "http://localhost:8090/kakao/success");
    parameters.put("cancel_url", "http://localhost:8090/kakao/cancel");
    parameters.put("fail_url", "http://localhost:8090/kakao/fail");

    HttpEntity<Map<String, Object>> requesEntity = new HttpEntity<>(parameters, getHeaders());

    RestTemplate restTemplate = new RestTemplate();

    kakaoReady = restTemplate.postForObject(
        "https://open-api.kakaopay.com/online/v1/payment/ready",
        requesEntity,
        ReadyResponse.class);

    return kakaoReady;
  }

  // 결제 승인
  public KakaoApproveResponse approveResponse(String pgToken) {

    Map<String, String> parameters = new HashMap<>();
    parameters.put("cid", cid);
    parameters.put("tid", kakaoReady.getTid());
    parameters.put("partner_order_id", "1000");
    parameters.put("partner_user_id", "USER_ID");
    parameters.put("pg_token", pgToken);

    HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(parameters, getHeaders());

    RestTemplate restTemplate = new RestTemplate();

    KakaoApproveResponse approveResponse = restTemplate.postForObject(
        "https://open-api.kakaopay.com/online/v1/payment/approve",
        requestEntity, KakaoApproveResponse.class);

    return approveResponse;
  }

}
