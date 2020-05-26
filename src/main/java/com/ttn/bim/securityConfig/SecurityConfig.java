package com.ttn.bim.securityConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ttn.bim.services.AuthenticationService;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    AuthenticationService authenticationService;

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers(
                "/api/login/**",
                "/api/logout/**"
        );
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .authorizeRequests()
                .anyRequest()
                .authenticated()
                .and()
                .oauth2Login()
                .defaultSuccessUrl("/api/setAuthenticatedUser")
                .and().addFilterBefore(new AuthenticationFilter(authenticationService), UsernamePasswordAuthenticationFilter.class);
    }
}
