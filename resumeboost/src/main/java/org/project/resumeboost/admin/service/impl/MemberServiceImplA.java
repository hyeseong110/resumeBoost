package org.project.resumeboost.admin.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.project.resumeboost.admin.service.MemberServiceA;
import org.project.resumeboost.member.dto.MemberDto;
import org.project.resumeboost.member.entity.MemberEntity;
import org.project.resumeboost.member.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImplA implements MemberServiceA {

  private final MemberRepository memberRepository;

  @Override
  public Page<MemberDto> ListAll(Pageable pageable) {
    
    Page<MemberEntity> memberEntities = memberRepository.findAll(pageable);
    

    return memberEntities.map(el -> MemberDto.builder()
    .id(el.getId())
    .userEmail(el.getUserEmail())
    .userPw(el.getUserPw())
    .age(el.getAge())
    .address(el.getAddress())
    .nickName(el.getNickName())
    .userName(el.getUserName())
    .detailTitle(el.getDetailTitle())
    .detail(el.getDetail())
    .myReplyCount(el.getMyReplyCount())
    .viewCount(el.getViewCount())
    .myReplyCount(el.getMyReplyCount())
    .myPostCount(el.getMyPostCount())
    .career(el.getCareer())
    .role(el.getRole())
    .attachFile(el.getAttachFile())
    .portfolioFile(el.getPortfolioFile())
    .phone(el.getPhone())
    .boardEntities(el.getBoardEntities())
    .replyEntities(el.getReplyEntities())
    .itemEntities(el.getItemEntities())
    .payEntities(el.getPayEntities())
    .memberImgEntities(el.getMemberImgEntities())
    .memberPtEntities(el.getMemberPtEntities())

    .build());
  }

  @Override
  public MemberDto memberDetail(Long id) {
    
    MemberEntity memberEntity = memberRepository.findById(id).orElseThrow(() -> new NullPointerException("회원이 존재하지 않습니다!"));



    return MemberDto.builder()
    .id(memberEntity.getId())
    .userEmail(memberEntity.getUserEmail())
    .userPw(memberEntity.getUserPw())
    .age(memberEntity.getAge())
    .address(memberEntity.getAddress())
    .nickName(memberEntity.getNickName())
    .userName(memberEntity.getUserName())
    .detailTitle(memberEntity.getDetailTitle())
    .detail(memberEntity.getDetail())
    .myReplyCount(memberEntity.getMyReplyCount())
    .viewCount(memberEntity.getViewCount())
    .myReplyCount(memberEntity.getMyReplyCount())
    .myPostCount(memberEntity.getMyPostCount())
    .career(memberEntity.getCareer())
    .role(memberEntity.getRole())
    .attachFile(memberEntity.getAttachFile())
    .portfolioFile(memberEntity.getPortfolioFile())
    .phone(memberEntity.getPhone())
    .boardEntities(memberEntity.getBoardEntities())
    .replyEntities(memberEntity.getReplyEntities())
    .itemEntities(memberEntity.getItemEntities())
    .payEntities(memberEntity.getPayEntities())
    .memberImgEntities(memberEntity.getMemberImgEntities())
    .memberPtEntities(memberEntity.getMemberPtEntities())
    .build();
  }


  
}


