package com.ometa.workout;

import com.google.api.Authentication;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthFilter extends OncePerRequestFilter {
    private static String AUTH_HEADER = "authorization";

    {
        FirebaseApp.initializeApp();

    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authToken = request.getHeader(AUTH_HEADER).substring(7);
        if (!StringUtils.isEmpty(authToken)) {
            try {
                FirebaseToken auth = verifyIdToken(authToken);
                logger.info("User UID: " + auth.getUid());
            }catch(FirebaseAuthException firebaseAuthException){
                logger.warn("Error parsing firebase JWT", firebaseAuthException);
            }
            //SecurityContextHolder.getContext().setAuthentication(auth);
            logger.debug("Successfully Authenticated");
        }
        filterChain.doFilter(request, response);

    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain) throws ServletException, IOException {
//
//        String authToken = request.getHeader(AUTH_HEADER).substring(7);
//        if (!StringUtils.isEmpty(authToken)) {
//            Authentication auth = getAuthentication(authToken);
//            //SecurityContextHolder.getContext().setAuthentication(auth);
//            logger.debug("Successfully Authenticated");
//        }
//        filterChain.doFilter(request, response);
//
//    }

    private FirebaseToken verifyIdToken(String idToken) throws FirebaseAuthException {
        if (StringUtils.isEmpty(idToken)) {
            throw new IllegalArgumentException("idToken is blank");
        }
        return FirebaseAuth.getInstance().verifyIdToken(idToken);
    }

//    private Authentication getAuthentication(String idToken) {
//
//        FirebaseToken token = verifyIdToken(idToken);
//        assert token != null;
//        return new FirebaseAuthenticationToken(token.getUid(), token);
//    }
}
