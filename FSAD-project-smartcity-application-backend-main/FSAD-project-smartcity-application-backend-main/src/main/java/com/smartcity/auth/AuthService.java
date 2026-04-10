package com.smartcity.auth;

import com.smartcity.auth.dto.AuthResponse;
import com.smartcity.auth.dto.AuthUserResponse;
import com.smartcity.auth.dto.LoginRequest;
import com.smartcity.auth.dto.RegisterRequest;
import com.smartcity.user.User;
import com.smartcity.user.UserRepository;
import com.smartcity.user.UserRole;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Service
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public AuthResponse register(RegisterRequest req) {
    if (userRepository.existsByEmail(req.getEmail())) {
      throw new ResponseStatusException(BAD_REQUEST, "Email already registered");
    }

    User u = new User();
    u.setFullName(req.getFullName());
    u.setEmail(req.getEmail().toLowerCase().trim());
    u.setPhone(req.getPhone());
    u.setRole(Optional.ofNullable(req.getRole()).orElse(UserRole.user));
    u.setPasswordHash(passwordEncoder.encode(req.getPassword()));

    User saved = userRepository.save(u);
    return new AuthResponse(null, toResponse(saved));
  }

  public AuthResponse login(LoginRequest req) {
    User u = userRepository.findByEmail(req.getEmail().toLowerCase().trim())
        .orElseThrow(() -> new ResponseStatusException(UNAUTHORIZED, "Invalid email or password"));

    if (!passwordEncoder.matches(req.getPassword(), u.getPasswordHash())) {
      throw new ResponseStatusException(UNAUTHORIZED, "Invalid email or password");
    }

    // Token not implemented (keep it simple for now); frontend supports null token.
    return new AuthResponse(null, toResponse(u));
  }

  private AuthUserResponse toResponse(User u) {
    return new AuthUserResponse(u.getId(), u.getFullName(), u.getEmail(), u.getPhone(), u.getRole());
  }
}

