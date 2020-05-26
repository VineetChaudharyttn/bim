package com.ttn.bim.services;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.Serializable;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ttn.bim.entity.User;
import com.ttn.bim.repository.UserRepo;
import com.ttn.bim.util.JwtUtils;

@Service
public class AuthenticationService {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepo userRepo;

    @Value("${authenticationUrl}")
    String authUrl;

    public Map<String, Serializable> validateToken(HttpServletRequest request) {
        Map<String, Serializable> responseMap = new HashMap<>();
        String authToken = getAuthToken(request);
        if (StringUtils.isEmpty(authToken) || !jwtUtils.validateToken(authToken)) {
            responseMap.put("result", "INVALID");
        } else {

            responseMap.put("result", "VALID");
        }
        return responseMap;
    }

    public Map<String, User> getCurrentUser(HttpServletRequest request) {
        Map<String, User> response = new HashMap<>();
        String authToken = getAuthToken(request);
        if (!(StringUtils.isEmpty(authToken) || !jwtUtils.validateToken(authToken))) {
            response.put("user", getUser(getUsername(authToken)));
        }
        return response;
    }

    private String getAuthToken(HttpServletRequest request) {
        return request.getHeader("AUTHENTICATION_TOKEN");
    }

    public User authenticateUser(HttpServletRequest request, HttpServletResponse response) {
        try {
            return login(request, response);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private User login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String token = request.getHeader("AUTHENTICATION_TOKEN");
        String email = getUsername(token);
        User user = getUser(email);
        if (user != null) {
            List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList();
            PreAuthenticatedAuthenticationToken authentication = new PreAuthenticatedAuthenticationToken(user.getCode(), email, authorities);
            authentication.setDetails(new WebAuthenticationDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return user;
        } else {
            SecurityContextHolder.clearContext();
        }
        return null;
    }

    private String getUsername(String token) {
        return jwtUtils.getUsernameFromToken(token);
    }

    private User getUser(String email) {
        return userRepo.findByEmail(email);
    }

    public Map<String, String> logout(HttpServletRequest request, HttpServletResponse response) {
        updateAuthCookie(response, null, 0);
        SecurityContextHolder.clearContext();
        return Collections.singletonMap("result", "success");
    }

    public void setAuthCookie(HttpServletResponse response, User user) {
        String authToken = jwtUtils.generateToken(user);
        updateAuthCookie(response, authToken, 60 * 60 * 1000);
    }

    private void updateAuthCookie(HttpServletResponse response, String authToken, Integer age) {
        Cookie myCookie = new Cookie("token", authToken);
        myCookie.setMaxAge(age);
        myCookie.setPath("/");
        myCookie.setDomain("localhost");
        response.addCookie(myCookie);
    }
}
