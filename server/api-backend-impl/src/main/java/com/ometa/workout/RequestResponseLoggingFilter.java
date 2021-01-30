package com.ometa.workout;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

@Component
public class RequestResponseLoggingFilter implements Filter {

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        Enumeration<String> headerNames = req.getHeaderNames();

//        while(headerNames.hasMoreElements()){
//            System.out.println(headerNames.nextElement());
//        }

        System.out.println(String.format(
                "Logging Request  %s : %s", req.getMethod(),
                req.getRequestURI()));

        System.out.println(String.format(
                "Logging Response :%s",
                res.getContentType()));

        String authorizationHeader = req.getHeader("authorization");
        System.out.println("Auth Header: " + authorizationHeader);

        System.out.println("SecurityContextHolder.getContext().getAuthentication():");
        System.out.println(SecurityContextHolder.getContext().getAuthentication());

        chain.doFilter(request, response);


    }

    // other methods
}