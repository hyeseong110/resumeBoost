package org.project.resumeboost.admin.service.impl;

import java.io.File;
import java.io.IOException;
import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.project.resumeboost.admin.service.MemberServiceA;
import org.project.resumeboost.member.dto.MemberDto;
import org.project.resumeboost.member.dto.MemberImgDto;
import org.project.resumeboost.member.entity.MemberEntity;
import org.project.resumeboost.member.entity.MemberImgEntity;
import org.project.resumeboost.member.repository.MemberImgRepository;
import org.project.resumeboost.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImplA implements MemberServiceA {

  private final MemberRepository memberRepository;
  private final MemberImgRepository memberImgRepository;

  @Value("${file.path}")
	String saveFile;

  @Override
  public Page<MemberDto> ListAll(Pageable pageable) {
    
    Page<MemberEntity> memberEntities = memberRepository.findAll(pageable);
    
    return (
      memberEntities.map(el -> MemberDto.toMemberDto(el))
    );

  }


  @Override
  public MemberDto memberDetail(Long id) {
    
    MemberEntity memberEntity = memberRepository.findById(id).orElseThrow(() -> new NullPointerException("회원이 존재하지 않습니다!"));
   
  
    return MemberDto.toMemberDto(memberEntity);

  }


  @Override
  public void memberDelete(Long id) {
    
    Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(id);
    if (!optionalMemberEntity.isPresent()) {
      throw new NullPointerException("회원이 존재하지 않습니다!!");
    }
    

    memberRepository.deleteById(id);
    
  }

  @Override
  public void memberUpdate(MemberDto memberDto) throws IllegalStateException, IOException {
    
    Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberDto.getId());
    if (!optionalMemberEntity.isPresent()) {
      throw new NullPointerException("수정할 회원이 존재하지 않습니다!!");
    }


    Optional<MemberImgEntity> optionalMemberImgEntity = memberImgRepository.findByMemberEntity(MemberEntity.builder().id(memberDto.getId()).build());
    
    if (optionalMemberImgEntity.isPresent()) {
      String newImgName = optionalMemberImgEntity.get().getNewImgName();
      String saveFilePath = saveFile + "/member/profile/" + newImgName;

      File deleteFile = new File(saveFilePath); // 이미 있으면 삭제 

      if (deleteFile.exists()) {
        deleteFile.delete();
        System.out.println("파일을 삭제 합니다");
      } else {
        System.out.println("파일이 존재하지 않습니다");
      }

      // DB 에서 삭제
      memberImgRepository.deleteById(optionalMemberImgEntity.get().getId());

    }
    
    
    if (memberDto.getProfileFile() == null) {

      memberRepository.save(MemberEntity.builder()
        .id(memberDto.getId())
        .userEmail(memberDto.getUserEmail())
        .userPw(memberDto.getUserPw())
        .age(memberDto.getAge())
        .address(memberDto.getAddress())
        .nickName(memberDto.getNickName())
        .userName(memberDto.getUserName())
        .detailTitle(memberDto.getDetailTitle())
        .detail(memberDto.getDetail())
        .myReplyCount(memberDto.getMyReplyCount())
        .viewCount(memberDto.getViewCount())
        .myReplyCount(memberDto.getMyReplyCount())
        .myPostCount(memberDto.getMyPostCount())
        .career(memberDto.getCareer())
        .role(memberDto.getRole())
        .attachFile(memberDto.getAttachFile())
        .portfolioFile(memberDto.getPortfolioFile())
        .phone(memberDto.getPhone())
        .boardEntities(memberDto.getBoardEntities())
        .replyEntities(memberDto.getReplyEntities())
        .itemEntities(memberDto.getItemEntities())
        .payEntities(memberDto.getPayEntities())
        .memberImgEntities(memberDto.getMemberImgEntities())
        .memberPtEntities(memberDto.getMemberPtEntities())
        .build());
    } else {
      MultipartFile memberImgFile = memberDto.getProfileFile();
      UUID uuid = UUID.randomUUID();


      String oldImgName = memberImgFile.getOriginalFilename();
      String newImgName = uuid + oldImgName;

      String saveFilePath = saveFile + "/member/profile/" + newImgName;
      memberImgFile.transferTo(new File(saveFilePath));


      memberRepository.save(MemberEntity.builder()
        .id(memberDto.getId())
        .userEmail(memberDto.getUserEmail())
        .userPw(memberDto.getUserPw())
        .age(memberDto.getAge())
        .address(memberDto.getAddress())
        .nickName(memberDto.getNickName())
        .userName(memberDto.getUserName())
        .detailTitle(memberDto.getDetailTitle())
        .detail(memberDto.getDetail())
        .myReplyCount(memberDto.getMyReplyCount())
        .viewCount(memberDto.getViewCount())
        .myReplyCount(memberDto.getMyReplyCount())
        .myPostCount(memberDto.getMyPostCount())
        .career(memberDto.getCareer())
        .role(memberDto.getRole())
        .attachFile(1)
        .portfolioFile(memberDto.getPortfolioFile())
        .phone(memberDto.getPhone())
        .boardEntities(memberDto.getBoardEntities())
        .replyEntities(memberDto.getReplyEntities())
        .itemEntities(memberDto.getItemEntities())
        .payEntities(memberDto.getPayEntities())
        .memberImgEntities(memberDto.getMemberImgEntities())
        .memberPtEntities(memberDto.getMemberPtEntities())
        .build());
      
        

        MemberImgEntity memberImgEntity = MemberImgEntity.builder()
        .newImgName(newImgName)
        .oldImgName(oldImgName)
        .memberEntity(optionalMemberEntity.get())
        .build();

        memberImgRepository.save(memberImgEntity);

    }






  }


  
}


