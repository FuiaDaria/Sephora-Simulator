package org.example.springskeleton.dto.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignUpRequest {
    private String username;
    private String password;
    private String email;
    private String role;
}