package com.ttn.bim.securityConfig;

import javax.security.sasl.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ttn.bim.entity.User;
import com.ttn.bim.services.AuthenticationService;

public class AuthenticationFilter extends OncePerRequestFilter {

    AuthenticationService authenticationService;

    AuthenticationFilter(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("AUTHENTICATION_TOKEN");
        User authenticatedUser = null;
        if (token != null) {
            authenticatedUser = authenticationService.authenticateUser(request, response);
        }
        if (!allowURL(request.getRequestURL()) && authenticatedUser == null) {
            throw new AuthenticationServiceException("exception.authenticate.failure");
        }
        filterChain.doFilter(request, response);
    }

    private boolean allowURL(StringBuffer requestURL) {
        if (StringUtils.isEmpty(requestURL)) {
            return false;
        }

        String url = requestURL.toString();
        String result = Arrays.stream(new String[]{
                "/setAuthenticatedUser",
                "/login"
        }).filter(url::contains).findAny().orElse(null);

        return result != null;
    }
}


