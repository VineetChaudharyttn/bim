package com.ttn.bim.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.Serializable;
import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ttn.bim.entity.User;
import com.ttn.bim.repository.UserRepo;
import com.ttn.bim.services.AuthenticationService;
import com.ttn.bim.util.JwtUtils;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Value("${authenticationUrl}")
    private String authUrl;

    @Value("${server.base.url}")
    private String serverUrl;

    @Autowired
    UserRepo userRepo;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("/login")
    public void authentication(HttpServletResponse response, HttpServletRequest request) throws IOException {
        sendRedirect(response, authUrl);
    }

    @GetMapping("/setAuthenticatedUser")
    public void setAuthUser(HttpServletResponse response, OAuth2AuthenticationToken auth2AuthenticationToken) throws IOException {
        User user = new User();
        Map<String, Object> userInfoMap = auth2AuthenticationToken.getPrincipal().getAttributes();
        user.setName( userInfoMap.get("given_name")+" "+userInfoMap.get("family_name"));
        user.setEmail((String) userInfoMap.get("email"));
        user.setProfilePic((String) userInfoMap.get("picture"));
        if (userRepo.findByEmail(user.getEmail()) == null) {
            user.setActive(true);
            userRepo.saveAndFlush(user);
        }
        authenticationService.setAuthCookie(response,user);
        sendRedirect(response, serverUrl);
    }

    @GetMapping(value = "/login/validated")
    public Map<String, Serializable> validateToken(HttpServletRequest request) {
        return authenticationService.validateToken(request);
    }

    @GetMapping(value = "/currentUser")
    public Map<String, User> getUser(HttpServletRequest request) {
        return authenticationService.getCurrentUser(request);
    }

    @GetMapping(value = "/logout")
    public Map<String, String> logout(HttpServletRequest request, HttpServletResponse response) {
        return authenticationService.logout(request,response);
    }

    private void sendRedirect(HttpServletResponse response, String url) throws IOException {
        response.sendRedirect(url);
    }
}
