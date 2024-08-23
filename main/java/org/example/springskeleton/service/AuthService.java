package org.example.springskeleton.service;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.auth.SignUpRequest;
import org.example.springskeleton.entity.customer.Customer;
import org.example.springskeleton.entity.manager.Manager;
import org.example.springskeleton.entity.user.ERole;
import org.example.springskeleton.entity.user.Role;
import org.example.springskeleton.entity.user.User;
import org.example.springskeleton.repository.customer.CustomerRepository;
import org.example.springskeleton.repository.manager.ManagerRepository;
import org.example.springskeleton.repository.user.RoleRepository;
import org.example.springskeleton.repository.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final AuthenticationManager authenticationManager;

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final CustomerRepository customerRepository;
  private final ManagerRepository managerRepository;
  private final PasswordEncoder encoder;

  public boolean existsByUsername(String username) {
    return userRepository.existsByUsername(username);
  }

  public boolean existsByEmail(String email) {
    return userRepository.existsByEmail(email);
  }

  public void register(SignUpRequest signUpRequest) {
    User user = User.builder()
            .username(signUpRequest.getUsername())
            .password(encoder.encode(signUpRequest.getPassword()))
            .email(signUpRequest.getEmail())
            .build();

    String roleName = signUpRequest.getRole();

    if (roleName == null) {
      Role defaultRole = roleRepository.findByName(ERole.CUSTOMER)
              .orElseThrow(() -> new IllegalArgumentException("Cannot find CUSTOMER role"));
      user.setRole(defaultRole);
    } else {
      Role role = roleRepository.findByName(ERole.valueOf(roleName))
              .orElseThrow(() -> new IllegalArgumentException("Cannot find role: " + roleName));
      user.setRole(role);
    }

    userRepository.save(user);
    if(user.getRole().getName().equals(ERole.CUSTOMER)){
      Customer customer = new Customer();
      customer.setUser(user);
      customer.setPoints(0);
      customerRepository.save(customer);
    }else if(user.getRole().getName().equals(ERole.MANAGER)){
      Manager manager = new Manager();
      manager.setUser(user);
      manager.setSalary(2250);
      managerRepository.save(manager);
    }
  }

  public Authentication authenticate(UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) {
    return authenticationManager.authenticate(usernamePasswordAuthenticationToken);
  }
}
