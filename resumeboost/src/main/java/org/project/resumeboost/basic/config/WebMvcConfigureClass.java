package org.project.resumeboost.basic.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfigureClass implements WebMvcConfigurer {
	@Value("${file.path}")
	String saveFile;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		registry.addResourceHandler("/member/profile/**")
				.addResourceLocations("file:///" + saveFile + "/member/profile/");
		registry.addResourceHandler("/member/portfolio/**")
				.addResourceLocations("file:///" + saveFile + "/member/portfolio/");
		registry.addResourceHandler("/board/img/**")
				.addResourceLocations("file:///" + saveFile + "/board/");
	}
}