package org.example.springskeleton.controller.auth;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.auth.JwtResponse;
import org.example.springskeleton.dto.auth.LoginRequest;
import org.example.springskeleton.dto.auth.MessageResponse;
import org.example.springskeleton.dto.auth.SignUpRequest;
import org.example.springskeleton.entity.user.UserDetailsImpl;
import org.example.springskeleton.service.AuthService;
import org.example.springskeleton.service.JwtUtilsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.example.springskeleton.globals.UrlMapping.*;

@RestController
@RequestMapping(AUTH)
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtUtilsService jwtUtilsService;

    @PostMapping(SIGN_UP)
    public ResponseEntity<?> register(@RequestBody SignUpRequest signUpRequest){
        if (authService.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        authService.register(signUpRequest);


        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping(SIGN_IN)
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authService.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtilsService.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(
                JwtResponse.builder()
                        .token(jwt)
                        .id(userDetails.getId())
                        .username(userDetails.getUsername())
                        .role(role.get(0))
                        .build());
    }
}
