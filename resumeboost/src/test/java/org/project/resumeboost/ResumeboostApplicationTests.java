package org.project.resumeboost;

import org.junit.jupiter.api.Test;
import org.project.resumeboost.basic.common.Role;
import org.project.resumeboost.member.entity.MemberEntity;
import org.project.resumeboost.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ResumeboostApplicationTests {
	@Test
	void contextLoads() {
	}

	@Autowired
	MemberRepository memberRepository;

	@Test
	void memberTest() {
		for (int i = 1; i < 6; i++) {
			memberRepository.save(MemberEntity.builder()
					.nickName("멤버" + i)
					.userEmail("asd" + i + "@email.com")
					.userName("김" + i)
					.address("서울")
					.age(20 + i)
					.userPw("1234")
					.role(Role.MEMBER)
					.build());
		}
	}
}
