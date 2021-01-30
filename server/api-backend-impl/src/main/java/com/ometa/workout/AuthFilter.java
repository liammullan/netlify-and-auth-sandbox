package com.ometa.workout;

import org.jose4j.jwk.HttpsJwks;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.jwt.consumer.JwtContext;
import org.jose4j.keys.resolvers.HttpsJwksVerificationKeyResolver;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//@Component
public class AuthFilter extends OncePerRequestFilter {
    private static String AUTH_HEADER = "authorization";

//    {
//        FirebaseApp.initializeApp();
//
//    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        //HttpsJwks httpsJkws = new HttpsJwks("https://accounts.google.com/.well-known/openid-configuration");
        //HttpsJwks httpsJkws = new HttpsJwks("https://www.googleapis.com/oauth2/v2/certs");

        HttpsJwks httpsJkws = new HttpsJwks("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com");

        // The HttpsJwksVerificationKeyResolver uses JWKs obtained from the HttpsJwks and will select the
        // most appropriate one to use for verification based on the Key ID and other factors provided
        // in the header of the JWS/JWT.
        HttpsJwksVerificationKeyResolver httpsJwksKeyResolver = new HttpsJwksVerificationKeyResolver(httpsJkws);

        // Use JwtConsumerBuilder to construct an appropriate JwtConsumer, which will
        // be used to validate and process the JWT. But, in this case, provide it with
        // the HttpsJwksVerificationKeyResolver instance rather than setting the
        // verification key explicitly.
        JwtConsumer jwtConsumer = new JwtConsumerBuilder()
                // ... other set up of the JwtConsumerBuilder ...
                .setVerificationKeyResolver(httpsJwksKeyResolver)
                .setSkipDefaultAudienceValidation()
                // ...
                .build();

        String authToken = request.getHeader(AUTH_HEADER).substring(7);

        try {
            JwtContext jwtContext = jwtConsumer.process(authToken);
            System.out.println(jwtContext.getJwtClaims());
        } catch (InvalidJwtException e) {
            e.printStackTrace();
        }
//        try {
//            KeyFactory keyFactory = KeyFactory.getInstance("RS256");
//            keyFactory.generatePublic();
//
//        } catch (NoSuchAlgorithmException e) {
//            e.printStackTrace();
//        }



//        if (!StringUtils.isEmpty(authToken)) {
//            try {
//                FirebaseToken auth = verifyIdToken(authToken);
//                logger.info("User UID: " + auth.getUid());
//            }catch(FirebaseAuthException firebaseAuthException){
//                logger.warn("Error parsing firebase JWT", firebaseAuthException);
//            }
//            //SecurityContextHolder.getContext().setAuthentication(auth);
//            logger.debug("Successfully Authenticated");
//        }

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

//    private FirebaseToken verifyIdToken(String idToken) throws FirebaseAuthException {
//        if (StringUtils.isEmpty(idToken)) {
//            throw new IllegalArgumentException("idToken is blank");
//        }
//        return FirebaseAuth.getInstance().verifyIdToken(idToken);
//    }

//    private Authentication getAuthentication(String idToken) {
//
//        FirebaseToken token = verifyIdToken(idToken);
//        assert token != null;
//        return new FirebaseAuthenticationToken(token.getUid(), token);
//    }
}
