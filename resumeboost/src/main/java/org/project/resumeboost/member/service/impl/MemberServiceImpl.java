package org.project.resumeboost.member.service.impl;

import java.io.File;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.project.resumeboost.basic.common.Role;
import org.project.resumeboost.member.dto.MemberDto;
import org.project.resumeboost.member.entity.MemberEntity;
import org.project.resumeboost.member.entity.MemberImgEntity;
import org.project.resumeboost.member.repository.MemberImgRepository;
import org.project.resumeboost.member.repository.MemberPtRepository;
import org.project.resumeboost.member.repository.MemberRepository;
import org.project.resumeboost.member.service.MemberService;
import org.project.resumeboost.s3.S3UploadService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

  private final MemberRepository memberRepository;
  private final MemberImgRepository memberImgRepository;
  private final MemberPtRepository memberPtRepository;
  private final PasswordEncoder passwordEncoder;
  private final S3UploadService s3UploadService;

  @Value("${file.path}")
  String saveFile;

  @Override
  public void joinOk(MemberDto memberDto) {

    Optional<MemberEntity> email = memberRepository.findByUserEmail(memberDto.getUserEmail());
    Optional<MemberEntity> nickName = memberRepository.findByNickName(memberDto.getNickName());

    if (email.isPresent()) {
      throw new IllegalArgumentException("이미 존재하는 아이디 입니다.");
    } else if (nickName.isPresent()) {
      throw new IllegalArgumentException("이미 존재하는 닉네임 입니다.");
    }

    memberRepository.save(MemberEntity.builder()
        .userEmail(memberDto.getUserEmail())
        .userPw(passwordEncoder.encode(memberDto.getUserPw()))
        .userName(memberDto.getUserName())
        .address(memberDto.getAddress())
        .age(memberDto.getAge())
        .role(memberDto.getRole())
        .phone(memberDto.getPhone())
        .career(memberDto.getCareer())
        .attachFile(0) // 이미지는 회원정보 수정에서 추가
        .portfolioFile(0)
        .nickName(memberDto.getNickName())
        .social(false)
        .build());

  }

  @Override
  public MemberDto mentorDetail(Long mentorId, Long myId) {
    if (mentorId != myId) {
      mentorViewCount(mentorId);
    }
    MemberEntity mentorEntity = memberRepository.findById(mentorId).orElseThrow(IllegalArgumentException::new);
    return MemberDto.toMemberDto(mentorEntity);
  }

  public void mentorViewCount(Long id) {
    memberRepository.MentorViewCount(id);
  }

  @Override
  public MemberDto memberDetail(Long mentorId) {
    MemberEntity memberEntity = memberRepository.findById(mentorId).orElseThrow(IllegalArgumentException::new);
    return MemberDto.toMemberDto(memberEntity);
  }

  @Override
  public MemberDto modifyMyDetail(Long myId) {
    MemberEntity memberEntity = memberRepository.findById(myId).orElseThrow(IllegalArgumentException::new);
    return MemberDto.toMemberDto(memberEntity);
  }

  @Override
  public Page<MemberDto> memberList(Pageable pageable, String subject, String search) {
    Page<MemberEntity> memberPage = null;

    if (subject == null || search == null || search.trim().length() <= 0) {
      memberPage = memberRepository.findAll(pageable);
    } else {
      if (subject.equals("nickName")) {
        memberPage = memberRepository.findByNickNameContaining(pageable, search);
      } else if (subject.equals("address")) {
        memberPage = memberRepository.findByAddressContaining(pageable, search);
      }
    }

    return memberPage.map(MemberDto::toMemberDto);
  }

  @Override
  public Page<MemberDto> mentorList(Pageable pageable, String subject, String search) {

    Page<MemberEntity> mentorPage = null;

    if (subject == null || search == null || search.trim().length() <= 0) {
      mentorPage = memberRepository.findByRole(pageable, Role.MENTOR);
    } else {
      if (subject.equals("nickName")) {
        mentorPage = memberRepository.findByRoleAndNickNameContaining(pageable, Role.MENTOR, search);
      } else if (subject.equals("address")) {
        mentorPage = memberRepository.findByRoleAndAddressContaining(pageable, Role.MENTOR, search);
      }
    }

    return mentorPage.map(MemberDto::toMemberDto);
  }

  // kakao 로그인
  @Override
  public MemberDto getKakaoMember(String accessToken) {
    String email = getEmailFromKakaoAccessToken(accessToken);

    Optional<MemberEntity> mOptional = memberRepository.findByUserEmail(email);

    // 기존 회원
    if (mOptional.isPresent()) {
      return MemberDto.toMemberDto(mOptional.get());
    }

    // 신규 회원
    MemberEntity socialMember = makeSocialMember(email);
    memberRepository.save(socialMember);

    return MemberDto.toMemberDto(socialMember);
  }

  private String getEmailFromKakaoAccessToken(String accessToken) {

    String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

    if (accessToken == null) {
      throw new RuntimeException("Access Token is null");
    }
    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.add("Authorization", "Bearer " + accessToken);
    headers.add("Content-Type", "application/x-www-form-urlencoded");
    HttpEntity<String> entity = new HttpEntity<>(headers);

    UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();

    ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity,
        LinkedHashMap.class);

    LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();

    LinkedHashMap<String, String> kakaoAccount = bodyMap.get("kakao_account");

    return kakaoAccount.get("email");
  }

  private MemberEntity makeSocialMember(String email) {
    MemberEntity memberEntity = MemberEntity.builder()
        .userEmail(email)
        .nickName("email")
        .userPw(passwordEncoder.encode("1111"))
        .address("address")
        .phone("010-1111-1111")
        .age(20)
        .userName("userName")
        .role(Role.MEMBER)
        .social(true)
        .build();

    return memberEntity;
  }

  @Override
  public void modifyOk(MemberDto memberDto) throws IOException {
    Optional<MemberEntity> meOptional = memberRepository.findByUserEmail(memberDto.getUserEmail());
    Optional<MemberImgEntity> optionalMemImg = memberImgRepository.findByMemberEntity(meOptional.get());

    MultipartFile memberImgFile = memberDto.getProfileFile();
    System.out.println("imgFile===" + memberImgFile);
    String existImg = memberDto.getNewImgName();

    String encodedPassword = null;

    if (memberDto.getUserPw().equals(meOptional.get().getUserPw())) {
      encodedPassword = memberDto.getUserPw();
    } else {
      encodedPassword = passwordEncoder.encode(memberDto.getUserPw());
    }

    if ((memberImgFile == null || memberImgFile.isEmpty()) && existImg != null) {
      memberRepository.save(MemberEntity.builder()
          .id(meOptional.get().getId())
          .userEmail(memberDto.getUserEmail())
          .userPw(encodedPassword)
          .userName(memberDto.getUserName())
          .address(memberDto.getAddress())
          .age(memberDto.getAge())
          .role(memberDto.getRole())
          .phone(memberDto.getPhone())
          .career(memberDto.getCareer())
          .myPostCount(memberDto.getMyPostCount())
          .myReplyCount(memberDto.getMyReplyCount())
          .attachFile(1)
          .portfolioFile(0)
          .nickName(memberDto.getNickName())
          .social(false)
          .detail(memberDto.getDetail())
          .detailTitle(memberDto.getDetailTitle())
          .replyCount(memberDto.getReplyCount())
          .viewCount(memberDto.getViewCount())
          .boardEntities(memberDto.getBoardEntities())
          .itemEntities(memberDto.getItemEntities())
          .payEntities(memberDto.getPayEntities())
          .memberPtEntities(memberDto.getMemberPtEntities())
          .memberImgEntities(memberDto.getMemberImgEntities())
          .replyEntities(memberDto.getReplyEntities())
          .build());
    } else if ((memberImgFile == null || memberImgFile.isEmpty()) && existImg == null) {
      memberRepository.save(MemberEntity.builder()
          .id(meOptional.get().getId())
          .userEmail(memberDto.getUserEmail())
          .userPw(encodedPassword)
          .userName(memberDto.getUserName())
          .address(memberDto.getAddress())
          .myPostCount(memberDto.getMyPostCount())
          .myReplyCount(memberDto.getMyReplyCount())
          .age(memberDto.getAge())
          .role(memberDto.getRole())
          .phone(memberDto.getPhone())
          .career(memberDto.getCareer())
          .attachFile(0)
          .portfolioFile(0)
          .nickName(memberDto.getNickName())
          .social(false)
          .detail(memberDto.getDetail())
          .detailTitle(memberDto.getDetailTitle())
          .replyCount(memberDto.getReplyCount())
          .viewCount(memberDto.getViewCount())
          .boardEntities(memberDto.getBoardEntities())
          .itemEntities(memberDto.getItemEntities())
          .payEntities(memberDto.getPayEntities())
          .memberPtEntities(memberDto.getMemberPtEntities())
          .replyEntities(memberDto.getReplyEntities())
          .build());
    } else {
      // 기존 이미지 삭제
      if (optionalMemImg.isPresent()) {
        String existingImgPath = optionalMemImg.get().getNewImgName();
        System.out.println("exist-------" + existingImgPath);
        s3UploadService.delete("images/" + existingImgPath); // S3에서 기존 이미지 삭제
        memberImgRepository.deleteById(optionalMemImg.get().getId());
      }

      // 새로운 이미지 업로드 (S3에만 업로드)
      String oldImgName = memberImgFile.getOriginalFilename();
      String uploadedImageUrl = s3UploadService.upload(memberImgFile, "images");
      String newImgName = uploadedImageUrl.substring(uploadedImageUrl.indexOf("images/") + "images/".length());

      System.out.println("Uploaded Image URL: " + uploadedImageUrl);

      // 회원 정보 저장
      Long memberId = memberRepository.save(MemberEntity.builder()
          .id(meOptional.get().getId())
          .userEmail(memberDto.getUserEmail())
          .userPw(encodedPassword)
          .userName(memberDto.getUserName())
          .address(memberDto.getAddress())
          .age(memberDto.getAge())
          .role(memberDto.getRole())
          .phone(memberDto.getPhone())
          .myPostCount(memberDto.getMyPostCount())
          .myReplyCount(memberDto.getMyReplyCount())
          .career(memberDto.getCareer())
          .attachFile(1) // 이미지가 추가되었으므로 1로 설정
          .portfolioFile(0)
          .nickName(memberDto.getNickName())
          .social(false)
          .detail(memberDto.getDetail())
          .detailTitle(memberDto.getDetailTitle())
          .replyCount(memberDto.getReplyCount())
          .viewCount(memberDto.getViewCount())
          .boardEntities(memberDto.getBoardEntities())
          .itemEntities(memberDto.getItemEntities())
          .payEntities(memberDto.getPayEntities())
          .memberPtEntities(memberDto.getMemberPtEntities())
          .replyEntities(memberDto.getReplyEntities())
          .build()).getId();

      MemberEntity memberEntity = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);

      // S3에 업로드된 이미지 정보 저장
      memberImgRepository.save(MemberImgEntity.builder()
          .newImgName(newImgName)
          .oldImgName(oldImgName)
          .memberEntity(memberEntity)
          .build());
    }
  }

}
